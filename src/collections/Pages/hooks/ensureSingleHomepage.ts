import type { CollectionAfterChangeHook } from 'payload'

import type { Page } from '../../../payload-types'

export const ensureSingleHomepage: CollectionAfterChangeHook<Page> = async ({
  context,
  doc,
  req,
}) => {
  if (!doc.isHomepage || context.skipHomepageSync) {
    return doc
  }

  const otherHomepages = await req.payload.find({
    collection: 'pages',
    depth: 0,
    limit: 100,
    overrideAccess: true,
    pagination: false,
    where: {
      and: [
        {
          isHomepage: {
            equals: true,
          },
        },
        {
          id: {
            not_equals: doc.id,
          },
        },
      ],
    },
  })

  await Promise.all(
    otherHomepages.docs.map((page) =>
      req.payload.update({
        collection: 'pages',
        context: {
          ...context,
          skipHomepageSync: true,
        },
        data: {
          isHomepage: false,
        },
        id: page.id,
        overrideAccess: true,
      }),
    ),
  )

  return doc
}
