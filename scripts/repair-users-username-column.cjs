const { createClient } = require('@libsql/client')

async function main() {
  const db = createClient({ url: 'file:./company-site.db' })
  const columns = await db.execute('pragma table_info(users)')
  const hasUsername = columns.rows.some((row) => row.name === 'username')

  if (hasUsername) {
    console.log('users.username already exists')
    return
  }

  await db.execute('alter table users add column username text')
  console.log('users.username column added')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
