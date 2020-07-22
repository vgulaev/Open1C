const { sequelize, service } = require('./db/connection');
const dotenv = require('dotenv');
const { schema } = require('./db/metadata/schema');

dotenv.config();

db_name = process.env.POSTGRES_DB;

const createCatalog = (catalogName) => {
  let meta = schema['справочники'][catalogName]
  let sql = [`CREATE TABLE ${catalogName}_справочник (`, 'ID uuid PRIMARY KEY,'];
  let attr = {
    'Код': meta['параметры']['типКода'],
    'Наименование': 'text'
  }
  Object.keys(meta['поля']).forEach((name) => {
    let field = meta['поля'][name];
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

const createDB = () => {
  return new Promise((resolve, reject) => {
    var promises = [];
    Object.keys(schema['справочники']).forEach((name) => {
      promises.push(createCatalog(name));
    });

    Promise.all(promises).then(() => resolve());
  });
};

service.query(`DROP DATABASE IF EXISTS ${db_name}`)
  .then(() => {
    return service.query(`CREATE DATABASE ${db_name} ENCODING = 'utf-8'`);
  })
  // .then(() => {
  //   return service.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; commit;`);
  // })
  .then((res) => {
    return createDB();
  })
  .then(() => {
    service.close();
    sequelize.close();
  });


console.log('hello');
