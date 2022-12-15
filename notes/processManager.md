Process Manager
Saat ini web server kita sudah bisa diakses secara publik melalui internet. Untuk memastikan web server berfungsi dengan baik, silakan hubungkan aplikasi client dengan URL web server terbaru kita.

202103081533250c9c09f60cb438053d53d8c166b9d521.gif

Silakan coba-coba fungsionalitas dari aplikasi tersebut. Pastikan semua berjalan dengan normal.

Selama web server sedang digunakan, pastikan juga proses node pada EC2 selalu tetap berjalan yah.

202106041407188fee4785d083ab7fb4d5da5a5abd882c.png

BIla proses node tersebut terhenti, itu bisa dikarenakan Anda tak sengaja menghentikannya atau session SSH berakhir, maka web server pun akan terhenti. Bila web server terhenti, maka otomatis aplikasi client tidak dapat digunakan.

20210604141018968543a627a7f156bc3c8d3894d6697a.png

Bayangkan bila ini terjadi pada implementasi di dunia nyata? Tentu akan merepotkan bisnis Anda. Karena agar server dapat berjalan kembali kita perlu masuk ke SSH dan menjalankan kembali perintah npm run start-prod. Sungguh tahapan yang tidak praktis. Kita tidak ingin menghabiskan waktu dan tenaga untuk melakukan hal itu berulang kali.

Bila Anda tidak bersedia untuk menjaga server tetap hidup, berarti sebagai gantinya kita harus mencari seseorang yang mau melakukannya. Tapi pertanyaannya, siapa yang mau? Ada kok, terlebih lagi ia mau bekerja tanpa bayaran. Perkenalkan, Process Manager.

Process Manager dapat menangani permasalahan di atas. Dengan menggunakan Process Manager, Anda tidak perlu khawatir bila aplikasi Node.js terhenti disebabkan oleh crash, ia akan menjalankan ulang prosesnya secara otomatis hampir tanpa downtime. Selain itu, Process Manager dapat membantu menyeimbangkan muatan proses pada CPU yang tersedia di server, hal ini biasa disebut sebagai load balancing. Dengan begitu, aplikasi server dapat diakses secara lebih cepat dibandingkan dijalankan menggunakan node process secara langsung.



Memasang Node.js Process Manager pada EC2 instance
PM2 merupakan salah satu Node.js Process Manager yang populer digunakan. Kita akan menggunakan pm2 ini untuk memantau web server yang ada di EC2 instance.

Silakan akses kembali EC2 instance melalui SSH. Kemudian pasang pm2 dengan perintah npm install -g pm2.

20210308153629e38ccd25abc2cafbbe1b1c02aa35834d.png

Setelah proses install selesai, masuk ke directory notes-app-back-end dengan perintah cd notes-app-back-end. Jalankan node process menggunakan pm2 dengan perintah:

pm2 start npm --name "notes-api" -- run "start-prod" 
20210308153704f18b4357c14b4823e0167739c6c66f29.png

Pm2 berhasil menjalankan web server dan ia akan memantau prosesnya. Bila proses itu terhenti entah karena terjadi crash atau apa pun, ia akan secara otomatis menjalankan ulang proses. Dengan begitu, Anda tidak perlu khawatir server Anda mengalami downtime lagi.

Di pm2, kita dapat me-restart proses secara manual dengan cara:

pm2 restart notes-api
Atau, menghentikan prosesnya dengan cara:

pm2 stop notes-api
Untuk menjalankan kembali proses, gunakan perintah:

pm2 start notes-api