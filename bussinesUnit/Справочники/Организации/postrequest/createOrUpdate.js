const { sequelize } = require('../../../../db/connection');
const uuid = require('uuid');

const keys01 = (data) => {
  return Object.keys(data).map(e => `"${e}"`).join(',');
}

const sqlInsert = (data, res) => {
  let sql = `INSERT INTO "Организации_справочник" (${keys01(data)}) VALUES`;

  let tuple = Object.keys(data).map((t) => {
    if ("id" == t) {
      data.id = uuid.v4();
      return data.id;
    }
    return data[t];
  });

  sql += ` (${tuple.map((t) => `'${t}'`).join(',')})`;

  sequelize.query(sql)
    .then((rows) => {
      res.end(JSON.stringify({id: data.id}));
    });
}

const sqlUpdate = (data, res) => {
  let sql = `UPDATE "Организации_справочник" SET `;

  let id = data.id;
  delete data.id;

  let tuple = Object.keys(data).map(t => `${t}='${data[t]}'`);

  sql += tuple + ` where id='${id}'`;

  sequelize.query(sql)
    .then((rows) => {
      res.end(JSON.stringify({id: data.id}));
    });
}

exports.createOrUpdate = (req, res, body) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  let data = JSON.parse(body);
  if ('' == data.id) {
    sqlInsert(data, res);
  } else {
    sqlUpdate(data, res);
  }
}
