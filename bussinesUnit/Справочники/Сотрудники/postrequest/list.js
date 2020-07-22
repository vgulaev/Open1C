const { sequelize } = require('../../../../db/connection');

exports.list = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  sequelize.query('select * from "Сотрудники_справочник"')
    .then((rows) => {
      res.end(JSON.stringify(rows[0]));
    });
}
