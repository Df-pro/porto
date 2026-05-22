━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PRD PHASE 2: ADMIN DASHBOARD & WALLET AUTHENTICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1. TUJUAN UTAMA
Mengamankan endpoint API dan rute frontend khusus Admin, serta membuat antarmuka Dashboard bagi pemilik portfolio (Dwi Ferdianto) untuk mengelola konten web (Projects, Messages) secara dinamis, menggunakan wallet kripto sebagai "kunci akses" (tanpa email/password tradisional).

## 2. PENAMBAHAN TECH STACK
- `siwe` (Sign-In with Ethereum) — untuk memvalidasi kepemilikan wallet secara kriptografis.
- `iron-session` — untuk mengelola sesi HTTP-Only cookie yang aman di Next.js (App Router).
- `lucide-react` — untuk icon di Dashboard Admin.
- `swr` atau `@tanstack/react-query` — untuk client-side data fetching di Dashboard.

## 3. STRATEGI KEAMANAN (DEFENSE IN DEPTH)
Sistem harus dikunci dalam 3 lapisan:
1. **Frontend (UI Layer)**: Link menuju `/admin` di Navbar hanya muncul jika dompet yang terkoneksi di wagmi/RainbowKit cocok dengan `process.env.NEXT_PUBLIC_OWNER_WALLET`.
2. **Server (API & Middleware)**: Rute `/admin` dan seluruh metode mutasi (POST, PUT, DELETE) di rute `/api/projects` dan `/api/messages` harus diblokir oleh `middleware.ts` jika tidak ada cookie sesi SIWE yang valid.
3. **Blockchain (Smart Contract Layer)**: Sudah diimplementasikan via modifier `onlyOwner` pada fungsi `verifyProject()`.

## 4. ALUR AUTENTIKASI (SIWE FLOW)
1. Admin mengunjungi halaman `/admin/login` (atau klik tombol rahasia di Navbar).
2. Sistem mengecek apakah wallet terkoneksi. Jika ya, tombol "Sign In as Admin" muncul.
3. Klik tombol memanggil API `/api/auth/nonce` untuk mendapatkan string unik.
4. MetaMask memunculkan pop-up minta tanda tangan (sign message).
5. Hasil tanda tangan dikirim ke `/api/auth/verify`.
6. Server memverifikasi signature menggunakan library `siwe`. Jika alamat cocok dengan `OWNER_WALLET`, server menerbitkan cookie sesi via `iron-session`.
7. Admin di-redirect ke `/admin/dashboard`.

## 5. FITUR ADMIN DASHBOARD (/admin/dashboard)
Sidebar Menu:
- **Overview**: Statistik singkat (Total Projects, Unread Messages, Connection Status).
- **Projects**: Tabel daftar proyek (dari Prisma PostgreSQL). Terdapat tombol "Add New", "Edit", dan "Delete".
- **Messages**: Tabel/List pesan dari Contact Form. Bisa di-mark as read atau dihapus.
- **Blockchain**: Antarmuka khusus untuk memanggil fungsi `verifyProject()` pada Smart Contract secara manual dari data proyek yang belum berstatus "On-Chain".

## 6. PENAMBAHAN STRUKTUR FOLDER & FILE
Buat atau modifikasi file berikut:

/
├── middleware.ts                   (Melindungi rute /admin/* dan API)
├── app/
│   ├── admin/
│   │   ├── layout.tsx              (Sidebar admin, cek session klien)
│   │   ├── login/page.tsx          (Halaman SIWE login)
│   │   └── dashboard/
│   │       ├── page.tsx            (Overview)
│   │       ├── projects/page.tsx   (CRUD Projects UI)
│   │       └── messages/page.tsx   (Messages UI)
│   ├── api/
│   │   ├── auth/
│   │   │   ├── nonce/route.ts      (Generate nonce)
│   │   │   ├── verify/route.ts     (Verify SIWE signature & set cookie)
│   │   │   └── logout/route.ts     (Destroy cookie)
│   │   ├── projects/[id]/route.ts  (PUT/DELETE project individual)
│   │   └── messages/route.ts       (GET/PUT read status)
├── lib/
│   └── session.ts                  (Konfigurasi iron-session)
└── components/
    └── admin/
        └── AdminLoginForm.tsx

## 7. UPDATE SKEMA PRISMA
Pastikan skema `ContactMessage` sudah siap dan bisa diambil (di-query). Tambahkan status arsip jika perlu.

## 8. INSTRUKSI IMPLEMENTASI UNTUK ANTIGRAVITY
1. Berikan Implementation Plan untuk fitur Admin & SIWE ini.
2. Buatkan setup `iron-session` dan API routes untuk autentikasi (nonce, verify, logout).
3. Buatkan `middleware.ts` untuk memblokir akses ke rute `/admin` dan POST/PUT/DELETE `/api/projects`.
4. Buatkan antarmuka `AdminLoginForm` lengkap dengan integrasi wagmi `signMessage`.
5. Buatkan antarmuka Dashboard dasar (Sidebar + Overview).
6. Integrasikan logika form CRUD ke Prisma PostgreSQL.

Pastikan gaya desain Dashboard Admin tetap menggunakan tema "DARK CYBERPUNK TERMINAL" seperti website utamanya, namun lebih terstruktur seperti command center (tabel matriks, garis neon tipis, font monospace).