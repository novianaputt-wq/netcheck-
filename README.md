# NetCheck

### Network Troubleshooting & Connectivity Toolkit

> A lightweight network diagnostic tool for checking connectivity, ports, DNS, and HTTP/HTTPS from a single dashboard.

NetCheck adalah toolkit sederhana untuk membantu proses troubleshooting jaringan melalui satu dashboard.

Project ini dibuat sebagai **project mandiri** untuk mempelajari penerapan konsep jaringan, client-server, troubleshooting, serta penggunaan **Node.js dan TypeScript** dalam membangun tools jaringan.

---

## 📌 Tentang Project

Saat melakukan troubleshooting jaringan, beberapa pengecekan biasanya dilakukan secara terpisah menggunakan command seperti `ping`, pengecekan port, DNS lookup, atau membuka website secara langsung.

NetCheck menggabungkan beberapa pengecekan tersebut ke dalam satu dashboard sehingga hasil diagnosis dapat dilihat dengan lebih mudah.

### Pengecekan yang tersedia

- 🌐 Ping / Host Reachability
- 🔌 TCP Port Connectivity
- 🔎 DNS Resolution
- 🌍 HTTP/HTTPS Response
- 📊 Overall Network Status

Project ini berjalan secara lokal. Backend melakukan pengecekan jaringan dari komputer atau server tempat NetCheck dijalankan.

---

## 🎯 Tujuan

NetCheck dibuat untuk:

- Memahami konsep dasar troubleshooting jaringan
- Memahami komunikasi antara frontend dan backend
- Menerapkan pengecekan konektivitas menggunakan Node.js
- Menggunakan TypeScript untuk pengembangan aplikasi
- Menggabungkan beberapa network check dalam satu tools
- Membuat tools sederhana yang dapat membantu proses troubleshooting

---

## ⚙️ Fitur

### 01 — Ping Check

Mengecek apakah sebuah host dapat dijangkau melalui jaringan.

**Contoh:**

    google.com → ONLINE

---

### 02 — Port Check

Mengecek apakah port TCP tertentu dapat diakses pada target.

**Contoh:**

    Target : google.com
    Port   : 443
    Status : OPEN

---

### 03 — DNS Check

Melakukan DNS resolution untuk mengetahui alamat IP yang terkait dengan sebuah domain.

**Contoh:**

    google.com
        ↓
    DNS RESOLVED
        ↓
    IP Address

---

### 04 — HTTP Check

Mengecek apakah sebuah alamat HTTP/HTTPS dapat memberikan response.

Informasi yang ditampilkan:

- HTTP status code
- Response time
- Reachability

**Contoh:**

    Status Code   : 301
    Response Time : 157 ms
    Status        : ONLINE

---

### 05 — Overall Network Check

NetCheck dapat menjalankan beberapa pengecekan secara bersamaan.

    Ping
      │
    Port
      │
    DNS
      │
    HTTP
      │
      ▼
    Overall Status

Jika pengecekan utama berhasil:

    ✓ HEALTHY

Jika terdapat pengecekan yang bermasalah:

    ⚠ CHECK_REQUIRED

---

## 🏗️ Arsitektur

    ┌──────────────────────────┐
    │       Web Browser        │
    │      React Dashboard     │
    └────────────┬─────────────┘
                 │
                 │ HTTP Request
                 ▼
    ┌──────────────────────────┐
    │       Express API        │
    │      Node.js Backend     │
    └────────────┬─────────────┘
                 │
           ┌─────┼─────┬─────┐
           ▼     ▼     ▼     ▼
         Ping   Port   DNS   HTTP
           │     │     │     │
           └─────┴─────┴─────┘
                 │
                 ▼
          Network Result
                 │
                 ▼
    ┌──────────────────────────┐
    │      React Dashboard     │
    │    Diagnostic Results    │
    └──────────────────────────┘

### Alur Sederhana

    User
      ↓
    Input Target & Port
      ↓
    React Frontend
      ↓
    Express API
      ↓
    Network Checks
      ├── Ping
      ├── Port
      ├── DNS
      └── HTTP
      ↓
    Diagnostic Result
      ↓
    Dashboard

---

## 🛠️ Tech Stack

### Frontend

| Technology | Usage |
|------------|-------|
| React | User Interface |
| TypeScript | Type-safe development |
| Vite | Frontend development server |
| CSS | Dashboard styling |

### Backend

| Technology | Usage |
|------------|-------|
| Node.js | Backend runtime |
| Express | REST API |
| TypeScript | Backend development |

### Network

| Technology | Usage |
|------------|-------|
| ICMP Ping | Host reachability |
| TCP | Port connectivity |
| DNS | Domain resolution |
| HTTP/HTTPS | Web response checking |

### Development Tools

- Git
- GitHub
- Visual Studio Code

---

## 📁 Struktur Project

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

---

## 🚀 Cara Menjalankan

### 1. Clone Repository

    git clone <repository-url>
    cd netcheck

### 2. Install Backend

Jalankan dari folder utama project:

    npm install

Jika menggunakan PowerShell pada Windows:

    npm.cmd install

### 3. Jalankan Backend

    npm run dev

Jika menggunakan PowerShell:

    npm.cmd run dev

Backend akan berjalan pada:

`http://localhost:3000`

### 4. Jalankan Frontend

Buka terminal baru:

    cd netcheck/frontend
    npm install
    npm run dev

Jika menggunakan PowerShell:

    npm.cmd install
    npm.cmd run dev

Frontend akan berjalan pada:

`http://localhost:5173`

---

## 🔌 API Endpoint

NetCheck menyediakan beberapa endpoint untuk melakukan pengecekan jaringan.

### 🏠 Home

`GET /`

Digunakan untuk mengecek apakah backend sedang berjalan.

---

### 🌐 Ping

`GET /api/ping?target=google.com`

**Contoh response:**

    {
      "target": "google.com",
      "reachable": true,
      "status": "ONLINE"
    }

---

### 🔌 Port

`GET /api/port?target=google.com&port=443`

**Contoh response:**

    {
      "target": "google.com",
      "port": 443,
      "open": true,
      "status": "OPEN"
    }

---

### 🔎 DNS

`GET /api/dns?target=google.com`

**Contoh response:**

    {
      "target": "google.com",
      "resolved": true,
      "addresses": [
        "142.250.x.x"
      ],
      "status": "RESOLVED"
    }

> Alamat IP pada hasil sebenarnya dapat berbeda tergantung DNS resolver dan waktu pengecekan.

---

### 🌍 HTTP

`GET /api/http?target=https://google.com`

**Contoh response:**

    {
      "target": "https://google.com",
      "statusCode": 301,
      "responseTime": 157,
      "reachable": true,
      "status": "ONLINE"
    }

---

### 📊 Overall Check

`GET /api/check?target=google.com&port=443`

Endpoint ini menjalankan beberapa pengecekan sekaligus:

    Ping
      +
    Port
      +
    DNS
      +
    HTTP
      ↓
    Overall Status

Hasil akhir dapat berupa:

    HEALTHY

atau:

    CHECK_REQUIRED

---

## 🖥️ Contoh Penggunaan

Misalnya ingin mengecek:

    Target : google.com
    Port   : 443

NetCheck akan menjalankan beberapa pengecekan:

    [✓] Ping     → ONLINE
    [✓] Port     → OPEN
    [✓] DNS      → RESOLVED
    [✓] HTTP     → ONLINE

Kemudian dashboard menampilkan:

    ┌──────────────────────────┐
    │     NETWORK HEALTHY      │
    │                          │
    │      google.com:443      │
    └──────────────────────────┘

---

## 🌐 Konsep Jaringan yang Digunakan

Project ini menerapkan beberapa konsep dasar jaringan:

- IP Address
- Domain Name
- DNS
- ICMP
- TCP
- Port
- HTTP
- HTTPS
- Client-Server
- Network Connectivity
- Network Troubleshooting

Backend melakukan pengecekan jaringan dari komputer atau server tempat NetCheck dijalankan.

---

## 🔐 Catatan Keamanan

NetCheck dibuat untuk penggunaan lokal dan troubleshooting pada target yang memang diperbolehkan untuk diperiksa.

Tool ini **bukan vulnerability scanner** atau **penetration testing framework**.

Gunakan pengecekan jaringan hanya pada sistem yang dimiliki atau sistem yang memiliki izin untuk diuji.

---

## 📚 Pembelajaran

Melalui project ini, beberapa hal yang dipelajari antara lain:

- Membuat REST API menggunakan Express
- Menggunakan TypeScript pada Node.js
- Menggunakan module `dns`
- Menggunakan module `net`
- Melakukan HTTP/HTTPS request
- Menghubungkan React dengan Express
- Menggunakan Vite
- Menggunakan Git dan GitHub
- Menerapkan konsep client-server
- Menerapkan konsep troubleshooting jaringan

---

## 🔄 Pengembangan Selanjutnya

Beberapa fitur yang dapat dikembangkan pada versi berikutnya:

- [ ] Traceroute
- [ ] Network information
- [ ] Check history
- [ ] Penyimpanan hasil menggunakan SQLite
- [ ] Export hasil troubleshooting
- [ ] Diagnostic information yang lebih detail
- [ ] Network latency information

---

## 📌 Project Status

**Current Version:** `v1.0`

NetCheck saat ini sudah dapat melakukan:

- ✓ Ping Check
- ✓ Port Check
- ✓ DNS Check
- ✓ HTTP/HTTPS Check
- ✓ Overall Network Check
- ✓ Web Dashboard
- ✓ REST API

---

## 👩‍💻 Project

### NetCheck

**Network Troubleshooting & Connectivity Toolkit**

Project mandiri untuk pembelajaran:

    Networking
         +
    Client-Server
         +
    Troubleshooting
         +
    Node.js
         +
    TypeScript
         +
    React

---
