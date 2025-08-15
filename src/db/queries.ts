import { Database } from 'bun:sqlite'

export const insertUser = async (db: Database, email: string, password: string) => {
  const insertQuery = db.query(`INSERT INTO users (id, email, password_hash) 
    VALUES (?, ?, ?)`)
  const id = crypto.randomUUID()
  const passwordHash = await Bun.password.hash(password)
  insertQuery.run(id, email, passwordHash)

  return id
}

export const getUserByEmail = (db: Database, email: string) => {
  const userQuery = db.query(`SELECT id, password_hash FROM users WHERE email = ?`)
  const user = userQuery.get(email) as {
    id: string
    password_hash: string
  } | null

  return user
}

export const getUserById = (db: Database, id: string) => {
  const userQuery = db.query(`SELECT id, email FROM users WHERE id = ?`)
  const user = userQuery.get(id) as {
    id: string
    email: string
  } | null

  return user
}

