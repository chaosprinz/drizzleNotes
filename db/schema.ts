import { sql } from 'drizzle-orm'
import { integer, text, sqliteTable  } from 'drizzle-orm/sqlite-core'

export const quotes = sqliteTable('quotes', {
  id: integer('id').primaryKey({autoIncrement: true}),
  author: text('author'),
  quote: text('quote'),
  created_at: text('created_at').default(sql`(current_timestamp)`),
  updated_at: text('updated_at').default(sql`(current_timestamp)`)
})
