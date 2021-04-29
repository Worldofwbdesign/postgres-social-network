const pool = require('../pool')
const toCamelCase = require('./utils/to-camel-case')

class UserRepo {
  static find = async () => {
    const { rows } = await pool.query(`
      SELECT * FROM users
    `)

    return toCamelCase(rows)
  }

  static findById = async id => {
    const { rows } = await pool.query(
      `
        SELECT * FROM users
        WHERE id = $1;
      `,
      [id]
    )

    return toCamelCase(rows)[0]
  }

  static insert = async ({ username, bio }) => {
    const { rows } = await pool.query(
      'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;',
      [username, bio]
    )

    return toCamelCase(rows)[0]
  }

  static update = async (id, { username, bio }) => {
    const { rows } = await pool.query(
      'UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *',
      [username, bio, id]
    )

    return toCamelCase(rows)[0]
  }

  static delete = async (id) => {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    )

    return toCamelCase(rows)[0]
  }

  static count = async () => {
    const { rows } = await pool.query('SELECT COUNT(*) FROM users')

    return parseInt(rows[0].count)
  }
}

module.exports = UserRepo