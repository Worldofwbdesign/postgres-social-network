const pg = require('pg')

class Pool {
  _pool = null

  connect = options => {
    this._pool = new pg.Pool(options)
    return this._pool.query('SELECT 1 + 1')
  }

  close = () => this._pool.end()

  query = (...params) => this._pool.query(...params) 
}

module.exports = new Pool()