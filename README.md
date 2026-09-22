# 🚀 Muhammad Rafli Pradipta — Personal Portfolio & CMS

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 12" />
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP 8.2+" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License MIT" />
</p>

<p align="center">
  Sebuah website portofolio interaktif modern, berkinerja tinggi, dan terintegrasi dengan <b>Content Management System (CMS)</b> mandiri untuk mengelola profil, proyek analisis data, sertifikasi, pengalaman, dan keahlian teknis.
</p>

---

## 📌 Tentang Portofolio

Website ini dibangun untuk mempresentasikan portofolio profesional **Muhammad Rafli Pradipta** lulusan **Pendidikan Teknologi Informasi** (Universitas Brawijaya, IPK 3.75/4.00). 

Portofolio ini menggabungkan arsitektur monolitik modern berbasis **Laravel 12** dan **Inertia.js React**, menghadirkan pengalaman Single Page Application (SPA) yang cepat, mulus, dan responsif tanpa kompleksitas API terpisah.

---

## ✨ Fitur Unggulan

- 🎨 **Modern & Aesthetic UI**: Desain bertema gelap (*Dark Mode*) & terang (*Light Mode*) dengan estetika monokrom modern dan aksen neon aurora.
- ⚡ **Zero-Lag Micro-Interactions**: Animasi interaktif teks, badge, dan kartu yang dioptimalkan dengan akselerasi GPU (60–120 FPS tanpa layout reflow).
- 👤 **Interactive Profile Avatar**: Foto profil dilengkapi *ambient glow*, *stationary gradient ring*, *smooth micro-zoom*, *glass shimmer sweep*, dan indikator status *active pulse*.
- 🛠️ **Full-Featured Admin Dashboard (CMS)**:
  - **Projects Management**: Tambah, edit, dan hapus studi kasus data analytics, upload media thumbnail & galeri multi-foto.
  - **Skills & Tech Stack**: Kustomisasi level keahlian (Python, SQL, Tableau, BigQuery, dll.) serta ikon kustom.
  - **Certifications & Education**: Manajemen rekam jejak akademik, akreditasi, dan bukti sertifikat digital.
  - **Experience**: Timeline pengalaman profesional, asisten pengajar, dan instruktur IT.
  - **Site Configuration**: Pengaturan avatar (zoom, pan, kecerahan), bio, kontak WhatsApp, LinkedIn, email, dan link Canva.
- 📱 **100% Responsif**: Tata letak adaptif sempurna di layar perangkat smartphone, tablet, maupun desktop.

---

## 🛠️ Tech Stack & Ekosistem

| Lapisan | Teknologi | Deskripsi |
|---|---|---|
| **Backend** | [Laravel 12](https://laravel.com/) | PHP Framework untuk routing, autentikasi, ORM Eloquent, dan arsitektur MVC |
| **Frontend** | [React 19](https://react.dev/) + [Inertia.js](https://inertiajs.com/) | UI library reaktif berbasis komponen tanpa memerlukan REST API decoupling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework untuk custom themes & responsivitas presisi |
| **Icons** | [Lucide React](https://lucide.dev/) | Kumpulan ikon SVG modern dan konsisten |
| **Database** | MySQL / MariaDB | Penyimpanan relasional terstruktur untuk data proyek, skill, dan konfigurasi |
| **Bundler** | [Vite 7](https://vitejs.dev/) | Tooling frontend instan untuk HMR (*Hot Module Replacement*) dan build optimasi |

---

## 💻 Panduan Instalasi Lokal (*Local Development*)

Jika Anda ingin menjalankan atau mengembangkan website ini di komputer lokal:

### 1. Prasyarat
Pastikan sistem Anda sudah terpasang:
- PHP >= 8.2
- Composer
- Node.js (>= 20.x) & npm
- MySQL Server

### 2. Clone Repository
```bash
git clone https://github.com/Diptaaaa/Portfolio-Website.git
cd Portfolio-Website
```

### 3. Install Dependensi PHP & JavaScript
```bash
composer install
npm install
```

### 4. Konfigurasi Lingkungan (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Buka file `.env` dan sesuaikan konfigurasi database Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=porto
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Generate Application Key & Symlink Storage
```bash
php artisan key:generate
php artisan storage:link
```

### 6. Jalankan Migrasi Database & Seeder
```bash
php artisan migrate --seed
```

### 7. Jalankan Server Pengembangan
Jalankan dev server frontend dan backend:
```bash
# Terminal 1: Backend Laravel
php artisan serve

# Terminal 2: Frontend Vite
npm run dev
```

Buka peramban di `http://localhost:8000` untuk melihat hasilnya.

---

## 📁 Struktur Direktori Utama

```text
├── app/
│   ├── Http/Controllers/    # Controller publik & Admin CMS
│   └── Models/              # Model Eloquent (Project, Skill, Education, etc.)
├── database/
│   ├── migrations/          # Skema database relasional
│   └── seeders/             # Data awal / dummy portfolio
├── public/
│   ├── build/               # Aset produksi hasil build Vite
│   └── images/              # Logo, sertifikat, dan aset gambar publik
├── resources/
│   ├── css/app.css          # Styling kustom, animasi GPU & tema
│   └── js/
│       ├── Components/      # Komponen reaktif (Navbar, MediaGallery, dsb.)
│       ├── Layouts/         # Layout utama Portfolio & Admin
│       └── Pages/           # Halaman Inertia (Home, Projects, Skills, Admin CMS)
└── routes/
    ├── web.php              # Route portfolio publik & dashboard
    └── auth.php             # Route autentikasi admin
```

---

## 📬 Kontak & Tautan Profesional

- **Nama**: Muhammad Rafli Pradipta
- **LinkedIn**: [linkedin.com/in/muhammad-rafli-pradipta](https://linkedin.com/in/muhammad-rafli-pradipta)
- **Canva Portfolio**: [portoraflipradipta.my.canva.site](https://portoraflipradipta.my.canva.site/)
- **GitHub**: [github.com/Diptaaaa](https://github.com/Diptaaaa)

---

<p align="center">
  Dibuat dengan ❤️ dan dedikasi oleh <b>Muhammad Rafli Pradipta</b>
</p>
