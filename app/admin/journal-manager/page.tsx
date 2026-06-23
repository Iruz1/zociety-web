import prisma from '../../lib/prisma';
import JournalManagerClient from './JournalManagerClient';

export const dynamic = 'force-dynamic';

export default async function JournalManagerPage() {
  // Ambil semua artikel dari database
  const journals = await prisma.journal.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return <JournalManagerClient initialJournals={journals} />;
}