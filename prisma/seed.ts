// ========================================
// Prisma Seed — Migrate static data to DB
// Run: npx prisma db seed
// ========================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    slug: 'chrono-spectral-daemon',
    name: 'Chrono Spectral Daemon',
    category: ['Cybersecurity', 'Hardware'],
    status: 'Active',
    statusLabel: 'Active — Mei 2026 - Sekarang',
    featured: true,
    onChain: true,
    description: `Chrono Spectral Daemon adalah proyek penelitian hardware berbasis mikrokontroler ESP32-S3 yang dirancang sebagai instrumen eksplorasi keamanan siber dan embedded systems. Proyek ini menggabungkan pengembangan perangkat keras dengan pemrograman mikrokontroler untuk menciptakan platform riset yang dapat digunakan dalam eksplorasi sistem keamanan jaringan dan komunikasi perangkat.`,
    shortDescription: 'Proyek riset hardware ESP32-S3 untuk eksplorasi cybersecurity dan embedded systems.',
    responsibilities: [
      'Merancang wiring perangkat dan integrasi hardware ESP32-S3',
      'Mengembangkan logika pemrograman berbasis mikrokontroler',
      'Melakukan pengujian komunikasi antar perangkat',
      'Mengeksplorasi implementasi perangkat untuk riset cybersecurity',
      'Hardware debugging dan troubleshooting',
    ],
    techStack: ['ESP32-S3', 'Python', 'Embedded Programming', 'Hardware Debugging'],
    icon: '🔬',
    startDate: 'Mei 2026',
    githubUrl: 'https://github.com/Df-pro',
  },
  {
    slug: 'network-security-simulation',
    name: 'Simulasi & Eksplorasi Keamanan Jaringan',
    category: ['Cybersecurity', 'Infrastructure'],
    status: 'Research',
    statusLabel: 'Research/Ongoing',
    featured: true,
    onChain: false,
    description: `Membangun lingkungan virtualisasi terisolasi berbasis Docker dan VPS untuk simulasi audit keamanan jaringan dasar serta eksplorasi mitigasi kerentanan sistem. Proyek ini menciptakan lab keamanan virtual yang aman untuk mempelajari teknik penetration testing, analisis kerentanan, dan hardening sistem tanpa risiko pada lingkungan produksi.`,
    shortDescription: 'Lab keamanan virtual berbasis Docker & VPS untuk simulasi penetration testing.',
    responsibilities: [
      'Deployment dan konfigurasi container menggunakan Docker',
      'Setup VPS berbasis Linux untuk lingkungan terisolasi',
      'Simulasi skenario keamanan jaringan',
      'Pengujian tools penetration testing: Wifite, Fern WiFi Cracker',
      'Eksplorasi monitoring dan hardening sistem',
      'Konfigurasi Tor Networking untuk anonymization research',
    ],
    techStack: ['Docker', 'Linux VPS', 'Kali Linux', 'Wifite', 'Fern WiFi Cracker', 'Tor'],
    icon: '🛡️',
    startDate: '2025',
    githubUrl: 'https://github.com/Df-pro',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  for (const project of projects) {
    const existing = await prisma.project.findUnique({
      where: { slug: project.slug },
    });

    if (existing) {
      await prisma.project.update({
        where: { slug: project.slug },
        data: project,
      });
      console.log(`  ✅ Updated: ${project.name}`);
    } else {
      await prisma.project.create({ data: project });
      console.log(`  ✅ Created: ${project.name}`);
    }
  }

  console.log('🌱 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
