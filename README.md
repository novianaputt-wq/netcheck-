\# NetCheck



\### Network Troubleshooting \& Connectivity Toolkit



NetCheck adalah toolkit sederhana untuk membantu melakukan pengecekan konektivitas jaringan melalui satu dashboard.



Project ini dibuat sebagai project mandiri untuk mempelajari penerapan konsep jaringan, client-server, troubleshooting, serta penggunaan Node.js dan TypeScript dalam membuat tools jaringan.



\---



\## 📌 Tentang Project



Saat melakukan troubleshooting jaringan, beberapa pengecekan biasanya dilakukan secara terpisah menggunakan command seperti `ping`, pengecekan port, DNS lookup, atau membuka website secara langsung.



NetCheck menggabungkan beberapa pengecekan tersebut ke dalam satu dashboard sehingga hasil pengecekan dapat dilihat dengan lebih mudah.



Pengecekan yang tersedia:



\- Ping / host reachability

\- Port connectivity

\- DNS resolution

\- HTTP/HTTPS response

\- Overall network status



Project ini berjalan secara lokal dan backend melakukan pengecekan jaringan dari komputer/server tempat NetCheck dijalankan.



\---



\## 🎯 Tujuan



NetCheck dibuat untuk:



\- Memahami konsep dasar troubleshooting jaringan

\- Memahami komunikasi antara frontend dan backend

\- Menerapkan pengecekan konektivitas menggunakan Node.js

\- Menggunakan TypeScript untuk pengembangan backend dan frontend

\- Menggabungkan beberapa network check dalam satu aplikasi

\- Membuat tools sederhana yang dapat digunakan saat troubleshooting



\---



\## ⚙️ Fitur



\### 1. Ping Check



Melakukan pengecekan apakah target dapat dijangkau melalui jaringan.



Contoh:



```text

google.com → ONLINE

2\. Port Check



Mengecek apakah port tertentu dapat diakses pada target.



Contoh:



Target : google.com

Port   : 443

Status : OPEN

3\. DNS Check



Melakukan DNS resolution untuk mengetahui alamat IP yang terkait dengan sebuah domain.



Contoh:



google.com

&#x20;   ↓

DNS RESOLVED

&#x20;   ↓

IP Address

4\. HTTP Check



Mengecek apakah sebuah alamat HTTP/HTTPS dapat memberikan response.



Informasi yang ditampilkan:



HTTP status code

Response time

Reachability



Contoh:



Status Code   : 301

Response Time : 157 ms

Status        : ONLINE

5\. Overall Network Check



NetCheck menjalankan beberapa pengecekan sekaligus:



Ping

&#x20; +

Port

&#x20; +

DNS

&#x20; +

HTTP

&#x20; ↓

Overall Status



Jika pengecekan utama berhasil:



HEALTHY



Jika terdapat pengecekan yang bermasalah:



CHECK\_REQUIRED

🏗️ Arsitektur

┌──────────────────────────┐

│      Web Browser         │

│    React Dashboard       │

└────────────┬─────────────┘

&#x20;            │

&#x20;            │ HTTP Request

&#x20;            ▼

┌──────────────────────────┐

│      Express API         │

│      Node.js Backend     │

└────────────┬─────────────┘

&#x20;            │

&#x20;      ┌─────┼─────┬─────┐

&#x20;      ▼     ▼     ▼     ▼

&#x20;    Ping   Port   DNS   HTTP

&#x20;      │     │     │     │

&#x20;      └─────┴─────┴─────┘

&#x20;            │

&#x20;            ▼

&#x20;      Network Result

&#x20;            │

&#x20;            ▼

┌──────────────────────────┐

│     React Dashboard      │

│   Diagnostic Results     │

└──────────────────────────┘

🛠️ Tech Stack

Frontend

React

TypeScript

Vite

CSS

Backend

Node.js

Express

TypeScript

Network

ICMP Ping

TCP Port Connection

DNS Resolution

HTTP/HTTPS Request

Development Tools

Git

GitHub

Visual Studio Code

📁 Struktur Project

netcheck/

│

├── frontend/

│   ├── src/

│   │   ├── App.tsx

│   │   ├── App.css

│   │   ├── index.css

│   │   └── main.tsx

│   │

│   ├── public/

│   ├── package.json

│   └── vite.config.ts

│

├── src/

│   ├── services/

│   │   ├── pingService.ts

│   │   ├── portService.ts

│   │   ├── dnsService.ts

│   │   └── httpService.ts

│   │

│   └── server.ts

│

├── .gitignore

├── package.json

├── package-lock.json

└── tsconfig.json

🚀 Cara Menjalankan

1\. Clone Repository

git clone <repository-url>

cd netcheck

2\. Install Backend



Di folder utama project:



npm install



Jika menggunakan PowerShell pada Windows:



npm.cmd install

3\. Jalankan Backend

npm run dev



Backend akan berjalan pada:



http://localhost:3000

4\. Jalankan Frontend



Buka terminal baru:



cd netcheck/frontend

npm install

npm run dev



Frontend akan berjalan pada:



http://localhost:5173

🔌 API Endpoint

Home

GET /

Ping

GET /api/ping?target=google.com



Contoh response:



{

&#x20; "target": "google.com",

&#x20; "reachable": true,

&#x20; "status": "ONLINE"

}

Port

GET /api/port?target=google.com\&port=443



Contoh response:



{

&#x20; "target": "google.com",

&#x20; "port": 443,

&#x20; "open": true,

&#x20; "status": "OPEN"

}

DNS

GET /api/dns?target=google.com



Contoh response:



{

&#x20; "target": "google.com",

&#x20; "resolved": true,

&#x20; "addresses": \[],

&#x20; "status": "RESOLVED"

}

HTTP

GET /api/http?target=https://google.com



Contoh response:



{

&#x20; "target": "https://google.com",

&#x20; "statusCode": 301,

&#x20; "responseTime": 157,

&#x20; "reachable": true,

&#x20; "status": "ONLINE"

}

Overall Check

GET /api/check?target=google.com\&port=443



Endpoint ini menjalankan:



Ping

Port

DNS

HTTP



Kemudian menghasilkan:



HEALTHY



atau:



CHECK\_REQUIRED

🖥️ Contoh Penggunaan



Misalnya ingin mengecek:



Target : google.com

Port   : 443



NetCheck akan menjalankan:



\[✓] Ping     → ONLINE

\[✓] Port     → OPEN

\[✓] DNS      → RESOLVED

\[✓] HTTP     → ONLINE



Kemudian dashboard menampilkan:



NETWORK HEALTHY

🌐 Konsep Jaringan yang Digunakan



Project ini menerapkan beberapa konsep dasar jaringan:



IP Address

Domain Name

DNS

ICMP

TCP

Port

HTTP

HTTPS

Client-Server

Network Connectivity



Backend melakukan pengecekan jaringan dari komputer/server tempat NetCheck dijalankan.



🔐 Catatan Keamanan



NetCheck dibuat untuk penggunaan lokal dan troubleshooting pada target yang memang diperbolehkan untuk diperiksa.



Tool ini bukan vulnerability scanner atau penetration testing framework.



Gunakan pengecekan jaringan hanya pada sistem yang dimiliki atau sistem yang memiliki izin untuk diuji.



📚 Pembelajaran



Beberapa hal yang dipelajari dari project ini:



Membuat REST API dengan Express

Menggunakan TypeScript pada Node.js

Menggunakan module dns

Menggunakan module net

Melakukan HTTP/HTTPS request

Menghubungkan React dengan Express

Menggunakan Vite

Menggunakan Git dan GitHub

Menerapkan konsep troubleshooting jaringan

🔄 Pengembangan Selanjutnya



Beberapa fitur yang dapat dikembangkan:



Traceroute

Network information

Check history

Penyimpanan hasil menggunakan SQLite

Export hasil troubleshooting

Informasi diagnostic yang lebih detail

👩‍💻 Project



NetCheck



Network Troubleshooting \& Connectivity Toolkit



Project mandiri untuk pembelajaran jaringan komputer, server, troubleshooting, dan pengembangan aplikasi menggunakan Node.js dan React.

