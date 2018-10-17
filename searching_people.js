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

knex
  .select('*')
  .from('famous_people')
  .where('famous_people.first_name', process.argv[2])
  .asCallback(function(err, rows) {
    if (err) {
      return console.error(err);
    }
    console.log(`Found ${rows.length} by the name ${process.argv[2]}`);
    // loop thru database
    for (i = 0; i < rows.length; i++) {
      console.log(
        `- ${i + 1}: ${rows[i].first_name} ${rows[i].last_name}, born '${
          rows[i].birthdate.toISOString().split('T')[0]
        }'`
      );
    }
  });
