Response Toolkit
Fungsi handler pada Hapi memiliki dua parameters, yakni request dan h.

Sebagaimana yang sudah banyak kita bahas sebelumnya, request parameter merupakan objek yang menampung detail dari permintaan client, seperti path dan query parameters, payload, headers, dan sebagainya. Ada baiknya Anda eksplorasi secara lebih dalam apa fungsi dari parameter request pada referensi API Hapi.

Parameter yang kedua yaitu h (huruf inisial Hapi). Parameter ini merupakan response toolkit di mana ia adalah objek yang menampung banyak sekali method yang digunakan untuk menanggapi sebuah permintaan client. Objek ini serupa dengan objek response pada request handler ketika kita menggunakan Node.js native.

Seperti yang sudah Anda lihat pada contoh dan latihan sebelumnya, jika hanya ingin mengembalikan nilai pada sebuah permintaan yang datang, di Hapi Anda bisa secara langsung mengembalikan nilai dalam bentuk teks, teks HTML, JSON, steam, atau bahkan promise. 

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return `Homepage`;
    },
});

Jika kita dapat mengembalikan permintaan secara singkat, lalu apa fungsi dari h? Kapan kita membutuhkannya? 

Bila kasusnya sederhana seperti di atas, memang lebih baik Anda langsung kembalikan dengan nilai secara eksplisit. Namun, ketahuilah bahwa dengan cara tersebut status response selalu bernilai 200 OK. Ketika Anda butuh mengubah nilai status response, di situlah Anda membutuhkan parameter h.

server.route({
    method: 'POST',
    path: '/user',
    handler: (request, h) => {
        return h.response('created').code(201);
    },
});

Fungsi handler harus selalu mengembalikan sebuah nilai, bila Anda menggunakan h ketika menangani permintaan, maka kembalikanlah dengan nilai h.response(). Anda bisa lihat contoh kode di atas.

Parameter h tidak hanya berfungsi untuk menetapkan status kode respons. Melalui h, Anda juga bisa menetapkan header response, content type, content length, dan masih banyak lagi. 

// Detailed notation
const handler = (request, h) => {
    const response = h.response('success');
    response.type('text/plain');
    response.header('X-Custom', 'some-value');
    return response;
};
 
// Chained notation
const handler = (request, h) => {
    return h.response('success')
        .type('text/plain')
        .header('X-Custom', 'some-value');
};
Untuk mendalami mengenai respons toolkit, sangat direkomendasikan untuk eksplorasi lebih detail pada halaman dokumentasi yang diberikan oleh Hapi langsung.