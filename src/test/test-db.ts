import { Database } from 'bun:sqlite'
import { applySchema } from '../db/db'

export const createTestDb = (): Database => {
  const db = new Database(':memory:') // Create an in-memory database for testing
  db.exec('PRAGMA journal_mode = WAL')
  applySchema(db)
  return db
}