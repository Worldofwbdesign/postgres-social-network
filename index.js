const pool = require('./src/pool')
const app = require('./src/app')

pool.connect({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'admin',
  password: ''
})
  .then(() => {
    app().listen(3005, () => console.info('Listening on port 3005'))
  })
  .catch(err => console.error(err))



