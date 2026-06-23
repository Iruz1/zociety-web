import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  // 1. Buat kolam koneksi (Pool) pakai supir 'pg'
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  // 2. Masukkan kolam tadi ke Adapter Prisma
  const adapter = new PrismaPg(pool);
  
  // 3. Masukkan adapternya ke PrismaClient
  return new PrismaClient({ adapter });
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma