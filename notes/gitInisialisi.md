Menginisialisasi Local Repository pada Proyek Web Server
Setelah memasang git pada komputer, mari kita inisialisasikan local repository pada proyek web server.

Silakan buka kembali proyek notes-app-back-end dengan VSCode. Buka Terminal pada proyeknya, lalu tuliskan perintah berikut:

git init
20210308144709b4fdff8ad92052d3c3854f343ec47937.png

Sekarang, setiap perubahan pada berkas yang ada akan dipantau oleh git. Tapi sebenarnya, tidak semua berkas yang ada di dalam proyek harus dipantau oleh git. Contohnya berkas node_modules dan notes-api-webserver.pem.

Berkas yang ada di dalam node_modules tidak perlu dipantau perubahannya karena berkas tersebut memiliki ukuran yang sangat besar. Selain itu berkas node_modules bisa kita peroleh kembali dengan cara menjalankan perintah npm install pada Terminal proyek. Jadi kita tidak membutuhkan node_modules pada repository.

Kemudian untuk notes-api-webserver.pem, berkas ini tentu tidak boleh disimpan di internet nantinya. Ia harus tetap berada di lokal komputer kita karena ini menjadi kunci untuk mengakses EC2 instance melalui SSH. Bila berkas ini terpublikasi, kemungkinan orang di luar sana dapat mengakses EC2 instance secara ilegal.

Agar git tidak memproses kedua berkas tersebut, buatlah berkas konfigurasi git dengan nama .gitignore.



Di dalamnya tuliskan kode berikut:

.gitignore
node_modules
notes-api-webserver.pem 
Simpan berkas .gitignore dan lihat sekarang berkas node_modules dan notes-api-webserver.pem berubah menjadi abu-abu di VSCode.

202103081449032add1ad41f0c30c5575223c4d432c1e7.png

Ini tandanya, perubahan pada berkas tersebut tidak akan dipantau lagi oleh git.

Selanjutnya, tuliskan perintah berikut di Terminal proyek:

git add .
git commit -m "initial commit"
Berikut fungsi dari kedua perintah tersebut:

git add . digunakan untuk memasukan semua berkas ke index (stagging area), terkecuali berkas node_modules dan notes-api-webserver.pem.
git commit -m “initial commit” digunakan untuk menyimpan perubahan pada local repository. Setiap perubahan pada sistem git dapat ditelusuri berdasarkan commit history.
Done! Local repository Anda sudah siap. Sekarang kita bisa unggah repository ini ke GitHub.