const dotenv = require('dotenv');
const fs = require('fs');
const rimraf = require('rimraf');
const { schema } = require('./db/metadata/schema');
const { sequelize, service } = require('./db/connection');

dotenv.config();

db_name = process.env.POSTGRES_DB;

const loadSeeds = () => {
  require('./seeds/Организации').load();
}

const prepareFolderTree = () => {
  rimraf.sync('bussinesUnit/Справочники');
  rimraf.sync('bussinesUnit/Документы');
  fs.mkdirSync('bussinesUnit/Справочники');
  fs.mkdirSync('bussinesUnit/Документы');

  let bu = Object.keys(schema['Справочники']).map((e) => `bussinesUnit/Справочники/${e}`)
    .concat(Object.keys(schema['Документы']).map((e) => `bussinesUnit/Документы/${e}`));
  bu.forEach((name) => {
    fs.mkdirSync(name);
    fs.mkdirSync(`${name}/model`);
    fs.mkdirSync(`${name}/view`);
    fs.mkdirSync(`${name}/postrequest`);
  });
}

const createTable = (sql, meta, attr) => {
  Object.keys(meta['Поля']).forEach((name) => {
    let field = meta['Поля'][name];
    if (1 == field.length) {
      let fieldName = name;
      let fiedType = field[0];
      if (-1 < field[0].indexOf('.')) {
        fieldName += '_Id';
        fiedType = 'uuid'
      };
      attr[fieldName] = fiedType;
    }
  });

  sql.push(Object.keys(attr).map((name) => `"${name}" ${attr[name]}`).join(','));
  sql.push(')');

  return sequelize.query(sql.join(''));
}

const createDocument = (documentName) => {
  let meta = schema['Документы'][documentName]

  let sql = [`CREATE TABLE ${documentName}_документ (`, 'ID uuid PRIMARY KEY,'];
  let attr = {
    'Номер': ['text'],
    'Дата': ['timestamp']
  }

  return createTable(sql, meta, attr);
}

const createCatalog = (catalogName) => {
  let meta = schema['Справочники'][catalogName]

  let sql = [`CREATE TABLE ${catalogName}_справочник (`, 'ID uuid PRIMARY KEY,'];
  let attr = {
    'Код': meta['Параметры']['ТипКода'],
    'Наименование': 'text'
  }

  return createTable(sql, meta, attr);
}

const createDB = () => {
  return new Promise((resolve, reject) => {
    var promises = [];
    Object.keys(schema['Справочники']).forEach((name) => {
      promises.push(createCatalog(name));
    });

    Object.keys(schema['Документы']).forEach((name) => {
      promises.push(createDocument(name));
    });

    Promise.all(promises).then(() => resolve());
  });
};

// service.query(`DROP DATABASE IF EXISTS ${db_name}`)
//   .then(() => {
//     return service.query(`CREATE DATABASE ${db_name} ENCODING = 'utf-8'`);
//   })
//   // .then(() => {
//   //   return service.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; commit;`);
//   // })
//   .then((res) => {
//     return createDB();
//   })
//   .then(() => {
//     service.close();
//     sequelize.close();
//   });

prepareFolderTree();

loadSeeds();

console.log('hello');
