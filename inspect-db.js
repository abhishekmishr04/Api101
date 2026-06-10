const mysql = require('mysql2/promise');

(async () => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234'
  });

  const [schemas] = await conn.query('SHOW DATABASES');
  console.log('DATABASES');
  console.log(JSON.stringify(schemas, null, 2));

  for (const schema of schemas) {
    const dbName = schema.Database;
    if (dbName && dbName.toLowerCase().includes('api')) {
      try {
        const dbConn = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '1234',
          database: dbName
        });
        const [tables] = await dbConn.query('SHOW TABLES');
        console.log('\nTABLES IN', dbName);
        console.log(JSON.stringify(tables, null, 2));
        await dbConn.end();
      } catch (err) {
        console.log('\nERROR FOR', dbName, err.message);
      }
    }
  }

  await conn.end();
})().catch(err => {
  console.error(err.message);
  process.exit(1);
});
