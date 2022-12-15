Same-Origin Policy

Server dapat menampung sebuah website, aplikasi, gambar, video, dan masih banyak lagi. Ketika server menampung website, mungkin beberapa data gambar, video, stylesheet biasanya diambil dari alamat server lain atau origin yang berbeda. Contohnya stylesheet yang diambil dari Bootstrap CDN ataupun gambar yang diperoleh dari server Unsplash. Hal ini wajar dan biasa dilakukan.

Namun apakah Anda tahu bahwa tidak semua data bisa diambil dari origin yang berbeda? Contohnya data JSON yang didapatkan melalui teknik XMLHTTPRequest atau fetch. Jika website meminta sesuatu menggunakan teknik tersebut dari luar origin-nya, maka permintaan tersebut akan ditolak. Itu disebabkan oleh kebijakan same-origin. Kasus ini terjadi pada aplikasi client dan web server yang kita buat.

Origin terdiri dari tiga hal: protokol, host, dan port number. Origin dari aplikasi client kita adalah

http://notesapp-v1.dicodingacademy.com

Di mana protokolnya adalah http://, host-nya adalah notesapp-v1.dicodingacademy.com, dan port-nya adalah :80 (implisit).

Selama aplikasi client mengakses data dari origin yang sama, hal itu dapat dilakukan. Namun bila ada salah satu saja yang berbeda contohnya port 8001, maka permintaan itu akan ditolak.

Dengan begitu jelas yah, apa penyebab gagalnya aplikasi client ketika melakukan permintaan ke web server yang kita buat. Sudah jelas keduanya memiliki origin yang berbeda. Origin web server kita saat ini adalah http://localhost:5000/

Lalu, apa solusi agar keduanya dapat berinteraksi? Tenang, untungnya ada mekanisme yang dapat membuat mereka saling berinteraksi. Mekanisme tersebut disebut Cross-origin resource sharing (CORS). Pertanyaannya, bagaimana cara menerapkannya?

Cukup mudah! Pada web server, kita hanya perlu memberikan nilai header ‘Access-Control-Allow-Origin’ dengan nilai origin luar yang akan mengkonsumsi datanya (aplikasi client).

const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
 
response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
 
return response;
Atau Anda bisa menggunakan tanda * pada nilai origin untuk memperbolehkan data dikonsumsi oleh seluruh origin.

const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
 
response.header('Access-Control-Allow-Origin', '*');
 
return response;
Cukup mudah kan?

Good news! Penerapannya akan jauh lebih mudah bila Anda menggunakan Hapi. Dengan Hapi, CORS dapat ditetapkan pada spesifik route dengan menambahkan properti options.cors di konfigurasi route. Contohnya seperti ini:

{
  method: 'POST',
  path: '/notes',
  handler: addNoteHandler,
  options: {
    cors: {
      origin: ['*'],
    },
  },
},
Bila ingin cakupannya lebih luas alias CORS diaktifkan di seluruh route yang ada di server, Anda bisa tetapkan CORS pada konfigurasi ketika hendak membuat server dengan menambahkan properti routes.cors. Contohnya seperti ini:

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});
Sudah cukup jelas? Kalo begitu, ayo kita terapkan CORS pada web server kita.



Menerapkan CORS pada Web Server
Di modul ini, kita akan terapkan CORS pada cakupan server agar tak perlu lagi repot-repot mendefinisikan CORS pada setiap route yang ada.

Silakan buka berkas server.js, lalu tambahkan CORS pada konfigurasi pembuatan server seperti yang sudah Anda pelajari.

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});
Simpan perubahan berkas server.js, pastikan server masih berjalan, dan silakan coba masukan kembali catatan menggunakan aplikasi client. Percayalah, sekarang harusnya bisa berjalan dengan baik.

Jika setelah memasukan catatan Anda dikembalikan ke halaman utama tanpa peringatan apa pun, itu artinya Anda berhasil menambahkan catatan. Selamat yah!

Tapi sayang sekali, walaupun berhasil tersimpan, catatan tersebut masih belum dapat kita lihat. Agar catatan dapat kita lihat, ayo kita selesaikan kriteria kedua!