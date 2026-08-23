import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('o4re@i9J9P', 10);
  await prisma.user.upsert({
    where: { email: 'abacus-b3ad355a@example.com' },
    update: { password },
    create: {
      email: 'abacus-b3ad355a@example.com',
      name: 'Test Executive',
      password,
      role: 'admin',
    },
  });
  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
