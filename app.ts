import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { quotes } from './db/schema'
import * as schema from './db/schema'
import { eq, lt, sql } from "drizzle-orm"


const sqlite = new Database('./db/test.db')
const db = drizzle(sqlite, { schema })

// Insert...

// ### one single row

// INSERT INTO quotes VALUES author = manni, quote: 'wie geeehts'
const insertOne = db
  .insert(quotes)
  .values({author: 'manni', quote: 'Wie geeehts'})
  .run()

console.log({insertOne})

// ### many rows

//   lets have some quotes in memory
const someQuotes = [
  {author: 'Mario', quote: 'its a me, mario'},
  {author: 'Siggi', quote: 'hinten rum is wie vorna rum blos aners rum'},
  {author: 'Antenne Bayern', quote: 'Ein Mugel, halb Mensch, halb Kugel'},
  {author: 'Oscar Wilde', quote: 'Be yourself, everyone else is already taken'},
  {author: 'Steve Jobs', quote: 'Your time is limited, dont waste it living someone elses life'}
]

//   lets store them in our database
//   INSERT INTO quotes (author, quote) VALUES (author = 'mario', quote = 'its a me mario'), (author = 'Siggi', quote=...), ....
const insertMany = db
  .insert(quotes)
  .values(someQuotes)
  .run()

console.log({insertMany})

// ### single row with return
const insertOneReturn = db
  .insert(quotes)
  .values({author: 'Siggi', quote: 'zu viel langt a net'})
  .returning()
  .get()

console.log({insertOneReturn})
// ## Select...

// ### all rows with all columns:
//    SELECT * FROM quotes
const selectAll = db
  .select()
  .from(quotes)
  .all()

console.log({selectAll})

// ### single row with all columns:
//    SELECT * FROM quotes WHERE id = 2
const selectOne = db
  .select()
  .from(quotes)
  .where(eq(quotes.id, 2))
  .get()

console.log({selectOne})

// ### first three rows with author-column
//   SELECT author FROM quotes WHERE id < 4
const selectAuthorOfFirstThree = db
  .select({author: quotes.author})
  .from(quotes)
  .where(lt(quotes.id, 4))
  .all()

console.log({selectAuthorOfFirstThree})

// ### all rows, all columns, limited to row 3-6
// SELECT * FROM quotes LIMIT 4 OFFSET 2
const selectLimited = db
  .select()
  .from(quotes)
  .limit(4)
  .offset(2)
  .all()

console.log({selectLimited})

// ## Update...

// ### one row (with return)
// UPDATE quotes SET author = siggi WHERE id = 3
const updateOne = db
  .update(quotes)
  .set({ author: 'siggi', updated_at: sql`(current_time)`})
  .where(eq(quotes.id, 3))
  .returning()
  .get()

console.log(updateOne)

// ### many rows (with return)
const updateMany = db
  .update(quotes)
  .set({author: 'siggi', updated_at: sql`(current_time)`})
  .where(eq(quotes.author, 'Siggi'))
  .returning()
  .all()

console.log(updateMany)

// ## Delete...

// ### one row (first)
//  DELETE FROM quotes WHERE id = 1
const deleteOne = db
  .delete(quotes)
  .where(eq(quotes.id, 1))
  .run()

console.log(deleteOne)

// ### many rows 
const deleteMany = db
  .delete(quotes)
  .where(lt(quotes.id, 5))
  .run()

console.log(deleteMany)