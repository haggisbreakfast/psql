const pg = require('pg');
const settings = require('./settings'); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect(err => {
  if (err) {
    return console.error('Connection Error', err);
  }
  console.log('Seaching ...');
  client.query('SELECT * from famous_people WHERE first_name = $1', [process.argv[2]], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(`Found ${result.rows.length} by the name ${process.argv[2]}`);
    for (let i = 0; i < result.rows.length; i++) {
      let bday = moment(result.rows[i].birthdate).format(YYYY - MM - DD);
      console.log(bday);
      // console.log(`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${bday}'`);
    }
    // console.log()
    //output: 1
    // promise
    client.end();
  });
});
