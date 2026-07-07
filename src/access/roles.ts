import type { Access, AccessArgs } from 'payload'

import type { User } from '@/payload-types'

export const hasRole = (user: null | User | undefined, roles: User['roles'] = []) => {
  if (!user) return false
  const allowedRoles = roles || []
  return (user.roles || []).some((role) => allowedRoles.includes(role))
}

export const adminOnly: Access = ({ req: { user } }) => hasRole(user as User, ['admin'])

export const editorOrAdmin: Access = ({ req: { user } }) =>
  hasRole(user as User, ['admin', 'editor'])

export const viewerOrAbove: Access = ({ req: { user } }) =>
  hasRole(user as User, ['admin', 'editor', 'viewer'])

export const viewerOrAboveBoolean = ({ req: { user } }: AccessArgs<User>) =>
  hasRole(user as User, ['admin', 'editor', 'viewer'])

export const adminOnlyField = ({ req: { user } }: { req: { user?: null | User } }) =>
  hasRole(user as User, ['admin'])

export const canManageOwnUserOrAdmin = ({ id, req: { user } }: AccessArgs<User>) => {
  if (hasRole(user as User, ['admin'])) return true
  return user?.id === id
}
