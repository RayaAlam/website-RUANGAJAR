/* RUANGAJAR — penyimpanan data.
   Prinsip "satu sumber data": nilai hanya disimpan sekali di sini,
   lalu buku nilai, dasbor siswa, dan ringkasan orang tua membacanya dari tempat yang sama. */
(function () {
  'use strict';
  const RA = (window.RA = window.RA || {});
  const KEY = 'ruangajar:data:v1';
  const DAY = 864e5;

  function at(days, h = 9, m = 0) {
    const d = new Date(Date.now() + days * DAY);
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  }

  function seed() {
    const users = [
      { id: 'u-admin', name: 'Pak Joko Santoso', role: 'admin', note: 'Operator sekolah' },
      { id: 'u-laras', name: 'Bu Laras Wulandari', role: 'guru', note: 'Guru IPA' },
      { id: 'u-hendra', name: 'Pak Hendra Kusuma', role: 'guru', note: 'Guru kelas' },
      { id: 'u-dewi', name: 'Bu Dewi Anggraini', role: 'guru', note: 'Guru Biologi' },

      { id: 's-raka', name: 'Raka Pratama', role: 'siswa', classId: 'k-8b' },
      { id: 's-ayu', name: 'Ayu Lestari', role: 'siswa', classId: 'k-8b' },
      { id: 's-dimas', name: 'Dimas Saputra', role: 'siswa', classId: 'k-8b' },
      { id: 's-intan', name: 'Intan Permata', role: 'siswa', classId: 'k-8b' },
      { id: 's-fajar', name: 'Fajar Nugroho', role: 'siswa', classId: 'k-8b' },
      { id: 's-salsa', name: 'Salsabila Putri', role: 'siswa', classId: 'k-8b' },

      { id: 's-nadia', name: 'Nadia Rahmawati', role: 'siswa', classId: 'k-4a' },
      { id: 's-bintang', name: 'Bintang Aditya', role: 'siswa', classId: 'k-4a' },
      { id: 's-citra', name: 'Citra Maharani', role: 'siswa', classId: 'k-4a' },
      { id: 's-gilang', name: 'Gilang Ramadhan', role: 'siswa', classId: 'k-4a' },

      { id: 's-bima', name: 'Bima Wicaksono', role: 'siswa', classId: 'k-11' },
      { id: 's-kirana', name: 'Kirana Ayuningtyas', role: 'siswa', classId: 'k-11' },
      { id: 's-yoga', name: 'Yoga Prasetyo', role: 'siswa', classId: 'k-11' },
      { id: 's-laila', name: 'Laila Nurhaliza', role: 'siswa', classId: 'k-11' },

      { id: 'o-wati', name: 'Ibu Wati', role: 'ortu', childId: 's-raka' },
      { id: 'o-arif', name: 'Bapak Arif', role: 'ortu', childId: 's-nadia' }
    ];

    const classes = [
      { id: 'k-8b', name: 'Kelas 8B', level: 'SMP', subject: 'IPA', teacherId: 'u-laras' },
      { id: 'k-4a', name: 'Kelas 4A', level: 'SD', subject: 'IPAS', teacherId: 'u-hendra' },
      { id: 'k-11', name: 'Kelas XI-2', level: 'SMA', subject: 'Biologi', teacherId: 'u-dewi' }
    ];

    const materials = [
      {
        id: 'm-1', classId: 'k-8b', createdAt: at(-8, 7, 15),
        title: 'Mengenal Sistem Pernapasan Manusia',
        target: 'Kamu bisa menyebutkan urutan jalan udara dari hidung sampai paru-paru.',
        body: 'Setiap menit, kita bernapas sekitar 12 sampai 20 kali tanpa perlu memikirkannya. Tapi ke mana sebenarnya udara itu pergi?\n\nUdara masuk lewat hidung. Di dalam hidung ada rambut halus dan lendir yang menyaring debu. Setelah itu udara berjalan melewati:\n\n- Faring, yaitu tenggorokan bagian atas\n- Laring, tempat pita suara berada\n- Trakea atau batang tenggorok\n- Bronkus dan bronkiolus, cabang-cabang saluran udara\n- Alveolus, kantong udara kecil di dalam paru-paru\n\nDi alveolus inilah oksigen masuk ke darah, dan karbon dioksida keluar dari darah untuk dibuang saat kita mengembuskan napas.\n\nCoba sekarang: letakkan tanganmu di dada, lalu tarik napas dalam-dalam. Dadamu terasa mengembang, bukan? Itu karena otot diafragma bergerak turun sehingga rongga dada membesar.'
      },
      {
        id: 'm-2', classId: 'k-8b', createdAt: at(-2, 6, 40),
        title: 'Gangguan Pernapasan dan Cara Menjaganya',
        target: 'Kamu bisa menjelaskan dua gangguan pernapasan dan cara mencegahnya.',
        body: 'Paru-paru bekerja tanpa istirahat sejak kita lahir. Ada beberapa hal yang bisa mengganggu kerjanya.\n\n- Asma: saluran napas menyempit sehingga napas terasa berat dan berbunyi.\n- ISPA: infeksi saluran pernapasan, biasanya diawali batuk dan pilek.\n- Asap rokok: merusak rambut halus di saluran napas yang bertugas menyapu kotoran.\n\nKabar baiknya, menjaga paru-paru itu sederhana. Pakai masker saat udara berdebu, jauhi asap rokok, bergerak aktif setiap hari, dan beristirahat cukup.\n\nPertanyaan untuk dipikirkan sebelum kita bertemu: mengapa orang yang rajin berolahraga biasanya tidak mudah terengah-engah?'
      },
      {
        id: 'm-3', classId: 'k-4a', createdAt: at(-6, 7, 0),
        title: 'Bagian Tumbuhan dan Tugasnya',
        target: 'Kamu bisa menyebutkan empat bagian tumbuhan dan gunanya.',
        body: 'Tumbuhan juga punya bagian-bagian tubuh, seperti kita!\n\n- Akar: menyerap air dari dalam tanah. Seperti sedotan.\n- Batang: membuat tumbuhan bisa berdiri tegak.\n- Daun: tempat tumbuhan memasak makanannya dengan bantuan sinar matahari.\n- Bunga: tempat biji dan buah akan tumbuh.\n\nAyo lihat tanaman di sekitar rumah atau sekolahmu. Bisakah kamu menemukan keempat bagian itu?'
      },
      {
        id: 'm-4', classId: 'k-11', createdAt: at(-7, 7, 0),
        title: 'Sel: Satuan Terkecil Kehidupan',
        target: 'Kamu dapat membedakan organel sel hewan dan sel tumbuhan beserta fungsinya.',
        body: 'Semua makhluk hidup tersusun atas sel. Di dalam sel terdapat bagian-bagian kecil yang disebut organel, masing-masing dengan tugasnya sendiri.\n\n- Nukleus: pusat pengatur kegiatan sel dan tempat materi genetik.\n- Mitokondria: tempat respirasi sel yang menghasilkan energi.\n- Ribosom: tempat sintesis protein.\n- Kloroplas: tempat fotosintesis, hanya ada pada sel tumbuhan.\n- Dinding sel: pelindung kaku di luar membran, juga khas sel tumbuhan.\n\nSebelum pertemuan, bandingkan gambar sel hewan dan sel tumbuhan di buku paketmu, lalu catat tiga perbedaan yang paling jelas.'
      }
    ];

    const items = [
      {
        id: 't-1', classId: 'k-8b', kind: 'tugas', createdAt: at(-8, 7, 20), due: at(-3, 23, 59),
        title: 'Ceritakan napasmu saat berlari',
        target: 'Menjelaskan perubahan pernapasan saat tubuh bekerja keras.',
        instructions: 'Berlarilah kecil di tempat selama satu menit. Setelah itu, tuliskan apa yang kamu rasakan pada napas dan dadamu. Jelaskan mengapa hal itu terjadi dengan menggunakan kata diafragma dan alveolus.'
      },
      {
        id: 't-2', classId: 'k-8b', kind: 'tugas', createdAt: at(-2, 6, 45), due: at(4, 23, 59),
        title: 'Poster ajakan menjaga paru-paru',
        target: 'Menyampaikan cara menjaga kesehatan pernapasan kepada orang lain.',
        instructions: 'Buat poster sederhana di kertas atau aplikasi apa pun. Isinya ajakan untuk menjaga paru-paru. Foto atau simpan posternya, lalu unggah di sini beserta satu kalimat penjelasan.'
      },
      {
        id: 'q-1', classId: 'k-8b', kind: 'kuis', createdAt: at(-6, 8, 0), due: at(-1, 21, 0),
        title: 'Kuis organ pernapasan',
        questions: [
          { q: 'Udara pertama kali masuk ke tubuh melalui…', options: ['Hidung', 'Paru-paru', 'Bronkus', 'Alveolus'], answer: 0 },
          { q: 'Pertukaran oksigen dan karbon dioksida terjadi di…', options: ['Trakea', 'Alveolus', 'Laring', 'Faring'], answer: 1 },
          { q: 'Otot yang membantu kita menarik napas adalah…', options: ['Otot lengan', 'Diafragma', 'Otot betis', 'Otot leher'], answer: 1 },
          { q: 'Saat kita menarik napas, rongga dada menjadi…', options: ['Mengecil', 'Membesar', 'Tetap', 'Mengeras'], answer: 1 },
          { q: 'Gas sisa yang dibuang tubuh saat mengembuskan napas adalah…', options: ['Oksigen', 'Karbon dioksida', 'Hidrogen', 'Helium'], answer: 1 }
        ]
      },
      {
        id: 'q-2', classId: 'k-8b', kind: 'kuis', createdAt: at(-2, 6, 50), due: at(6, 21, 0),
        title: 'Kuis gangguan pernapasan',
        questions: [
          { q: 'Kebiasaan yang paling merusak paru-paru adalah…', options: ['Merokok', 'Berolahraga', 'Minum air putih', 'Tidur cukup'], answer: 0 },
          { q: 'Asma membuat saluran pernapasan menjadi…', options: ['Melebar', 'Menyempit', 'Lebih panjang', 'Lebih bersih'], answer: 1 },
          { q: 'Cara sederhana menjaga paru-paru tetap sehat adalah…', options: ['Menghirup asap kendaraan', 'Memakai masker saat udara kotor', 'Jarang bergerak', 'Tidur larut malam'], answer: 1 }
        ]
      },
      {
        id: 't-3', classId: 'k-4a', kind: 'tugas', createdAt: at(-9, 7, 0), due: at(-4, 20, 0),
        title: 'Ceritakan tumbuhan di rumahmu',
        target: 'Menyebutkan bagian tumbuhan yang ada di sekitar rumah.',
        instructions: 'Pilih satu tumbuhan di rumahmu. Tuliskan namanya dan sebutkan bagian-bagian yang bisa kamu lihat. Boleh dibantu Ayah, Ibu, atau kakak.'
      },
      {
        id: 't-4', classId: 'k-4a', kind: 'tugas', createdAt: at(-1, 7, 0), due: at(3, 20, 0),
        title: 'Amati daun di sekitarmu',
        target: 'Membandingkan bentuk daun.',
        instructions: 'Kumpulkan dua daun yang bentuknya berbeda. Gambar keduanya di buku, lalu tuliskan apa bedanya. Foto gambarmu dan kirim di sini.'
      },
      {
        id: 'q-3', classId: 'k-4a', kind: 'kuis', createdAt: at(-1, 7, 5), due: at(5, 20, 0),
        title: 'Kuis bagian tumbuhan',
        questions: [
          { q: 'Bagian tumbuhan yang menyerap air dari tanah adalah…', options: ['Akar', 'Daun', 'Bunga', 'Buah'], answer: 0 },
          { q: 'Daun memasak makanan dengan bantuan…', options: ['Bulan', 'Sinar matahari', 'Batu', 'Angin malam'], answer: 1 },
          { q: 'Bagian yang membuat tumbuhan berdiri tegak adalah…', options: ['Bunga', 'Biji', 'Batang', 'Daun'], answer: 2 }
        ]
      },
      {
        id: 't-5', classId: 'k-11', kind: 'tugas', createdAt: at(-10, 7, 0), due: at(-5, 23, 59),
        title: 'Ringkasan teori sel',
        target: 'Merangkum perkembangan teori sel dengan kalimat sendiri.',
        instructions: 'Tulis ringkasan paling banyak satu halaman tentang perkembangan teori sel. Sebutkan minimal tiga ilmuwan dan sumbangan pemikirannya.'
      },
      {
        id: 't-6', classId: 'k-11', kind: 'tugas', group: true, createdAt: at(-1, 7, 0), due: at(7, 23, 59),
        title: 'Model sel dari barang bekas',
        target: 'Memodelkan organel sel tumbuhan atau hewan beserta fungsinya.',
        instructions: 'Tugas kelompok (3–4 orang). Buat model tiga dimensi sel tumbuhan atau sel hewan dari barang bekas. Beri label setiap organel. Unggah foto model dan tuliskan pembagian peran anggota kelompok.'
      },
      {
        id: 'q-4', classId: 'k-11', kind: 'kuis', createdAt: at(-6, 8, 0), due: at(-2, 21, 0),
        title: 'Kuis organel sel',
        questions: [
          { q: 'Organel penghasil energi pada sel adalah…', options: ['Ribosom', 'Mitokondria', 'Vakuola', 'Dinding sel'], answer: 1 },
          { q: 'Organel yang hanya dimiliki sel tumbuhan adalah…', options: ['Kloroplas', 'Mitokondria', 'Ribosom', 'Nukleus'], answer: 0 },
          { q: 'Tempat berlangsungnya sintesis protein adalah…', options: ['Lisosom', 'Badan Golgi', 'Ribosom', 'Sentriol'], answer: 2 },
          { q: 'Pusat pengatur kegiatan sel adalah…', options: ['Nukleus', 'Membran sel', 'Sitoplasma', 'Vakuola'], answer: 0 }
        ]
      }
    ];

    const fb = (good, wrong, next) => ({ good, wrong, next });
    const submissions = [
      { id: 'sb-1', itemId: 't-1', studentId: 's-raka', submittedAt: at(-4, 19, 12), text: 'Setelah berlari napas saya jadi cepat dan dada naik turun. Ini karena tubuh butuh oksigen lebih banyak. Diafragma bergerak lebih cepat.', fileName: '', score: 82, gradedAt: at(-2, 13, 0),
        feedback: fb('Kamu sudah mengamati tubuhmu dengan jeli dan menghubungkannya dengan kebutuhan oksigen.', 'Kata alveolus belum kamu pakai. Padahal di situlah oksigen masuk ke darah.', 'Tambahkan satu kalimat tentang apa yang terjadi di alveolus saat napasmu cepat.') },
      { id: 'sb-2', itemId: 't-1', studentId: 's-ayu', submittedAt: at(-5, 16, 40), text: 'Napas saya menjadi cepat. Diafragma bekerja lebih keras supaya rongga dada membesar lebih sering, sehingga lebih banyak udara masuk ke alveolus dan oksigen cepat masuk ke darah.', fileName: '', score: 90, gradedAt: at(-2, 13, 5),
        feedback: fb('Penjelasanmu runtut: dari diafragma, rongga dada, sampai alveolus.', 'Belum ada, hanya kalimat terakhir agak panjang.', 'Coba jelaskan juga mengapa otot butuh oksigen lebih banyak saat berlari.') },
      { id: 'sb-3', itemId: 't-1', studentId: 's-dimas', submittedAt: at(-3, 22, 50), text: 'Capek dan ngos-ngosan karena paru-paru kerja keras.', fileName: '', score: 68, gradedAt: at(-2, 13, 10),
        feedback: fb('Kamu jujur menuliskan apa yang dirasakan. Itu awal pengamatan yang baik.', 'Penjelasannya masih terlalu singkat dan belum memakai kata diafragma dan alveolus.', 'Baca lagi bagian kedua materi, lalu tulis ulang dua sampai tiga kalimat. Ibu tunggu, ya.') },
      { id: 'sb-4', itemId: 't-1', studentId: 's-intan', submittedAt: at(-4, 20, 5), text: 'Saat berlari dada saya naik turun lebih cepat. Diafragma berkontraksi lebih sering sehingga udara lebih sering masuk ke alveolus.', fileName: 'catatan-intan.jpg', score: 88, gradedAt: at(-2, 13, 15),
        feedback: fb('Istilah diafragma dan alveolus sudah kamu pakai dengan tepat.', 'Belum dijelaskan apa yang terjadi pada karbon dioksida.', 'Lengkapi dengan satu kalimat tentang pembuangan karbon dioksida.') },
      { id: 'sb-5', itemId: 't-1', studentId: 's-fajar', submittedAt: at(-2, 21, 30), text: 'Napas jadi cepat. Diafragma naik turun cepat, alveolus dapat udara lebih banyak jadi oksigen di darah cukup untuk lari.', fileName: '', score: null, gradedAt: null, feedback: null },
      { id: 'sb-6', itemId: 't-2', studentId: 's-raka', submittedAt: at(0, 7, 10), text: 'Poster saya berjudul "Paru-paruku Bukan Asbak". Isinya ajakan menjauhi asap rokok.', fileName: 'poster-raka.png', score: null, gradedAt: null, feedback: null },
      { id: 'sb-7', itemId: 't-2', studentId: 's-ayu', submittedAt: at(-1, 18, 20), text: 'Poster tentang memakai masker saat udara berdebu dan olahraga pagi.', fileName: 'poster-ayu.jpg', score: null, gradedAt: null, feedback: null },

      { id: 'sb-8', itemId: 't-3', studentId: 's-nadia', submittedAt: at(-5, 17, 0), text: 'Di rumahku ada pohon mangga. Aku bisa lihat akar yang keluar sedikit, batang yang besar, dan daun yang banyak. Belum ada bunganya.', fileName: '', score: 88, gradedAt: at(-3, 12, 0),
        feedback: fb('Kamu teliti sekali, sampai melihat akar yang muncul di atas tanah!', 'Tidak ada yang salah. Hanya belum ditulis gunanya daun.', 'Coba tanyakan ke Ayah atau Ibu kapan pohon manggamu berbunga.') },
      { id: 'sb-9', itemId: 't-3', studentId: 's-bintang', submittedAt: at(-4, 19, 30), text: 'Tanaman cabai. Ada akar, batang, daun, bunga putih kecil, dan buah cabai.', fileName: 'cabai.jpg', score: 80, gradedAt: at(-3, 12, 5),
        feedback: fb('Kamu menemukan lima bagian tumbuhan. Hebat!', 'Nama bagiannya sudah benar, tapi belum ada gunanya.', 'Pilih satu bagian dan tulis gunanya, ya.') },
      { id: 'sb-10', itemId: 't-3', studentId: 's-citra', submittedAt: at(-6, 16, 0), text: 'Bunga mawar di pot. Akarnya menyerap air, batangnya berduri supaya tegak, daunnya membuat makanan, bunganya warna merah.', fileName: '', score: 92, gradedAt: at(-3, 12, 10),
        feedback: fb('Kamu menulis nama bagian sekaligus gunanya. Lengkap sekali!', 'Duri bukan membuat tegak, tapi untuk melindungi.', 'Cari tahu, kenapa bunga mawar punya duri?') },
      { id: 'sb-11', itemId: 't-3', studentId: 's-gilang', submittedAt: at(-3, 8, 0), text: 'Pohon pisang. Daunnya besar.', fileName: '', score: 65, gradedAt: at(-3, 12, 15),
        feedback: fb('Pohon pisang pilihan yang menarik, daunnya memang besar sekali.', 'Baru satu bagian yang ditulis.', 'Minta tolong Ayah atau Ibu menemanimu melihat pohon pisang lagi, lalu tulis bagian lainnya.') },

      { id: 'sb-12', itemId: 't-5', studentId: 's-bima', submittedAt: at(-6, 20, 0), text: 'Robert Hooke (1665) mengamati gabus dan menamai "cell". Schleiden dan Schwann menyatakan tumbuhan dan hewan tersusun atas sel. Virchow: setiap sel berasal dari sel sebelumnya.', fileName: 'ringkasan-bima.pdf', score: 85, gradedAt: at(-4, 14, 0),
        feedback: fb('Urutan tokohnya tepat dan ringkas.', 'Sumbangan Leeuwenhoek belum disebut.', 'Tambahkan peran mikroskop dalam perkembangan teori sel.') },
      { id: 'sb-13', itemId: 't-5', studentId: 's-kirana', submittedAt: at(-6, 21, 10), text: 'Ringkasan lengkap tentang Hooke, Leeuwenhoek, Schleiden, Schwann, dan Virchow beserta tahun penemuannya.', fileName: 'ringkasan-kirana.pdf', score: 92, gradedAt: at(-4, 14, 5),
        feedback: fb('Lengkap dan kronologis, dengan bahasamu sendiri.', 'Tahun penemuan Schwann tertulis 1893, seharusnya 1839.', 'Coba kaitkan teori sel dengan materi organel yang akan kita pelajari.') },
      { id: 'sb-14', itemId: 't-5', studentId: 's-yoga', submittedAt: at(-5, 23, 40), text: 'Teori sel ditemukan Robert Hooke. Sel adalah unit terkecil makhluk hidup.', fileName: '', score: 70, gradedAt: at(-4, 14, 10),
        feedback: fb('Definisi sel sudah tepat.', 'Baru satu ilmuwan yang dibahas, padahal diminta minimal tiga.', 'Baca kembali halaman 12–14 buku paket, lalu lengkapi dua ilmuwan lagi.') },
      { id: 'sb-15', itemId: 't-5', studentId: 's-laila', submittedAt: at(-6, 19, 0), text: 'Ringkasan tentang Hooke, Schleiden–Schwann, dan Virchow dengan bagan waktu.', fileName: 'bagan-laila.png', score: 88, gradedAt: at(-4, 14, 15),
        feedback: fb('Bagan waktumu memudahkan pembaca.', 'Penjelasan Virchow terlalu singkat.', 'Jelaskan arti "omnis cellula e cellula" dengan kalimatmu sendiri.') }
    ];

    const attempt = (id, quizId, studentId, answers, days) => {
      const quiz = items.find(i => i.id === quizId);
      const correct = answers.filter((a, i) => a === quiz.questions[i].answer).length;
      return { id, quizId, studentId, answers, score: Math.round((correct / quiz.questions.length) * 100), submittedAt: at(days, 19, 30) };
    };
    const attempts = [
      attempt('at-1', 'q-1', 's-raka', [0, 1, 1, 0, 1], -2),
      attempt('at-2', 'q-1', 's-ayu', [0, 1, 1, 1, 1], -3),
      attempt('at-3', 'q-1', 's-dimas', [0, 3, 1, 0, 1], -2),
      attempt('at-4', 'q-1', 's-intan', [0, 1, 1, 0, 1], -2),
      attempt('at-5', 'q-1', 's-fajar', [0, 1, 0, 0, 1], -1),
      attempt('at-6', 'q-1', 's-salsa', [0, 1, 1, 1, 1], -3),
      attempt('at-7', 'q-4', 's-bima', [1, 0, 2, 0], -3),
      attempt('at-8', 'q-4', 's-kirana', [1, 0, 1, 0], -3),
      attempt('at-9', 'q-4', 's-yoga', [0, 0, 2, 3], -2),
      attempt('at-10', 'q-4', 's-laila', [1, 0, 1, 0], -3)
    ];

    const reads = {
      'm-1': ['s-raka', 's-ayu', 's-intan', 's-salsa', 's-dimas'],
      'm-2': ['s-ayu', 's-raka'],
      'm-3': ['s-nadia', 's-citra', 's-bintang'],
      'm-4': ['s-bima', 's-kirana', 's-laila']
    };

    const notifications = [
      { id: 'n-1', userId: 's-raka', at: at(-2, 6, 45), read: false, text: 'Tugas baru dari Bu Laras: Poster ajakan menjaga paru-paru.', link: '#/tugas/t-2' },
      { id: 'n-2', userId: 's-raka', at: at(-2, 13, 0), read: false, text: 'Nilai "Ceritakan napasmu saat berlari" sudah keluar. Baca masukan dari Bu Laras.', link: '#/tugas/t-1' },
      { id: 'n-3', userId: 'u-laras', at: at(-2, 21, 30), read: false, text: 'Fajar Nugroho mengumpulkan "Ceritakan napasmu saat berlari" (lewat tenggat).', link: '#/menilai/t-1' },
      { id: 'n-4', userId: 'u-laras', at: at(0, 7, 10), read: false, text: 'Raka Pratama mengumpulkan "Poster ajakan menjaga paru-paru".', link: '#/menilai/t-2' },
      { id: 'n-5', userId: 'o-wati', at: at(-2, 13, 0), read: false, text: 'Raka mendapat nilai 82 untuk "Ceritakan napasmu saat berlari".', link: '#/beranda' },
      { id: 'n-6', userId: 's-nadia', at: at(-1, 7, 0), read: false, text: 'Ada tugas baru: Amati daun di sekitarmu.', link: '#/tugas/t-4' },
      { id: 'n-7', userId: 'o-arif', at: at(-3, 12, 0), read: false, text: 'Nadia mendapat nilai 88 untuk "Ceritakan tumbuhan di rumahmu".', link: '#/beranda' }
    ];

    return {
      version: 1,
      school: 'Sekolah Percontohan RUANGAJAR',
      users, classes, materials, items, submissions, attempts, reads, notifications,
      session: null,
      ui: { activeClass: {}, onlyPending: false }
    };
  }

  RA.store = {
    state: null,
    load() {
      let raw = null;
      try { raw = localStorage.getItem(KEY); } catch (e) { /* penyimpanan diblokir */ }
      try { this.state = raw ? JSON.parse(raw) : seed(); } catch (e) { this.state = seed(); }
      if (!raw) this.save();
    },
    save() {
      try { localStorage.setItem(KEY, JSON.stringify(this.state)); return true; }
      catch (e) { return false; }
    },
    reset() {
      const session = this.state && this.state.session;
      this.state = seed();
      this.state.session = session;
      this.save();
    }
  };

  /* ---------- Pertanyaan umum terhadap data ---------- */
  const S = () => RA.store.state;
  RA.q = {
    user: id => S().users.find(u => u.id === id),
    cls: id => S().classes.find(c => c.id === id),
    item: id => S().items.find(i => i.id === id),
    material: id => S().materials.find(m => m.id === id),
    studentsOf: classId => S().users.filter(u => u.role === 'siswa' && u.classId === classId).sort((a, b) => a.name.localeCompare(b.name)),
    classesOfTeacher: tid => S().classes.filter(c => c.teacherId === tid),
    parentsOf: sid => S().users.filter(u => u.role === 'ortu' && u.childId === sid),
    materialsOf: classId => S().materials.filter(m => m.classId === classId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    itemsOf: (classId, kind) => S().items.filter(i => i.classId === classId && (!kind || i.kind === kind)).sort((a, b) => a.due.localeCompare(b.due)),
    subsOf: itemId => S().submissions.filter(s => s.itemId === itemId),
    sub: (itemId, sid) => S().submissions.find(s => s.itemId === itemId && s.studentId === sid),
    attempt: (quizId, sid) => S().attempts.find(a => a.quizId === quizId && a.studentId === sid),
    attemptsOf: quizId => S().attempts.filter(a => a.quizId === quizId),
    isRead: (mid, sid) => (S().reads[mid] || []).includes(sid),

    /* Status satu siswa untuk satu tugas/kuis */
    status(item, sid) {
      const overdue = Date.now() > new Date(item.due).getTime();
      if (item.kind === 'kuis') {
        const a = RA.q.attempt(item.id, sid);
        if (a) return { done: true, graded: true, score: a.score, at: a.submittedAt, late: a.submittedAt > item.due, record: a };
        return { done: false, overdue };
      }
      const s = RA.q.sub(item.id, sid);
      if (s) return { done: true, graded: s.score != null, score: s.score, at: s.submittedAt, late: s.submittedAt > item.due, record: s };
      return { done: false, overdue };
    },
    scoresOf(sid) {
      const u = RA.q.user(sid);
      return RA.q.itemsOf(u.classId).map(i => ({ item: i, st: RA.q.status(i, sid) })).filter(x => x.st.graded);
    },
    average(sid) {
      const sc = RA.q.scoresOf(sid);
      if (!sc.length) return null;
      return Math.round(sc.reduce((t, x) => t + x.st.score, 0) / sc.length);
    },
    missing(sid) {
      const u = RA.q.user(sid);
      return RA.q.itemsOf(u.classId).filter(i => { const s = RA.q.status(i, sid); return !s.done && s.overdue; });
    },
    classAverage(classId) {
      const avgs = RA.q.studentsOf(classId).map(s => RA.q.average(s.id)).filter(v => v != null);
      if (!avgs.length) return null;
      return Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length);
    },
    /* Persentase benar per soal pada satu kuis */
    questionStats(quiz) {
      const at = RA.q.attemptsOf(quiz.id);
      return quiz.questions.map((q, i) => {
        const right = at.filter(a => a.answers[i] === q.answer).length;
        const picks = q.options.map((_, oi) => at.filter(a => a.answers[i] === oi).length);
        return { index: i, q, right, total: at.length, pct: at.length ? Math.round((right / at.length) * 100) : null, picks };
      });
    }
  };
})();
