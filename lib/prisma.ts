/*
import { PrismaClient } from '@prisma/client'

// Use globalThis to avoid Node vs Edge/runtime typing issues and hot-reload duplication.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
*/

// Prisma is temporarily disabled per request. Keep minimal stubs to avoid import errors elsewhere.
// Remove this section and uncomment the block above to re-enable the real Prisma client.
// Using 'any' to avoid type errors when @prisma/client types are unavailable.
export const prisma: any = undefined
export default prisma
