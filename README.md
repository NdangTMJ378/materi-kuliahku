# MateriKuliahku — Website Akademik Sains Data

Website ini dibuat dengan:
- HTML
- CSS
- JavaScript vanilla
- LocalStorage untuk catatan/nilai
- IndexedDB untuk file PDF

## Fitur
1. Dashboard semester 1–8.
2. Daftar mata kuliah berdasarkan LKAM.
3. Input nilai:
   - Diskusi 1–3
   - Tugas 1–2
   - Presentasi
   - UAS
4. Total nilai otomatis = jumlah Diskusi + Tugas + Presentasi + UAS.
5. Catatan dan konsep per mata kuliah.
6. Progress belajar per mata kuliah.
7. Upload PDF per mata kuliah.
8. PDF dapat dibuka kembali dari browser.
9. Data lokal sehingga versi ini tidak membutuhkan database/server.

## Cara menjalankan di VS Code

### Cara paling sederhana
1. Ekstrak folder `materi-kuliahku`.
2. Buka folder tersebut di VS Code.
3. Buka `index.html`.
4. Klik kanan -> Open with Live Server.

Jika belum ada Live Server:
- Buka Extensions.
- Cari `Live Server`.
- Install.
- Klik kanan `index.html` -> Open with Live Server.

### Struktur
materi-kuliahku/
├── index.html
├── style.css
├── script.js
└── README.md

## Cara menggunakan

### 1. Mata kuliah
Buka menu `Mata Kuliah`, pilih semester, lalu klik `Buka`.

### 2. Konsep
Di detail mata kuliah:
- tulis judul konsep
- tulis penjelasan sederhana
- isi progress belajar
- klik `Tambah Konsep`

Contoh:
Judul: Residual
Isi: Selisih antara nilai aktual dengan nilai prediksi model.

### 3. Nilai
Buka `Nilai Akademik`.
Isi nilai Diskusi, Tugas, Presentasi, dan UAS.
Total akan dihitung otomatis.

Catatan:
Versi ini sengaja menghitung TOTAL MENTAH sebagai penjumlahan komponen.
Jika kampus menggunakan bobot, misalnya Diskusi 20%, Tugas 30%, UAS 50%, rumus perlu diubah menjadi sistem berbobot.

### 4. PDF
Buka `File PDF`.
Pilih mata kuliah dan PDF.
Klik `Simpan PDF`.

PDF tersimpan pada IndexedDB browser. Jadi:
- tidak perlu upload ke server
- file hanya tersedia pada browser/perangkat yang digunakan
- menghapus data browser dapat menghapus file lokal

## Pengembangan tahap berikutnya
Jika ingin versi lebih serius:
1. Backend Node.js/Express
2. Database PostgreSQL/MySQL
3. Login pengguna
4. Cloud storage untuk PDF
5. Dashboard IPK/SKS
6. Export Excel/PDF
7. Pencatatan nilai berbobot sesuai aturan kampus
8. Pencarian konsep lintas mata kuliah
9. Backup/restore data
10. Deployment ke Vercel/Netlify + backend

## Sumber struktur mata kuliah
Daftar mata kuliah pada project disusun dari LKAM yang diupload pengguna.
