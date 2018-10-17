const settings = require('./settings'); // settings.json

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

knex('famous_people')
  .insert({ first_name: process.argv[2], last_name: process.argv[3], birthdate: process.argv[4] })
  .asCallback(function(err) {
    if (err) {
      return console.error(err);
    }
    knex.destroy();
  });
