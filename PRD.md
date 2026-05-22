
Halo Antigravity! Saya ingin kamu membangun website portfolio profesional saya dari nol.
Ini bukan portfolio biasa — ini adalah portfolio hybrid Web2 + Web3 dengan elemen
interaktif, dark cyberpunk aesthetic, dan integrasi blockchain. Baca semua detail
di bawah sebelum membuat implementation plan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 1. IDENTITAS PEMILIK PORTFOLIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nama lengkap  : Dwi Ferdianto
Title/Profesi : AI Engineer | Machine Learning Enthusiast | Cybersecurity Researcher
Tagline       : "Building Intelligent Systems. Breaking Weak Ones."
Sub-tagline   : "Where AI meets Cybersecurity meets Embedded Systems"
Lokasi        : Indonesia
Email         : Dwiferdianto69@gmail.com
WhatsApp      : 081336988310
LinkedIn      : LinkedIn Dwi Ferdianto
Universitas   : Universitas Ary Ginanjar (ESQ Business School) — S1 Ilmu Komputer
Status        : Mahasiswa Aktif

Bio singkat (gunakan ini di About section):
"Mahasiswa S1 Ilmu Komputer dengan latar belakang teknik instalasi tenaga listrik yang memiliki kombinasi kemampuan pada bidang hardware, software, dan infrastruktur sistem. Memiliki fokus utama pada pengembangan Artificial Intelligence (AI), Machine Learning, dan eksplorasi Cybersecurity, khususnya dalam keamanan jaringan, virtualisasi sistem, serta riset perangkat berbasis mikrokontroler.

Berpengalaman dalam membangun lingkungan simulasi keamanan menggunakan VPS, Docker, dan tools penetration testing berbasis Linux untuk memahami analisis kerentanan serta mitigasi sistem. Selain itu, memiliki kemampuan dalam pengembangan perangkat keras menggunakan ESP32-S3, troubleshooting hardware, serta integrasi sistem antara perangkat fisik dan software.

Memiliki ketertarikan tinggi terhadap pengembangan teknologi cerdas yang menggabungkan AI, embedded systems, dan cybersecurity research. Tipe orang yang rela begadang debugging Docker hanya untuk sadar ternyata salah expose port. Ritual klasik dunia teknologi. Mesin tidak marah, tapi manusia biasanya iya."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2. TECH STACK YANG HARUS DIGUNAKAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend:
- Next.js 14 (App Router) + TypeScript (strict mode)
- Tailwind CSS
- Framer Motion (semua animasi)
- Three.js via @react-three/fiber + @react-three/drei (particle background hero)
- shadcn/ui untuk komponen dasar

Web3:
- wagmi v2 + viem
- RainbowKit (wallet connector UI)
- ethers.js untuk interaksi smart contract
- Target network: Polygon Mumbai Testnet

Backend / API:
- Next.js API Routes (serverless)
- Prisma ORM + PostgreSQL (via Supabase free tier)
- Resend untuk email contact form

Infrastruktur:
- Vercel untuk deployment
- Cloudflare (CDN, optional)
- IPFS via Pinata untuk asset desentralisasi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3. DESIGN SYSTEM — CYBERPUNK DARK TERMINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tema visual: DARK CYBERPUNK / HACKER TERMINAL
Inspirasi: kombinasi terminal hacker, neon noir, dan interface AI futuristik.
Bukan sekadar dark mode biasa — ini harus terasa seperti command center.

Warna:
  --bg-primary    : #080c10  (near-black, sedikit biru gelap)
  --bg-secondary  : #0d1117  (dark card surface)
  --bg-tertiary   : #161b22  (elevated surface)
  --accent-green  : #00ff88  (terminal green — warna utama cybersecurity)
  --accent-cyan   : #00d4ff  (AI/data blue-cyan)
  --accent-purple : #bd93f9  (ML/neural purple)
  --accent-orange : #ff8c00  (hardware/embedded orange)
  --accent-red    : #ff4757  (warning/danger)
  --text-primary  : #e6edf3
  --text-secondary: #7d8590
  --text-muted    : #4a5568
  --border-glow   : rgba(0, 255, 136, 0.3)

Typography:
  - Heading display: font "Share Tech Mono" atau "Orbitron" (Google Fonts) — futuristic
  - Body: font "IBM Plex Mono" atau "Space Mono" — terminal feel
  - UI Labels: font "Inter" atau "DM Sans" — readable

Efek visual wajib:
  - Scanline overlay subtle di background (CSS ::after pseudo-element)
  - Glitch text effect pada nama "Dwi Ferdianto" di hero saat pertama load
  - Cursor blink effect pada typing animation (seperti terminal cursor blinking)
  - Neon glow pada border elemen penting (box-shadow dengan warna accent)
  - Particle network di hero background (Three.js — node-node terhubung garis seperti
    neural network atau peta jaringan)
  - Matrix-style rain effect ringan di background (CSS animation, bukan JS berat)
  - Hover state semua card: neon border glow + subtle lift
  - Custom cursor: crosshair dengan dot center berwarna --accent-green
  - Loading screen: terminal boot sequence animasi (teks "INITIALIZING SYSTEM..."
    kemudian "LOADING PORTFOLIO..." dengan progress bar terminal style)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4. STRUKTUR HALAMAN LENGKAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### NAVBAR (sticky, semua halaman)
- Logo kiri: "> DWI_" dengan cursor blinking animation
- Menu: Home | Projects | Skills | About | Contact
- Kanan: tombol "Connect Wallet" (RainbowKit) + dark mode toggle
- Background: transparent → frosted glass + border bottom glow saat scroll
- Mobile: hamburger menu dengan slide-in panel

---

### HALAMAN UTAMA (/)

#### HERO SECTION — Full viewport height
- Background: Three.js particle network (node-node terhubung seperti neural network,
  warna campuran --accent-green dan --accent-cyan, bergerak lambat)
- Center content:
  - Teks kecil: "[ SYSTEM ONLINE ]" dengan dot hijau berkedip
  - Nama besar: "DWI FERDIANTO" dengan glitch text effect saat load
  - Typing animation bergantian menampilkan:
    "AI Engineer"
    "Machine Learning Enthusiast"
    "Cybersecurity Researcher"
    "Embedded Systems Developer"
  - Deskripsi singkat 1 baris: "Building Intelligent Systems. Breaking Weak Ones."
  - Dua tombol CTA:
    Tombol 1: "[ EXPLORE PROJECTS ]" — scroll ke section projects
    Tombol 2: "[ CONNECT WALLET ]" — trigger RainbowKit modal
  - Status badge kecil: "● AVAILABLE FOR COLLABORATION"
- Scroll indicator: animated arrow/chevron bounce di bawah

#### ABOUT SNIPPET SECTION
- Grid 2 kolom: kiri foto profil (placeholder avatar dengan frame hexagon neon),
  kanan teks bio dari data di atas
- 4 stat counter animasi:
  "2+" Projects Aktif | "3+" Tech Domain | "5+" Tools & Framework | "∞" Coffee Cups
- Badge universitas: "ESQ Business School — Ilmu Komputer"

#### SKILLS MATRIX SECTION
Tampilkan skills dalam format kategori dengan visual bar atau dot indicator:

Kategori 1 — AI & Machine Learning (warna: --accent-purple)
  Python | Machine Learning Fundamentals | Data Processing & Automation |
  AI Workflow | Model Deployment Exploration

Kategori 2 — Cybersecurity & Networking (warna: --accent-green)
  Docker | VPS Configuration | Penetration Testing Simulation |
  Kali Linux | Wifite | Fern WiFi Cracker | Tor Networking |
  Vulnerability Analysis

Kategori 3 — Hardware & Embedded Systems (warna: --accent-orange)
  ESP32-S3 | Embedded Programming | Hardware Wiring |
  Troubleshooting | Instalasi Tenaga Listrik

Kategori 4 — Programming Languages (warna: --accent-cyan)
  Python | Java | JavaScript

Kategori 5 — Systems & Infrastructure (warna: --text-primary)
  Linux Environment | Docker | Virtual Environment |
  Basic Server Management | Network Simulation

Visual: bukan bar biasa — gunakan format seperti terminal dengan label dan
nilai persentase yang "di-type" satu per satu saat scroll ke section ini.

#### FEATURED PROJECTS SECTION
Tampilkan 2 project unggulan sebagai card besar (full data ada di section 5):
  - Chrono Spectral Daemon
  - Simulasi & Eksplorasi Keamanan Jaringan
Tambahkan tombol "[ VIEW ALL PROJECTS ]" yang link ke /projects

#### WEB3 SECTION — "ON-CHAIN IDENTITY"
- Judul section: "> BLOCKCHAIN_IDENTITY.exe"
- Sub-teks: "Connect your wallet to interact with on-chain features"
- Jika wallet BELUM connect:
  - CTA card besar dengan animasi pulse: "Connect MetaMask or any Web3 wallet"
  - Deskripsi singkat tentang fitur apa yang bisa diakses
- Jika wallet SUDAH connect:
  - Tampilkan address (singkat: 0x...xxxx) dan balance MATIC
  - NFT Gallery: fetch dan tampilkan NFT dari wallet (via Alchemy NFT API)
  - Setiap NFT card: gambar, nama, collection name, network badge
  - Jika tidak ada NFT: tampilkan pesan "No NFTs found in this wallet"

#### CERTIFICATIONS & TRAINING SECTION
- Sertifikasi BNSP (Kelistrikan) — dengan badge resmi style
- Samsung Innovation Campus — badge active participant
- Dicoding Indonesia — badge active participant
- Kursus: Modul Pemrograman Terstruktur (Dicoding)
Visual: card-card dengan icon, nama program, status badge "ACTIVE" atau "COMPLETED"

#### CONTACT SECTION
- Judul: "> OPEN_CHANNEL.sh"
- Form: Nama | Email | Subject | Pesan
- Submit via API Route → Resend → email ke Dwiferdianto69@gmail.com
- Juga tampilkan kontak langsung:
  Email: Dwiferdianto69@gmail.com
  WhatsApp: 081336988310
  LinkedIn: LinkedIn Dwi Ferdianto
- Success state: terminal-style output "[ MESSAGE SENT SUCCESSFULLY ✓ ]"

---

### HALAMAN PROJECTS (/projects)

- Header: "> ls -la ./projects" (terminal style heading)
- Filter bar: All | AI/ML | Cybersecurity | Hardware | Research
- Grid 2-3 kolom, semua project dari section 5
- Search field: placeholder "grep project_name..."
- Setiap card: thumbnail/icon, nama, kategori badge, deskripsi singkat,
  tech stack tags, status badge (Active/Research/Completed),
  tombol "[ VIEW DETAILS ]"

---

### HALAMAN PROJECT DETAIL (/projects/[slug])

- Hero dengan nama project besar dan kategori badge
- Deskripsi lengkap (markdown rendering)
- Tanggal mulai dan status
- Tech stack yang dipakai (icon + label)
- Tanggung jawab / aktivitas yang dilakukan (bullet list)
- Tombol: "[ VIEW GITHUB ]" (placeholder link) | "[ VERIFY ON-CHAIN ]"
- "Verify On-Chain": memanggil smart contract, tampilkan TX hash + Polygonscan link
- Related projects di bawah

---

### HALAMAN ABOUT (/about)

- Bio lengkap Dwi Ferdianto
- Timeline pendidikan:
  2024-Sekarang: S1 Ilmu Komputer, Universitas Ary Ginanjar (ESQ Business School)
  Sebelumnya: SMK PGRI 1 Kediri — Teknik Instalasi Tenaga Listrik
- Ketertarikan profesional: AI, ML Engineering, Cybersecurity, Embedded Systems,
  Network Security, IoT, AI Automation Infrastructure
- Nilai tambah: hardware + software combo, sistem fisik + digital, riset mandiri
- Tujuan karier: AI Engineer & ML Engineer dengan spesialisasi AI + Cybersecurity +
  Embedded Systems
- Download CV button (PDF placeholder)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5. DATA PROJECT LENGKAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### PROJECT 1: Chrono Spectral Daemon

Slug          : chrono-spectral-daemon
Kategori      : Cybersecurity Research | Hardware
Status        : Active — Mei 2026 - Sekarang
Featured      : YES (tampilkan di homepage)
On-Chain      : YES (project ini diverifikasi di smart contract)

Deskripsi panjang:
"Chrono Spectral Daemon adalah proyek penelitian hardware berbasis mikrokontroler
ESP32-S3 yang dirancang sebagai instrumen eksplorasi keamanan siber dan embedded
systems. Proyek ini menggabungkan pengembangan perangkat keras dengan pemrograman
mikrokontroler untuk menciptakan platform riset yang dapat digunakan dalam
eksplorasi sistem keamanan jaringan dan komunikasi perangkat."

Tanggung jawab:
- Merancang wiring perangkat dan integrasi hardware ESP32-S3
- Mengembangkan logika pemrograman berbasis mikrokontroler
- Melakukan pengujian komunikasi antar perangkat
- Mengeksplorasi implementasi perangkat untuk riset cybersecurity
- Hardware debugging dan troubleshooting

Tech stack: ESP32-S3 | Python | Embedded Programming | Hardware Debugging

Icon/emoji untuk card: 🔬 (atau gunakan SVG chip icon)

---

### PROJECT 2: Simulasi & Eksplorasi Keamanan Jaringan

Slug          : network-security-simulation
Kategori      : Cybersecurity | Infrastructure
Status        : Research/Ongoing
Featured      : YES (tampilkan di homepage)
On-Chain      : NO

Deskripsi panjang:
"Membangun lingkungan virtualisasi terisolasi berbasis Docker dan VPS untuk simulasi
audit keamanan jaringan dasar serta eksplorasi mitigasi kerentanan sistem. Proyek
ini menciptakan lab keamanan virtual yang aman untuk mempelajari teknik penetration
testing, analisis kerentanan, dan hardening sistem tanpa risiko pada lingkungan
produksi."

Aktivitas:
- Deployment dan konfigurasi container menggunakan Docker
- Setup VPS berbasis Linux untuk lingkungan terisolasi
- Simulasi skenario keamanan jaringan
- Pengujian tools penetration testing: Wifite, Fern WiFi Cracker
- Eksplorasi monitoring dan hardening sistem
- Konfigurasi Tor Networking untuk anonymization research

Tech stack: Docker | Linux VPS | Kali Linux | Wifite | Fern WiFi Cracker | Tor

Icon/emoji untuk card: 🛡️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6. FITUR WEB3 LENGKAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### A. Wallet Connection (RainbowKit)
- Support: MetaMask, WalletConnect, Coinbase Wallet
- Setelah connect: tampilkan address singkat di navbar
- Simpan sesi (wagmi auto-reconnect)
- Network: Polygon Mumbai Testnet (chainId: 80001)

### B. Smart Contract — Portfolio Verifier
Deploy smart contract berikut di Polygon Mumbai Testnet.
Buat file: contracts/PortfolioVerifier.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PortfolioVerifier {
    address public owner;

    struct Project {
        bytes32 contentHash;
        string name;
        uint256 timestamp;
        bool verified;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    event ProjectVerified(
        uint256 indexed id,
        bytes32 contentHash,
        string name,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function verifyProject(
        string memory name,
        string memory description
    ) external onlyOwner returns (uint256) {
        bytes32 hash = keccak256(
            abi.encodePacked(name, description, block.timestamp)
        );
        uint256 id = projectCount++;
        projects[id] = Project(hash, name, block.timestamp, true);
        emit ProjectVerified(id, hash, name, block.timestamp);
        return id;
    }

    function getProject(uint256 id) external view returns (
        bytes32, string memory, uint256, bool
    ) {
        require(projects[id].verified, "Project not found");
        Project memory p = projects[id];
        return (p.contentHash, p.name, p.timestamp, p.verified);
    }

    function isVerified(uint256 id) external view returns (bool) {
        return projects[id].verified;
    }
}

### C. NFT Gallery
- Fetch NFT dari wallet yang connect menggunakan Alchemy NFT API
- Tampilkan di section "ON-CHAIN IDENTITY" di homepage
- Grid galeri dengan animasi masuk staggered
- Klik NFT: buka modal dengan detail (nama, collection, deskripsi, link OpenSea)

### D. On-Chain Project Verification
- Di halaman detail project yang ber-status "On-Chain: YES"
- Tombol "[ VERIFY ON-CHAIN ]" memanggil fungsi isVerified() dari smart contract
- Tampilkan: ✓ VERIFIED | TX Hash | Link Polygonscan
- Project "Chrono Spectral Daemon" adalah project pertama yang diverifikasi (id: 0)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7. STRUKTUR FOLDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/
├── app/
│   ├── layout.tsx              (RainbowKit provider, Framer Motion)
│   ├── page.tsx                (Homepage)
│   ├── projects/
│   │   ├── page.tsx            (All projects grid)
│   │   └── [slug]/page.tsx     (Project detail)
│   ├── about/page.tsx
│   └── api/
│       ├── contact/route.ts    (Resend email)
│       ├── projects/route.ts   (CRUD projects)
│       └── nft/route.ts        (Alchemy NFT proxy)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LoadingScreen.tsx   (Terminal boot animation)
│   ├── sections/
│   │   ├── Hero.tsx            (Three.js particle network)
│   │   ├── AboutSnippet.tsx
│   │   ├── SkillsMatrix.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── Web3Section.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── GlitchText.tsx      (Glitch effect component)
│   │   ├── TerminalCard.tsx    (Card dengan terminal aesthetic)
│   │   ├── NeonBadge.tsx
│   │   ├── TypeWriter.tsx      (Typing animation)
│   │   └── CustomCursor.tsx    (Crosshair cursor)
│   └── web3/
│       ├── WalletButton.tsx
│       ├── NFTCard.tsx
│       ├── NFTGallery.tsx
│       └── VerifyButton.tsx
├── lib/
│   ├── wagmi.ts                (wagmi + RainbowKit config)
│   ├── prisma.ts
│   ├── contract.ts             (ABI + contract address)
│   └── alchemy.ts              (NFT API helper)
├── contracts/
│   └── PortfolioVerifier.sol
├── hooks/
│   ├── useWallet.ts
│   ├── useNFTs.ts
│   └── useContract.ts
├── data/
│   └── projects.ts             (Static project data — sesuai section 5)
├── types/
│   └── index.ts
└── styles/
    └── globals.css             (CSS variables, scanline effect, custom cursor)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8. ENVIRONMENT VARIABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Buat file .env.local.example dengan isi:

# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Web3
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=""
NEXT_PUBLIC_ALCHEMY_API_KEY=""
NEXT_PUBLIC_CONTRACT_ADDRESS=""
NEXT_PUBLIC_CHAIN_ID=80001

# IPFS (Pinata)
PINATA_API_KEY=""
PINATA_SECRET_KEY=""

# Email (Resend)
RESEND_API_KEY=""
CONTACT_EMAIL="Dwiferdianto69@gmail.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_OWNER_WALLET=""

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9. HALAMAN KHUSUS TAMBAHAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 404 Page — Terminal Style
Tampilkan pesan error dalam format terminal:
> ERROR 404: page_not_found
> SCANNING SYSTEM...
> The requested file does not exist in this directory.
> Try: cd /home | cd /projects | cd /about
Dengan tombol "[ RETURN TO HOME ]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 10. INSTRUKSI URUTAN BUILD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tolong ikuti urutan ini:
1. Tampilkan implementation plan lengkap — TUNGGU approval saya dulu
2. Setup project: next.js, tailwind, prisma, wagmi, shadcn/ui
3. Buat globals.css dengan semua CSS variables dan efek dasar (scanline, custom cursor)
4. Buat komponen layout: LoadingScreen → Navbar → Footer
5. Buat komponen UI: GlitchText, TypeWriter, TerminalCard, NeonBadge
6. Buat sections homepage satu per satu (mulai dari Hero dengan Three.js)
7. Buat halaman Projects dan Project Detail
8. Buat halaman About
9. Integrasikan Web3 (wagmi config, RainbowKit, WalletButton)
10. Buat NFTGallery dan VerifyButton
11. Buat API routes (contact, projects, nft)
12. Smart contract PortfolioVerifier.sol
13. Testing dan final check
14. Berikan instruksi cara jalankan: npm install, setup .env.local, npm run dev

Semua kode harus TypeScript strict. Tambahkan komentar pada bagian Web3.
Pastikan semua komponen responsive (mobile-first).
Gunakan "use client" hanya pada komponen yang memang butuh interaktivitas browser.

Siap? Tampilkan implementation plan sekarang!
```

---

## ═══════════════════════════════════════════════
## TIPS PENGGUNAAN DI ANTIGRAVITY
## ═══════════════════════════════════════════════

**Persiapan sebelum paste:**
1. Buka https://antigravity.google — buat workspace baru
2. Upload foto profil kamu (maks 5 gambar per pesan) — Antigravity bisa pakai langsung
3. Pastikan kamu login dengan akun Google

**Saat Antigravity tampilkan Implementation Plan:**
- Baca baik-baik sebelum klik "Proceed"
- Jika ada yang ingin diubah, ketik komentar sebelum approve
- Kamu bisa minta revisi plan sebanyak yang kamu mau

**API Keys yang perlu kamu siapkan:**
- WalletConnect Project ID → https://cloud.walletconnect.com (gratis)
- Alchemy API Key → https://alchemy.com (gratis, untuk NFT fetch)
- Resend API Key → https://resend.com (gratis 3000 email/bulan)
- Supabase → https://supabase.com (gratis, untuk PostgreSQL)

**Setelah website jadi:**
- Jalankan: npm install → cp .env.local.example .env.local → isi API keys → npm run dev
- Deploy: vercel deploy (install Vercel CLI dulu: npm i -g vercel)

**Jika ada error:**
- Paste pesan error langsung ke Antigravity dan minta fix
- Untuk error wagmi/RainbowKit: pastikan provider sudah di-wrap di layout.tsx
- Untuk error Three.js: cek "use client" sudah ada di Hero.tsx
