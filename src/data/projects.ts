// ========================================
// Static Project Data — sesuai PRD Section 5
// ========================================

import { Project, SkillCategory, Certification, StatCounter } from '@/types';

export const projects: Project[] = [
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

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    color: 'purple',
    colorHex: '#bd93f9',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'Machine Learning Fundamentals', level: 65 },
      { name: 'Data Processing & Automation', level: 70 },
      { name: 'AI Workflow', level: 60 },
      { name: 'Model Deployment Exploration', level: 55 },
    ],
  },
  {
    title: 'Cybersecurity & Networking',
    color: 'green',
    colorHex: '#00ff88',
    skills: [
      { name: 'Docker', level: 75 },
      { name: 'VPS Configuration', level: 70 },
      { name: 'Penetration Testing Simulation', level: 65 },
      { name: 'Kali Linux', level: 70 },
      { name: 'Wifite', level: 60 },
      { name: 'Fern WiFi Cracker', level: 55 },
      { name: 'Tor Networking', level: 60 },
      { name: 'Vulnerability Analysis', level: 65 },
    ],
  },
  {
    title: 'Hardware & Embedded Systems',
    color: 'orange',
    colorHex: '#ff8c00',
    skills: [
      { name: 'ESP32-S3', level: 70 },
      { name: 'Embedded Programming', level: 65 },
      { name: 'Hardware Wiring', level: 75 },
      { name: 'Troubleshooting', level: 80 },
      { name: 'Instalasi Tenaga Listrik', level: 85 },
    ],
  },
  {
    title: 'Programming Languages',
    color: 'cyan',
    colorHex: '#00d4ff',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'Java', level: 55 },
      { name: 'JavaScript', level: 60 },
    ],
  },
  {
    title: 'Systems & Infrastructure',
    color: 'white',
    colorHex: '#e6edf3',
    skills: [
      { name: 'Linux Environment', level: 75 },
      { name: 'Docker', level: 75 },
      { name: 'Virtual Environment', level: 70 },
      { name: 'Basic Server Management', level: 65 },
      { name: 'Network Simulation', level: 60 },
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: 'Sertifikasi BNSP',
    organization: 'BNSP — Kelistrikan',
    status: 'COMPLETED',
    description: 'Sertifikasi kompetensi bidang kelistrikan dari Badan Nasional Sertifikasi Profesi.',
    icon: '⚡',
  },
  {
    name: 'Samsung Innovation Campus',
    organization: 'Samsung',
    status: 'ACTIVE',
    description: 'Program inovasi teknologi dan pengembangan skill digital dari Samsung.',
    icon: '📱',
  },
  {
    name: 'Dicoding Indonesia',
    organization: 'Dicoding',
    status: 'ACTIVE',
    description: 'Platform pembelajaran developer Indonesia. Active participant.',
    icon: '💻',
  },
  {
    name: 'Modul Pemrograman Terstruktur',
    organization: 'Dicoding Indonesia',
    status: 'COMPLETED',
    description: 'Kursus pemrograman terstruktur melalui platform Dicoding.',
    icon: '📚',
  },
];

export const stats: StatCounter[] = [
  { value: '2+', label: 'Projects Aktif' },
  { value: '3+', label: 'Tech Domain' },
  { value: '5+', label: 'Tools & Framework' },
  { value: '∞', label: 'Coffee Cups' },
];

export const bioText = `Mahasiswa S1 Ilmu Komputer dengan latar belakang teknik instalasi tenaga listrik yang memiliki kombinasi kemampuan pada bidang hardware, software, dan infrastruktur sistem. Memiliki fokus utama pada pengembangan Artificial Intelligence (AI), Machine Learning, dan eksplorasi Cybersecurity, khususnya dalam keamanan jaringan, virtualisasi sistem, serta riset perangkat berbasis mikrokontroler.

Berpengalaman dalam membangun lingkungan simulasi keamanan menggunakan VPS, Docker, dan tools penetration testing berbasis Linux untuk memahami analisis kerentanan serta mitigasi sistem. Selain itu, memiliki kemampuan dalam pengembangan perangkat keras menggunakan ESP32-S3, troubleshooting hardware, serta integrasi sistem antara perangkat fisik dan software.

Memiliki ketertarikan tinggi terhadap pengembangan teknologi cerdas yang menggabungkan AI, embedded systems, dan cybersecurity research. Tipe orang yang rela begadang debugging Docker hanya untuk sadar ternyata salah expose port. Ritual klasik dunia teknologi. Mesin tidak marah, tapi manusia biasanya iya.`;
