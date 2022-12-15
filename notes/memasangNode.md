Memasang Node.js dan Menjalankan Web Server di EC2 Instance
Karena untuk menjalankan web server yang kita buat membutuhkan Node.js, tentu kita perlu memasang Node.js pada EC2 instance juga. Jadi ayo kita melangkah!

Sebelum Anda mulai memasang Node.js, pastikan versi yang digunakan Node.js di komputer Anda sama dengan Node.js yang akan dipasang di EC2 instance. Ini berguna untuk mencegah terjadinya bugs yang ditimbulkan oleh perbedaan versi Node.js, apalagi bila perbedaan versi tersebut cukup jauh. Untuk itu, kita cek dulu yuk versi Node.js apa yang digunakan pada komputer kita.

Silakan buka Terminal/CMD/PowerShell baru pada komputer Anda, lalu jalankan perintah node -v.

2021030815173288eb5be4b6c0cff8fde764a6740afd85.png

Oke, catat yah versi yang muncul. Pastikan kita menggunakan versi yang sama untuk dipasang di EC2 instance.

Agar mudah mengatur versi Node.js yang digunakan pada EC2 instance, kita akan menggunakan tools yang bernama nvm. Melalui nvm ini, kita bisa dengan mudah mengubah versi Node.js yang ingin digunakan. Tools ini sangat membantu proses upgrade atau downgrade Node.js secara mudah.

Untuk memasang nvm pada Ubuntu, silakan eksekusi perintah berikut:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
Tunggu hingga proses unduh dan instalasi selesai.

2021030815181087c4963d6ae4adfabcadf1179ee57fe3.png

Penting: Agar nvm dapat digunakan, silakan keluar dulu dari SSH dengan perintah exit. Kemudian akses kembali EC2 instance.

Selanjutnya pasang Node.js versi yang sesuai dengan komputer Anda dengan perintah:

nvm install <versi nodejs>
Contoh, bila ingin memasang versi v14.15.4, maka tuliskan:

nvm install v14.15.4
202103081519315c21f0098b76427eb3af40da511c2cd6.png

Good job! Pastikan Node.js berhasil terpasang dengan mengeksekusi perintah node -v.

20210308152009e47d9fd77836184949066c7884bec22c.png

Well done! Node.js berhasil terpasang. Kini Anda bisa menjalankan web server. Pastikan Anda berada di dalam folder notes-app-back-end. Jika belum, silakan masuk ke foldernya dengan perintah:

cd notes-app-back-end
Lalu, pasang seluruh module/package dependencies yang digunakan pada proyek kita dengan mengeksekusi perintah npm install.

202103081520587bf655359bfbabe291e1795f1100b495.png

Lanjut, jalankan proyek dengan perintah npm run start.

202103081521313f51b4d164b7ec80632d380d84a31731.png

Wah tampaknya server sudah berjalan nih. Coba kita cek melalui browser. Silakan kunjungi alamat ip http://172.31.26.251:5000 yang merupakan IP server EC2 instance (lihat alamat IP pada Terminal). Apakah ada respons dari server?

20210308152158c373d8464cfd539a920512334c983c96.pngWaduh, ternyata server pada EC2 instance masih belum bisa diakses oleh public. Kira-kira apa yah penyebabnya? Kita cari tahu pada materi selanjutnya.