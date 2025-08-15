import { Database } from 'bun:sqlite'
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { insertUser } from './queries'
import { createTestDb } from '../test/test-db'

let db: Database

beforeEach(() => {
  db = createTestDb()
})

afterEach(() => {
  db.close()
})

describe('insertUser', () => {

  it('should insert a user and return the user ID', async () => {
    const email = 'test@example.com'
    const password = 'super-secure-pa$$word'
    const id = await insertUser(db, email, password)
    expect(id).toBeDefined()
  })

  it('should not insert a user with an existing email', async () => {
    const email = 'test@example.com'
    const password = 'super-secure-pa$$word'
    await insertUser(db, email, password)
    try {
      await insertUser(db, email, password)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      // @ts-ignore
      expect(error.message).toContain('UNIQUE constraint failed')
    }
  })

  it('should throw an error if the password is empty', async () => {
    const email = 'test@example.com'
    const password = ''
    try {
      await insertUser(db, email, password)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      // @ts-ignore
      expect(error.message).toContain('password must not be empty')
    }
  })
})
