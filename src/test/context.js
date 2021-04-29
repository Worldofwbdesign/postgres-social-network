const pool = require('../pool')

const { randomBytes } = require('crypto')
const { default: migration } = require('node-pg-migrate')
const format = require('pg-format')

const defaultDbOptions = {
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork-test',
  user: 'admin',
  password: ''
}

class Context {
  static build = async () => {
    const roleName = 'a' + randomBytes(4).toString('hex')
    const userDbConfig = {
      host: 'localhost',
      port: 5432,
      database: 'socialnetwork-test',
      user: roleName,
      password: roleName
    }
  
    await pool.connect(defaultDbOptions)
  
    await pool.query(format(
      'CREATE ROLE %I WITH LOGIN PASSWORD %L',
      roleName,
      roleName
    ))
  
    await pool.query(format(
      'CREATE SCHEMA %I AUTHORIZATION %I',
      roleName,
      roleName
    ))
  
    await pool.close()
  
    await migration({
      schema: roleName,
      direction: 'up',
      log: () => {},
      noLock: true,
      dir: 'migrations',
      databaseUrl: userDbConfig
    })
  
    await pool.connect(userDbConfig)

    return new Context(roleName)
  }

  constructor(roleName) {
    this.roleName = roleName
  }

  reset = () => pool.query('DELETE FROM users')

  close = async () => {
    await pool.close()

    await pool.connect(defaultDbOptions)
    await pool.query(
      format('DROP SCHEMA %I CASCADE', this.roleName)
    )
    await pool.query(
      format('DROP ROLE %I', this.roleName)
    )

    await pool.close()
  }
}

module.exports = Context