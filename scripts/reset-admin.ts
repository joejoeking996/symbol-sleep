import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const username = 'admin'
const password = 'suibao123'

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  limit: 1,
  pagination: false,
  where: {
    username: {
      equals: username,
    },
  },
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'users',
    id: existing.docs[0].id,
    data: {
      name: 'Admin',
      password,
      roles: ['admin'],
      username,
    },
  })
  console.log('Admin user password reset:', username)
} else {
  await payload.create({
    collection: 'users',
    data: {
      name: 'Admin',
      password,
      roles: ['admin'],
      username,
    },
  })
  console.log('Admin user created:', username)
}

process.exit(0)
