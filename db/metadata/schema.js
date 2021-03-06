exports.schema = {
  'Справочники': {
    'Организации':{
      'Поля': {
        'ИНН': ['text'],
      },
      'Параметры': {
        'ТипКода': 'text',
        'ДлинаКода': 9,
      }
    },
    'Пользователи':{
      'Поля': {
        'Логин': ['text'],
        'Пароль': ['text'],
        'email': ['text'],
        'Фамилия': ['text'],
        'Имя': ['text'],
        'Отчество': ['text'],
      },
      'Параметры': {
        'ТипКода': 'text',
        'ДлинаКода': 9,
      }
    },
    'СессииПользователя':{
      'Поля': {
        'Пользователь': ['Cправочник.Пользователи'],
        'Сессия': ['uuid'],
        'ДатаСоздания': ['timestamp'],
      },
      'Параметры': {
        'ТипКода': 'text',
        'ДлинаКода': 9,
      }
    },
    'Сотрудники': {
      'Поля': {
        'Фамилия': ['text'],
        'Имя': ['text'],
        'Отчество': ['text'],
        'Организация': ['Cправочник.Организации'],
      },
      'Параметры': {
        'ТипКода': 'text',
        'ДлинаКода': 9,
      }
    }
  },
  'Документы': {
    'ПриемНаРаботу': {
      'Поля': {}
    }
  }
};
