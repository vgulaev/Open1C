const { sequelize } = require('../db/connection');
const uuid = require('uuid');

load = exports.load = () => {
  let items = [
    {
      'Наименование': 'ГринАтом',
      'Код': '00001',
      'ИНН': '7222'
    },
    {
      'Наименование': 'Метро',
      'Код': '00002',
      'ИНН': '7222'
    }
  ];

  sql = 'INSERT INTO "Организации_справочник" (id, "Код", "Наименование", "ИНН") VALUES ';

  let values = [];

  items.forEach((e) => {
    let tuple = ["id", "Код", "Наименование", "ИНН"].map((t) => {
      if ("id" == t) {
        return uuid.v4();
      }
      return e[t];
    });
    values.push(tuple.map((t) => `'${t}'`).join(','));
  });

  sequelize.query(sql + values.map((e) => `(${e})`).join(','))
    .then(() => sequelize.close());
}
