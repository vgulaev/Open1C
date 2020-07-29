const { sequelize } = require('../../../../db/connection');

exports.list = (req, res, body) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  let sql = 'select * from "Организации_справочник"';
  if ('' != body) {
    let q = JSON.parse(body);
    if (undefined != q.q) {
      sql += ` where "Наименование" like '%${q.q}%'`;
    } else if (undefined != q.id) {
      sql += ` where id = '${q.id}'`;
    }
  }
  sequelize.query(sql)
    .then((rows) => {
      res.end(JSON.stringify(rows[0]));
    });
}
