import knex from 'knex'
import path from 'path'
export function offlineDatabase() {
    return knex({
        client: 'sqlite3',
        connection: {
          filename: path.join('./database.sqlite')
        }
      })
}