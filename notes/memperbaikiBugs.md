Memperbaiki Bugs

Kita kira server sudah dapat dijalankan dengan baik oleh nodemon pada EC2 instance. Tapi nyatanya masih belum bisa diakses secara publik. Lantas bagaimana solusinya?

Setelah ditelaah lebih dalam, ternyata IP yang kita kunjungi tadi bukanlah IP publik dari EC2 instance yang dapat diakses secara umum. Lalu bagaimana cara mengetahui IP publik dari EC2 instance yang kita buat? Mudah! Silakan kunjungi kembali halaman daftar EC2 instance pada AWS Management Console, lalu pilih EC2 instance yang Anda buat.

2021030815261985a3cb31656b8997cd2880bf1473dcb9.png

Pada instance summary, kita bisa lihat public IPv4 address. Apakah dengan IP tersebut kita bisa mengakses web server? Kita coba saja kunjungi alamat public dari IPv4 address Anda, dan pastikan pada SSH nodemon sedang berjalan mengeksekusi web server yah.

20210308152641687dc7e2fadfee0a583cb34faad63b82.png

Argh! Ternyata masih belum bisa diakses. Bagaimana ini? Apalagi yang salah?

Well. Ternyata kita tidak bisa menggunakan host dengan nilai localhost untuk menjalankan Hapi server pada EC2 instance. Kita perlu menjelaskan secara eksplisit private IP yang digunakan oleh instance, di mana IP tersebut pada summary instance dijelaskan bernilai 172.31.36.19.

20210416170040d0165e0f920578ce24b8833942176fbb.png

Tetapi menetapkan nilai host dengan alamat IP yang eksplisit seperti itu bukanlah hal yang baik. Kenapa? Karena ketahuilah nilai IP (baik public atau private) dapat berubah. Perubahan bisa terjadi karena pindah server atau me-restart server. Kita tidak dapat menjamin kapan perubahan tersebut bisa terjadi. Apakah Anda mau setiap kali IP berubah, kode Anda juga harus diubah? Repot sekali bukan. Lalu bagaimana solusinya?

Solusinya adalah gunakan IP beralamat 0.0.0.0. Alamat tersebut merupakan alamat spesial yang digunakan agar komputer dapat diakses melalui seluruh alamat IP yang digunakan pada komputer tersebut. Misalnya begini, bila komputer Anda tersambung ke jaringan Wi-Fi dengan IP 192.168.100.25 dan LAN dengan IP 172.31.90.21, maka 0.0.0.0 dapat diakses melalui kedua alamat IP tersebut. Sudah paham?

Dengan begitu di production kita dapat menggunakan alamat spesial ini untuk menghindari masalah perubahan IP. Karena bila alamat IP berubah, maka nilai 0.0.0.0 tetap aman untuk digunakan.

Oh ya! Bila kita mengubah nilai localhost menjadi 0.0.0.0, bagaimana nasib ketika proses development kita menginginkan ia hanya dapat dijalankan di localhost? Apakah kita ubah saja nilai ip-nya secara manual pada EC2 instance tanpa melalui remote repository? Ah, itu bukan praktik yang baik.

Lalu, adakah cara yang dapat membedakan penggunaan nilai ketika proses development dan production di EC2 instance? Jawabannya ada! Masih ingatkan dengan global objek process.env? Di sana kita dapat meletakan suatu nilai ketika proses node dijalankan. Yuk langsung saja perbaiki proyek web server kita.

Kembali ke VSCode dan buka berkas server.js.

202103081528223dace66415539df23c83dab05b3e9191.png

Ubah nilai properti host menjadi seperti ini: 

 const server = Hapi.server({
  port: 5000,
  host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});
Dengan begitu, properti host akan bernilai sesuai dengan environment yang ditetapkan.

Selanjutnya kita tetapkan environment pada npm runner script. Buka berkas package.json, dan atur npm runner script menjadi seperti ini:

"scripts": {
  "start-prod": "NODE_ENV=production node ./src/server.js",
  "start-dev": "nodemon ./src/server.js",
  "lint": "eslint ./src"
},
Kita tidak perlu menetapkan NODE_ENV pada start-dev karena nodemon secara default menggunakan nilai "development" pada NODE_ENV. Lalu, pada proses production kita tidak menggunakan nodemon (karena kita tidak perlu lagi merestart server tiap ada perubahan), jadi cukup gunakan node saja.

Simpan seluruh perubahan, kemudian commit seluruh perubahan yang ada dengan perintah:

git add .
git commit -m "fix bugs host value"
Kemudian push perubahannya pada remote repository dengan perintah:

git push origin master 
2021030815301875fbcab35c7ce6eadfe2b6de11648d7c.png

Selanjutnya, akses kembali EC2 instance melalui SSH dan masuk ke folder notes-app-back-end.

20210308153040662f76f2df3892bb07336dac32f1791e.png

Update proyek web server dengan perubahan yang sudah dilakukan sebelumnya dengan menggunakan perintah:

git pull origin master
20210308153104f91fea4b116084ef2b964d9ffebc2a09.png

Coba jalankan kembali servernya, namun kali ini menggunakan proses production. Eksekusi perintah npm run start-prod.

2021060413553796b437efbc0705c08cf2aa53fe981797.png

Silakan akses server melalui browser dengan menggunakan alamat IP publik beserta port 5000.

2021030815314011ae5148ee04c02afff06c7ece40d14b.png

Voila! Akhirnya kita bisa melihat pesan not found yang dihasilkan oleh Hapi. Ini artinya server kita sudah berhasil berjalan di EC2 dan dapat diakses oleh publik. Selamat yah!