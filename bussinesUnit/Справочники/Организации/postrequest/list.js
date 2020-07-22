const { sequelize } = require('../../../../db/connection');

exports.list = (req, res, body) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  let sql = 'select * from "Организации_справочник"';
  if ('' != body) {
    let q = JSON.parse(body).q;
    if (q.length > 0) {
      sql += ` where "Наименование" like '%${q}%'`
    }
  }
  sequelize.query(sql)
    .then((rows) => {
      res.end(JSON.stringify(rows[0]));
    });
}
