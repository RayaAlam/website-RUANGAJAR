/* RUANGAJAR — logika aplikasi (tanpa pustaka luar). */
(function () {
  'use strict';

  const RA = window.RA;
  const q = RA.q;
  const st = () => RA.store.state;
  const save = () => RA.store.save();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = p => p + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const DAY = 864e5;

  /* ---------- Ikon (garis sederhana) ---------- */
  const P = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h4.5v-5h4v5h4.5V10"/>',
    book: '<path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z"/><path d="M12 6.5V19"/>',
    clip: '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="M9 11h6M9 15h4"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    table: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15"/>',
    chart: '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c1.8.8 3 2.6 3 6"/>',
    school: '<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5"/>',
    out: '<path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
    help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.4"/><path d="M12 16.8v.2"/>',
    down: '<path d="M12 4v11M7 10.5l5 5 5-5"/><path d="M4.5 19.5h15"/>',
    up: '<path d="M12 16V5M7 9.5l5-5 5 5"/><path d="M4.5 19.5h15"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    check: '<path d="M5 12.5 10 17 19 7"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    file: '<path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4"/>',
    wifi: '<path d="M3 3l18 18"/><path d="M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 4-2.3M19 12.5a10 10 0 0 0-3.2-2M2 8.5a15 15 0 0 1 4.5-2.7M22 8.5A15 15 0 0 0 11 4.5"/><path d="M12 20h.01"/>',
    cycle: '<path d="M20 11a8 8 0 0 0-14.3-4.3L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M4 13a8 8 0 0 0 14.3 4.3L20 15.5"/><path d="M20 20v-4.5h-4.5"/>',
    bellring: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/><path d="M3 7.5a9 9 0 0 1 2.5-3.5M21 7.5A9 9 0 0 0 18.5 4"/>',
    trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>'
  };
  const ic = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;

  /* ---------- Bantuan tampilan ---------- */
  const AV = ['#3d5a80', '#8a5a44', '#4c7a5f', '#7a4f7f', '#9a6b1f', '#2f6f7a', '#a04a3a', '#566078'];
  function avatar(u, size = '') {
    if (!u) return '';
    let h = 0; for (const ch of u.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const parts = u.name.replace(/^(Bu|Pak|Ibu|Bapak)\s+/i, '').split(' ');
    const ini = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    return `<span class="avatar ${size}" style="--av:${AV[h % AV.length]}" aria-hidden="true">${esc(ini)}</span>`;
  }
  /* Revisi 1: nama tetap aman walau akun guru sudah dihapus pengelola */
  const firstName = u => (u ? u.name.replace(/^(Bu|Pak|Ibu|Bapak)\s+/i, '').split(' ')[0] : 'guru');
  const shortName = u => { if (!u) return 'guru'; const m = u.name.match(/^(Bu|Pak|Ibu|Bapak)\s+(\S+)/i); return m ? `${m[1]} ${m[2]}` : u.name.split(' ')[0]; };

  const fmtDate = iso => new Date(iso).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtShort = iso => new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  const fmtTime = iso => new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const fmtFull = iso => `${fmtDate(iso)}, pukul ${fmtTime(iso)}`;
  function dayDiff(iso) {
    const a = new Date(); a.setHours(0, 0, 0, 0);
    const b = new Date(iso); b.setHours(0, 0, 0, 0);
    return Math.round((b - a) / DAY);
  }
  function relDue(iso) {
    const d = dayDiff(iso);
    const past = Date.now() > new Date(iso).getTime();
    if (past) return d === 0 ? 'tenggat baru saja lewat' : `lewat ${-d} hari`;
    if (d === 0) return `hari ini, pukul ${fmtTime(iso)}`;
    if (d === 1) return `besok, pukul ${fmtTime(iso)}`;
    return `${d} hari lagi`;
  }
  function ago(iso) {
    const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 1) return 'baru saja';
    if (m < 60) return `${m} menit lalu`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h} jam lalu`;
    const d = Math.round(h / 24);
    return d === 1 ? 'kemarin' : `${d} hari lalu`;
  }
  function greeting() {
    const h = new Date().getHours();
    if (h < 11) return 'Selamat pagi';
    if (h < 15) return 'Selamat siang';
    if (h < 18) return 'Selamat sore';
    return 'Selamat malam';
  }
  const scoreClass = s => (s >= 85 ? 'hi' : s < 70 ? 'lo' : 'mid');
  const levelOf = me => (me.role === 'siswa' ? (q.cls(me.classId) || {}).level : null);
  const isSD = me => levelOf(me) === 'SD';

  /* Label umpan balik tiga bagian (Lipnevich & Panadero, 2021) */
  function fbLabels(level) {
    return level === 'SD'
      ? { good: 'Yang sudah hebat', wrong: 'Yang perlu diperbaiki', next: 'Coba lakukan ini' }
      : { good: 'Yang sudah baik', wrong: 'Yang masih keliru', next: 'Langkah berikutnya' };
  }

  function richText(body) {
    return String(body || '').split(/\n{2,}/).map(block => {
      const lines = block.split('\n');
      if (lines.every(l => l.trim().startsWith('- '))) {
        return '<ul>' + lines.map(l => `<li>${esc(l.trim().slice(2))}</li>`).join('') + '</ul>';
      }
      return `<p>${esc(block).replace(/\n/g, '<br>')}</p>`;
    }).join('');
  }

  function statusPill(item, s, sd) {
    if (item.kind === 'kuis') {
      if (s.done) return `<span class="pill ok">${sd ? 'Selesai' : 'Selesai'} · ${s.score}</span>`;
      return s.overdue ? `<span class="pill bad">${sd ? 'Belum dikerjakan' : 'Belum dikerjakan'}</span>` : `<span class="pill warn">Belum dikerjakan</span>`;
    }
    if (s.graded) return `<span class="pill ok">Sudah dinilai · ${s.score}</span>`;
    if (s.done) return `<span class="pill info">${s.late ? 'Terkirim (terlambat)' : 'Terkirim'} · menunggu nilai</span>`;
    return s.overdue ? `<span class="pill bad">Belum dikumpulkan</span>` : `<span class="pill warn">Belum dikumpulkan</span>`;
  }

  /* ---------- Notifikasi ---------- */
  function notify(userIds, text, link) {
    const now = new Date().toISOString();
    [].concat(userIds).filter(Boolean).forEach(id => {
      st().notifications.unshift({ id: uid('n'), userId: id, at: now, read: false, text, link: link || '#/beranda' });
    });
  }
  const myNotifs = me => st().notifications.filter(n => n.userId === me.id).sort((a, b) => b.at.localeCompare(a.at));

  /* ---------- Toast & modal ---------- */
  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = ic('check') + `<span>${msg}</span>`;
    $('#toast-root').appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }
  let modalCleanup = null;
  function openModal(html, opts = {}) {
    closeModal();
    const root = $('#modal-root');
    root.innerHTML = `<div class="modal-back" data-action="close-modal-back"><div class="modal ${opts.wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title">${html}</div></div>`;
    const first = root.querySelector('input, textarea, select, button:not([data-action="close-modal"])');
    if (first && !opts.noFocus) first.focus();
  }
  function closeModal() {
    $('#modal-root').innerHTML = '';
    if (modalCleanup) { modalCleanup(); modalCleanup = null; }
  }
  const modalHead = (title, sub) => `
    <div class="modal-head">
      <div><h2 id="modal-title">${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>
      <button class="icon-btn" data-action="close-modal" aria-label="Tutup">${ic('x')}</button>
    </div>`;

  /* Konfirmasi buatan sendiri (tanpa confirm() bawaan peramban) */
  let pendingConfirm = null;
  function askConfirm(title, text, yesLabel, fn, danger) {
    pendingConfirm = fn;
    openModal(`${modalHead(title)}<div class="modal-body stack"><p>${text}</p>
      <div class="form-actions"><button class="btn btn-ghost" data-action="close-modal">Batal</button>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-action="confirm-yes">${yesLabel}</button></div></div>`);
  }

  function download(filename, content, type = 'text/plain;charset=utf-8') {
    const blob = content instanceof Blob ? content : new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  const csvCell = v => /[",\n;]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* ---------- Rute ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const [page, id] = h.split('/');
    return { page: page || 'beranda', id: id || null };
  }
  const go = hash => { if (location.hash === hash) render(); else location.hash = hash; };
  const me = () => (st().session ? q.user(st().session) : null);

  /* =========================================================
     Navigasi per peran
     ========================================================= */
  function navFor(u) {
    if (u.role === 'guru') {
      const c = teacherClass(u);
      const pending = c ? q.itemsOf(c.id, 'tugas').reduce((n, i) => n + q.subsOf(i.id).filter(s => s.score == null).length, 0) : 0;
      return [
        ['beranda', 'Beranda', 'home'],
        ['materi', 'Materi', 'book'],
        ['tugas', 'Tugas & Kuis', 'clip'],
        ['menilai', 'Menilai', 'pen', pending],
        ['nilai', 'Buku Nilai', 'table'],
        ['laporan', 'Laporan Kelas', 'chart']
      ];
    }
    if (u.role === 'siswa') {
      const todo = q.itemsOf(u.classId).filter(i => !q.status(i, u.id).done).length;
      if (isSD(u)) return [['beranda', 'Rumahku', 'home'], ['materi', 'Bacaanku', 'book'], ['tugas', 'Tugasku', 'clip', q.itemsOf(u.classId, 'tugas').filter(i => !q.status(i, u.id).done).length], ['kuis', 'Kuisku', 'bulb'], ['nilai', 'Nilaiku', 'star']];
      return [['beranda', 'Beranda', 'home'], ['materi', 'Materi', 'book'], ['tugas', 'Tugas', 'clip', todo ? q.itemsOf(u.classId, 'tugas').filter(i => !q.status(i, u.id).done).length : 0], ['kuis', 'Kuis', 'bulb'], ['nilai', 'Nilai & Masukan', 'star']];
    }
    if (u.role === 'ortu') return [['beranda', 'Ringkasan Anak', 'heart']];
    return [['beranda', 'Ringkasan', 'home'], ['kelas', 'Kelas', 'school'], ['pengguna', 'Pengguna', 'users']];
  }
  const roleName = u => ({ guru: 'Guru', siswa: 'Peserta didik', ortu: 'Orang tua', admin: 'Pengelola sekolah' }[u.role]);
  function whoLine(u) {
    if (u.role === 'siswa') { const c = q.cls(u.classId); return c ? `${c.name} · ${c.level}` : 'Peserta didik'; }
    if (u.role === 'ortu') { const c = q.user(u.childId); return c ? `Orang tua ${firstName(c)}` : 'Orang tua'; }
    return u.note || roleName(u);
  }

  function teacherClass(u) {
    const list = q.classesOfTeacher(u.id);
    const sel = st().ui.activeClass[u.id];
    return list.find(c => c.id === sel) || list[0] || null;
  }

  /* =========================================================
     Kerangka
     ========================================================= */
  function shell(u, r, body) {
    const nav = navFor(u);
    const unread = myNotifs(u).filter(n => !n.read).length;
    const links = cls => nav.map(([p, label, icon, count]) =>
      `<a href="#/${p}" class="${r.page === p ? 'on' : ''}" ${r.page === p ? 'aria-current="page"' : ''}>${ic(icon)}<span>${label}</span>${cls === 'side' && count ? `<span class="count">${count}</span>` : ''}</a>`).join('');

    let context = '';
    if (u.role === 'guru') {
      const list = q.classesOfTeacher(u.id);
      const c = teacherClass(u);
      if (list.length > 1) {
        context = `<label class="class-switch"><span class="lbl">Kelas yang dibuka</span>
          <select id="class-switch" data-change="switch-class" aria-label="Pilih kelas">${list.map(k => `<option value="${k.id}" ${c && c.id === k.id ? 'selected' : ''}>${esc(k.name)} · ${esc(k.subject)}</option>`).join('')}</select></label>`;
      } else if (c) {
        context = `<span class="class-label"><span class="tag lvl-${c.level}">${c.level}</span>${esc(c.name)} · ${esc(c.subject)}</span>`;
      }
    } else if (u.role === 'siswa') {
      const c = q.cls(u.classId);
      if (c) context = `<span class="class-label"><span class="tag lvl-${c.level}">${c.level}</span>${esc(c.name)}</span>`;
    } else if (u.role === 'ortu') {
      context = `<span class="class-label">${esc(st().school)}</span>`;
    } else {
      context = `<span class="class-label">${esc(st().school)}</span>`;
    }

    return `
    <div class="shell">
      <aside class="side" aria-label="Menu utama">
        <a class="brand" href="#/beranda">${brandMark()}<span>ruang<b>ajar</b></span></a>
        <div class="side-who">${avatar(u)}<div><strong>${esc(u.name)}</strong><span>${esc(whoLine(u))}</span></div></div>
        <nav class="nav">${links('side')}</nav>
        <div class="side-foot">
          <button data-action="help">${ic('help')}Panduan singkat</button>
          <button data-action="logout">${ic('out')}Keluar</button>
        </div>
      </aside>
      <div class="main">
        <header class="topbar">
          <a class="brand" href="#/beranda">${brandMark()}<span>ruang<b>ajar</b></span></a>
          
          ${context}
          <div class="spacer"></div>
          <div class="notif-wrap">
            <button class="icon-btn" data-action="notif" aria-label="Pemberitahuan${unread ? `, ${unread} belum dibaca` : ''}" aria-expanded="false">${ic('bell')}${unread ? `<span class="dot">${unread}</span>` : ''}</button>
            <div class="notif-panel" id="notif-panel" hidden></div>
          </div>
          <button class="icon-btn mobile-only" data-action="help" aria-label="Panduan singkat">${ic('help')}</button>
          <button class="icon-btn mobile-only" data-action="logout" aria-label="Keluar">${ic('out')}</button>
        </header>
        <div class="offline" id="offline" ${navigator.onLine ? 'hidden' : ''}>${ic('wifi')}<span>Sedang tidak ada sinyal. Tenang, pekerjaanmu tetap tersimpan di perangkat ini.</span></div>
        <main class="content" id="content">${body}</main>
      </div>
      <nav class="bottomnav" aria-label="Menu utama">${links('bottom')}</nav>
    </div>`;
  }
  const brandMark = () => `<span class="brand-mark">${ic('pen')}</span>`;

  function pageHead({ eyebrow, title, sub, actions, hand }) {
    return `<div class="page-head"><div>
      ${hand ? `<span class="greet-hand">${hand}</span>` : ''}
      ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
      <h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>
      ${actions ? `<div class="actions">${actions}</div>` : ''}</div>`;
  }
  const empty = (title, text, action = '') => `<div class="empty"><strong>${title}</strong>${text}${action ? `<div style="margin-top:14px">${action}</div>` : ''}</div>`;

  /* =========================================================
     Halaman masuk
     ========================================================= */
  function viewLogin() {
    const U = st().users;
    const btn = u => `<button class="person-btn" data-action="login" data-id="${u.id}">${avatar(u, 'sm')}<span>${esc(u.name)}<small>${esc(whoLine(u))}</small></span></button>`;
    const students = U.filter(u => u.role === 'siswa');
    const firstPerClass = st().classes.map(c => students.find(s => s.classId === c.id)).filter(Boolean);
    const rest = students.filter(s => !firstPerClass.includes(s));
    const group = (role, title, text, list, more) => list.length ? `
      <div class="who-card"><h3>${title}</h3><p>${text}</p>
        <div class="who-people">${list.map(btn).join('')}</div>
        ${more && more.length ? `<details><summary>Lihat ${more.length} nama lainnya</summary><div class="who-people">${more.map(btn).join('')}</div></details>` : ''}
      </div>` : '';

    return `
    <div class="login">
      <section class="login-story">
        <a class="brand" href="#/">${brandMark()}<span>ruang<b>ajar</b></span></a>
        <h1>Satu ruang kelas, <mark>tanpa</mark> berkas yang tercecer.</h1>
        <p class="lede">Materi, tugas, nilai, dan masukan guru ada di satu tempat. Cukup satu tautan dan satu akun, bisa dibuka dari HP maupun komputer, tanpa perlu memasang aplikasi.</p>
        <ol class="cycle" aria-label="Cara kerja RUANGAJAR">
          <li><span class="n">1</span><span>Guru membagikan materi dan tugas. Semua siswa di kelas langsung diberi tahu.</span></li>
          <li><span class="n">2</span><span>Siswa membaca dan mengerjakan kapan saja, lalu mengirim jawaban.</span></li>
          <li><span class="n">3</span><span>Kuis pilihan ganda dinilai otomatis. Tugas uraian dinilai guru di satu halaman.</span></li>
          <li><span class="n">4</span><span>Guru menulis masukan tiga bagian: yang sudah baik, yang masih keliru, dan langkah berikutnya.</span></li>
          <li><span class="n">5</span><span>Nilai langsung terlihat di buku nilai, halaman siswa, dan ringkasan orang tua.</span></li>
        </ol>
        <p class="cycle-note">Hasil langkah 5 menjadi bahan pertemuan berikutnya. Guru tetap memegang kendali, kami hanya merapikan sisanya.</p>
      </section>
      <section class="login-pick">
        <h2>Masuk sebagai siapa?</h2>
        <p class="hint">Ini versi percontohan. Pilih satu nama untuk mencoba, tanpa kata sandi. Semua data hanya tersimpan di peramban ini.</p>
        <div class="who-list">
          ${group('guru', 'Saya guru', 'Menyiapkan materi, memberi tugas, dan menilai.', U.filter(u => u.role === 'guru'))}
          ${group('siswa', 'Saya peserta didik', 'Membaca materi, mengerjakan tugas, dan melihat nilai. Tampilannya menyesuaikan jenjang SD, SMP, atau SMA.', firstPerClass, rest)}
          ${group('ortu', 'Saya orang tua', 'Melihat perkembangan belajar anak.', U.filter(u => u.role === 'ortu'))}
          ${group('admin', 'Saya pengelola sekolah', 'Mengatur kelas dan akun pengguna.', U.filter(u => u.role === 'admin'))}
        </div>
        <p class="login-foot">Data percontohan bisa dikembalikan seperti semula dari menu pengelola sekolah.</p>
      </section>
    </div>`;
  }

  /* =========================================================
     GURU
     ========================================================= */
  function noClass() {
    return pageHead({ title: 'Belum ada kelas' }) + empty('Anda belum memegang kelas', 'Minta pengelola sekolah menambahkan kelas untuk Anda lewat menu Kelas.');
  }

  function hardestOf(classId) {
    const quizzes = q.itemsOf(classId, 'kuis').filter(k => q.attemptsOf(k.id).length).sort((a, b) => b.due.localeCompare(a.due));
    const quiz = quizzes[0];
    if (!quiz) return null;
    const stats = q.questionStats(quiz).sort((a, b) => a.pct - b.pct);
    return { quiz, worst: stats[0] };
  }

  function gBeranda(u) {
    const c = teacherClass(u); if (!c) return noClass();
    const studs = q.studentsOf(c.id);
    const tasks = q.itemsOf(c.id, 'tugas');
    const pending = tasks.flatMap(i => q.subsOf(i.id).filter(s => s.score == null).map(s => ({ s, i })));
    const upcoming = q.itemsOf(c.id).filter(i => new Date(i.due) > Date.now());
    const next = upcoming[0];
    const nextDone = next ? studs.filter(s => q.status(next, s.id).done).length : 0;
    const avg = q.classAverage(c.id);
    const hard = hardestOf(c.id);
    const needHelp = studs.map(s => ({ s, avg: q.average(s.id), miss: q.missing(s.id) }))
      .filter(x => (x.avg != null && x.avg < 75) || x.miss.length);
    const latestMat = q.materialsOf(c.id)[0];

    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(shortName(u))}.`, sub: `Hari ini ${fmtDate(new Date().toISOString())}. Berikut hal-hal di ${esc(c.name)} yang perlu Anda ketahui.` })}

      <div class="stats">
        <a class="stat ${pending.length ? 'hl' : ''}" href="#/menilai"><span class="k">Menunggu dinilai</span><span class="v">${pending.length}</span><span class="d">${pending.length ? 'jawaban siswa' : 'Semua sudah dinilai'}</span></a>
        <div class="stat"><span class="k">Tenggat terdekat</span><span class="v num">${next ? `${nextDone}<small>/${studs.length}</small>` : '–'}</span><span class="d">${next ? `sudah mengerjakan "${esc(next.title)}"` : 'Tidak ada tenggat'}</span></div>
        <a class="stat" href="#/nilai"><span class="k">Rata-rata kelas</span><span class="v num">${avg ?? '–'}</span><span class="d">dari semua nilai yang masuk</span></a>
        <a class="stat" href="#/laporan"><span class="k">Perlu didampingi</span><span class="v num">${needHelp.length}</span><span class="d">siswa</span></a>
      </div>

      <section>
        <div class="section-title"><h2>Siklus pertemuan</h2></div>
        <div class="meeting">
          <div><span class="when">sebelum bertemu</span><h3>Siapkan materi & tugas</h3>
            <p>${latestMat ? `Materi terakhir: "${esc(latestMat.title)}", sudah dibaca ${(st().reads[latestMat.id] || []).length} dari ${studs.length} siswa.` : 'Belum ada materi untuk kelas ini.'}</p>
            <a class="btn btn-sm" href="#/materi">${ic('plus', 'ico-sm')}Bagikan materi</a></div>
          <div><span class="when">saat bertemu</span><h3>Bahas yang paling sering keliru</h3>
            <p>${hard ? `Di "${esc(hard.quiz.title)}", soal nomor ${hard.worst.index + 1} hanya dijawab benar oleh ${hard.worst.pct}% siswa: <em>${esc(hard.worst.q.q)}</em>` : 'Belum ada hasil kuis. Setelah siswa mengerjakan kuis, soal tersulit muncul di sini.'}</p>
            <a class="btn btn-sm" href="#/laporan${hard ? '/' + hard.quiz.id : ''}">${ic('chart', 'ico-sm')}Lihat sebaran jawaban</a></div>
          <div><span class="when">setelah bertemu</span><h3>Beri nilai & masukan</h3>
            <p>${pending.length ? `${pending.length} jawaban menunggu nilai dan masukan tiga bagian dari Anda.` : 'Semua jawaban sudah Anda nilai. Terima kasih!'}</p>
            <a class="btn btn-sm ${pending.length ? 'btn-primary' : ''}" href="#/menilai">${ic('pen', 'ico-sm')}Mulai menilai</a></div>
        </div>
      </section>

      <div class="split">
        <section>
          <div class="section-title"><h2>Tenggat berikutnya</h2><a href="#/tugas">Semua tugas & kuis</a></div>
          ${upcoming.length ? `<div class="list">${upcoming.slice(0, 4).map(i => {
            const done = studs.filter(s => q.status(i, s.id).done).length;
            return `<a class="li" href="${i.kind === 'tugas' ? '#/menilai/' + i.id : '#/laporan/' + i.id}">
              <span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
              <span><span class="t">${esc(i.title)}</span><span class="m"><span>${ic('clock', 'ico-sm')} ${relDue(i.due)}</span><span>${done} dari ${studs.length} sudah mengerjakan</span></span></span>
              <span class="r"><span class="tag ${i.kind}">${i.kind}</span></span></a>`;
          }).join('')}</div>` : empty('Tidak ada tenggat', 'Buat tugas atau kuis baru dari menu Tugas & Kuis.')}
        </section>
        <section>
          <div class="section-title"><h2>Perlu didampingi</h2></div>
          ${needHelp.length ? `<div class="list">${needHelp.map(x => `
            <div class="li">${avatar(x.s)}<span><span class="t">${esc(x.s.name)}</span>
            <span class="m">${x.avg != null ? `<span>Rata-rata ${x.avg}</span>` : ''}${x.miss.length ? `<span>${x.miss.length} pekerjaan lewat tenggat</span>` : ''}</span></span>
            <span class="r">${x.miss.length ? `<button class="btn btn-sm btn-ghost" data-action="remind" data-student="${x.s.id}" data-item="${x.miss[0].id}">${ic('bellring', 'ico-sm')}Ingatkan</button>` : ''}</span></div>`).join('')}</div>`
            : empty('Semua aman', 'Tidak ada siswa yang tertinggal saat ini.')}
        </section>
      </div>`;
  }

  /* ---------- Materi (guru) ---------- */
  function gMateri(u) {
    const c = teacherClass(u); if (!c) return noClass();
    const mats = q.materialsOf(c.id);
    const n = q.studentsOf(c.id).length;
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Materi', sub: 'Bacaan yang Anda bagikan bisa dibuka siswa kapan saja, dan bisa diunduh untuk dibaca tanpa internet.', actions: `<button class="btn btn-primary" data-action="new-material">${ic('plus')}Tambah materi</button>` })}
      ${mats.length ? `<div class="cards">${mats.map(m => {
        const r = (st().reads[m.id] || []).length;
        return `<article class="mcard">
          <div class="row"><span class="muted small">${fmtShort(m.createdAt)}</span>${m.attachment ? `<span class="attach">${ic('file', 'ico-sm')}${esc(m.attachment.name)}</span>` : ''}</div>
          <h3>${esc(m.title)}</h3>
          ${m.target ? `<p class="goal">${esc(m.target)}</p>` : ''}
          <div><div class="row small" style="justify-content:space-between"><span class="muted">Sudah dibaca</span><b class="num">${r}/${n} siswa</b></div>
          <div class="readbar"><i style="width:${n ? (r / n) * 100 : 0}%"></i></div></div>
          <div class="foot"><button class="btn btn-sm" data-action="open-material" data-id="${m.id}">Buka</button>
          <button class="btn btn-sm btn-ghost btn-danger" data-action="delete-material" data-id="${m.id}">${ic('trash', 'ico-sm')}Hapus</button></div>
        </article>`;
      }).join('')}</div>` : empty('Belum ada materi', 'Mulai dengan satu bacaan singkat untuk pertemuan berikutnya.', `<button class="btn btn-primary" data-action="new-material">${ic('plus')}Tambah materi</button>`)}`;
  }

  function materialForm() {
    openModal(`${modalHead('Tambah materi', 'Siswa di kelas ini akan langsung mendapat pemberitahuan.')}
      <form class="modal-body form" data-form="material">
        <div class="field"><label for="m-title">Judul</label><input class="input" id="m-title" name="title" required placeholder="Contoh: Mengenal sistem pernapasan"></div>
        <div class="field"><label for="m-target">Target belajar</label><input class="input" id="m-target" name="target" placeholder="Setelah membaca ini, kamu bisa…"><span class="help">Satu kalimat tentang apa yang bisa dilakukan siswa setelah membaca.</span></div>
        <div class="field"><label for="m-body">Isi bacaan</label><textarea class="textarea" id="m-body" name="body" rows="7" placeholder="Tulis dengan kalimat pendek. Awali baris dengan tanda - untuk membuat daftar."></textarea></div>
        <div class="field"><span class="label">Lampiran (tidak wajib)</span>
          <label class="file-drop" for="m-file">${ic('up')}<span id="m-file-name">Pilih berkas PDF, gambar, atau dokumen</span><input type="file" id="m-file" name="file" data-change="file-name" data-target="m-file-name"></label>
          <span class="help">Berkas di bawah 700 KB disimpan agar siswa bisa mengunduhnya.</span></div>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Bagikan ke kelas</button></div>
      </form>`);
  }

  function openMaterial(id) {
    const m = q.material(id); if (!m) return;
    const u = me();
    if (u.role === 'siswa' && !q.isRead(id, u.id)) {
      (st().reads[id] = st().reads[id] || []).push(u.id); save();
    }
    const t = q.user(q.cls(m.classId).teacherId);
    openModal(`${modalHead(esc(m.title), `Dari ${esc(t ? t.name : 'guru')} · ${fmtDate(m.createdAt)}`)}
      <div class="modal-body stack">
        ${m.target ? `<div class="callout">${ic('star')}<p><b>Target belajar:</b> ${esc(m.target)}</p></div>` : ''}
        <div class="reader">${richText(m.body)}</div>
        <div class="row" style="justify-content:flex-end">
          ${m.attachment ? `<button class="btn" data-action="download-attachment" data-id="${m.id}">${ic('file')}Unduh ${esc(m.attachment.name)}</button>` : ''}
          <button class="btn btn-pencil" data-action="download-material" data-id="${m.id}">${ic('down')}Simpan untuk dibaca tanpa internet</button>
        </div>
      </div>`, { wide: true, noFocus: true });
    if (u.role === 'siswa') modalCleanup = () => render();
  }

  /* ---------- Tugas & kuis (guru) ---------- */
  function gTugas(u) {
    const c = teacherClass(u); if (!c) return noClass();
    const items = q.itemsOf(c.id).slice().reverse();
    const studs = q.studentsOf(c.id);
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Tugas & Kuis', sub: 'Setiap tugas punya tenggat. Kuis pilihan ganda dinilai otomatis begitu siswa selesai.', actions: `<button class="btn" data-action="new-kuis">${ic('bulb')}Buat kuis</button><button class="btn btn-primary" data-action="new-tugas">${ic('plus')}Buat tugas</button>` })}
      ${items.length ? `<div class="list">${items.map(i => {
        const done = studs.filter(s => q.status(i, s.id).done).length;
        const pend = i.kind === 'tugas' ? q.subsOf(i.id).filter(s => s.score == null).length : 0;
        const past = Date.now() > new Date(i.due).getTime();
        return `<div class="li">
          <span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
          <span><span class="t">${esc(i.title)} ${i.group ? '<span class="tag">kelompok</span>' : ''}</span>
            <span class="m"><span>${ic('clock', 'ico-sm')} ${fmtShort(i.due)}, ${fmtTime(i.due)} (${relDue(i.due)})</span><span>${done}/${studs.length} sudah ${i.kind === 'kuis' ? 'mengerjakan' : 'mengumpulkan'}</span>${i.kind === 'kuis' ? `<span>${i.questions.length} soal</span>` : ''}</span></span>
          <span class="r">
            ${pend ? `<span class="pill warn">${pend} perlu dinilai</span>` : past ? '<span class="pill plain">Tenggat lewat</span>' : '<span class="pill info">Berjalan</span>'}
            <a class="btn btn-sm" href="${i.kind === 'tugas' ? '#/menilai/' + i.id : '#/laporan/' + i.id}">${i.kind === 'tugas' ? 'Nilai' : 'Lihat hasil'}</a>
            <button class="btn btn-sm btn-ghost btn-danger" data-action="delete-item" data-id="${i.id}" aria-label="Hapus ${esc(i.title)}">${ic('trash', 'ico-sm')}</button>
          </span></div>`;
      }).join('')}</div>` : empty('Belum ada tugas atau kuis', 'Buat yang pertama, siswa akan langsung diberi tahu.')}`;
  }

  function localInput(days) {
    const d = new Date(Date.now() + days * DAY); d.setHours(23, 59, 0, 0);
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  function tugasForm() {
    const c = teacherClass(me());
    openModal(`${modalHead('Buat tugas', `Untuk ${esc(c.name)}. Siswa langsung diberi tahu.`)}
      <form class="modal-body form" data-form="tugas">
        <div class="field"><label for="t-title">Judul tugas</label><input class="input" id="t-title" name="title" required placeholder="Contoh: Poster ajakan menjaga paru-paru"></div>
        <div class="field"><label for="t-target">Target belajar</label><input class="input" id="t-target" name="target" placeholder="Apa yang ingin dicapai lewat tugas ini?"></div>
        <div class="field"><label for="t-ins">Petunjuk</label><textarea class="textarea" id="t-ins" name="instructions" required placeholder="Jelaskan langkahnya dengan kalimat pendek."></textarea></div>
        <div class="field"><label for="t-due">Tenggat</label><input class="input" type="datetime-local" id="t-due" name="due" required value="${localInput(3)}"></div>
        ${c.level === 'SMA' ? `<label class="check"><input type="checkbox" name="group" id="t-group"> Ini tugas kelompok</label>` : ''}
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Bagikan tugas</button></div>
      </form>`);
  }

  let qbCount = 0;
  function qbItem() {
    const i = qbCount++;
    return `<div class="qb-item" data-qi="${i}">
      <div class="qb-head"><b>Soal</b><button type="button" class="btn btn-sm btn-ghost" data-action="qb-remove">${ic('x', 'ico-sm')}Hapus soal</button></div>
      <input class="input" name="q" placeholder="Tulis pertanyaannya" required aria-label="Pertanyaan">
      <div class="qb-opts">${[0, 1, 2, 3].map(o => `<label class="qb-opt"><input type="radio" name="ans-${i}" value="${o}" ${o === 0 ? 'checked' : ''} aria-label="Tandai pilihan ${'ABCD'[o]} sebagai jawaban benar"><input class="input" name="opt" placeholder="Pilihan ${'ABCD'[o]}" required></label>`).join('')}</div>
      <span class="help small muted">Pilih bulatan di samping jawaban yang benar.</span>
    </div>`;
  }
  function kuisForm() {
    const c = teacherClass(me());
    qbCount = 0;
    openModal(`${modalHead('Buat kuis', `Untuk ${esc(c.name)}. Nilai dihitung otomatis.`)}
      <form class="modal-body form" data-form="kuis">
        <div class="field-row">
          <div class="field"><label for="k-title">Judul kuis</label><input class="input" id="k-title" name="title" required placeholder="Contoh: Kuis organ pernapasan"></div>
          <div class="field"><label for="k-due">Tenggat</label><input class="input" type="datetime-local" id="k-due" name="due" required value="${localInput(5)}"></div>
        </div>
        <div class="qb" id="qb">${qbItem()}${qbItem()}</div>
        <button type="button" class="btn" data-action="qb-add">${ic('plus')}Tambah soal</button>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Bagikan kuis</button></div>
      </form>`, { wide: true });
  }

  /* ---------- Menilai (guru) ---------- */
  function gMenilai(u, id) {
    const c = teacherClass(u); if (!c) return noClass();
    const tasks = q.itemsOf(c.id, 'tugas');
    if (!tasks.length) return pageHead({ title: 'Menilai' }) + empty('Belum ada tugas uraian', 'Kuis pilihan ganda dinilai otomatis. Tugas uraian akan muncul di sini untuk Anda nilai.');
    const it = tasks.find(t => t.id === id) || tasks.find(t => q.subsOf(t.id).some(s => s.score == null)) || tasks[tasks.length - 1];
    const only = st().ui.onlyPending;
    const studs = q.studentsOf(c.id);
    const L = fbLabels(c.level);
    const pendCount = q.subsOf(it.id).filter(s => s.score == null).length;

    const cards = studs.map(s => {
      const sub = q.sub(it.id, s.id);
      if (!sub) {
        if (only) return '';
        const over = Date.now() > new Date(it.due).getTime();
        return `<div class="grade-card done"><div class="who">${avatar(s)}<strong>${esc(s.name)}</strong>
          <span class="pill ${over ? 'bad' : 'warn'}">Belum mengumpulkan</span><span class="spacer" style="flex:1"></span>
          <button class="btn btn-sm" data-action="remind" data-student="${s.id}" data-item="${it.id}">${ic('bellring', 'ico-sm')}Ingatkan</button></div></div>`;
      }
      if (only && sub.score != null) return '';
      const late = sub.submittedAt > it.due;
      const f = sub.feedback || {};
      return `<form class="grade-card ${sub.score != null ? 'done' : ''}" data-form="grade" data-sub="${sub.id}">
        <div class="who">${avatar(s)}<strong>${esc(s.name)}</strong>
          <span class="pill ${late ? 'warn' : 'ok'}">${late ? 'Terlambat' : 'Tepat waktu'}</span>
          <span class="muted small">${ic('clock', 'ico-sm')} ${fmtShort(sub.submittedAt)}, ${fmtTime(sub.submittedAt)}</span>
          ${sub.score != null ? `<span class="pill info">Sudah dinilai</span>` : ''}</div>
        ${sub.members ? `<div class="small muted"><b>Anggota kelompok:</b> ${esc(sub.members)}</div>` : ''}
        <div class="answer">${esc(sub.text) || '<span class="muted">Tanpa teks jawaban.</span>'}</div>
        ${sub.fileName ? `<div><span class="attach">${ic('file', 'ico-sm')}${esc(sub.fileName)}</span></div>` : ''}
        <div class="fb3">
          <div class="field"><label for="g-${sub.id}-good"><i style="background:var(--bluepen)"></i>${L.good}</label><textarea class="textarea" id="g-${sub.id}-good" name="good" placeholder="Apa yang sudah tepat?">${esc(f.good)}</textarea></div>
          <div class="field"><label for="g-${sub.id}-wrong"><i style="background:var(--redpen)"></i>${L.wrong}</label><textarea class="textarea" id="g-${sub.id}-wrong" name="wrong" placeholder="Bagian mana yang belum tepat?">${esc(f.wrong)}</textarea></div>
          <div class="field"><label for="g-${sub.id}-next"><i style="background:var(--ink)"></i>${L.next}</label><textarea class="textarea" id="g-${sub.id}-next" name="next" placeholder="Apa yang sebaiknya dilakukan setelah ini?">${esc(f.next)}</textarea></div>
        </div>
        <div class="grade-row">
          <div class="field"><label for="g-${sub.id}-score">Nilai (0–100)</label><input class="input score-input" type="number" min="0" max="100" id="g-${sub.id}-score" name="score" value="${sub.score ?? ''}" required></div>
          <button class="btn btn-primary">${ic('check')}${sub.score != null ? 'Perbarui nilai' : 'Simpan nilai & masukan'}</button>
        </div>
      </form>`;
    }).join('');

    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Menilai', sub: 'Semua jawaban kelas ada di satu halaman. Nilai yang Anda simpan langsung masuk ke buku nilai, halaman siswa, dan ringkasan orang tua.' })}
      <div class="chips" role="tablist" aria-label="Pilih tugas">${tasks.slice().reverse().map(t => {
        const p = q.subsOf(t.id).filter(s => s.score == null).length;
        return `<a class="chip ${t.id === it.id ? 'on' : ''}" href="#/menilai/${t.id}" role="tab" aria-selected="${t.id === it.id}">${esc(t.title)}${p ? `<span class="c">${p}</span>` : ''}</a>`;
      }).join('')}</div>
      <div class="panel stack">
        <div class="row" style="justify-content:space-between">
          <div><h2 style="font-size:19px">${esc(it.title)} ${it.group ? '<span class="tag">kelompok</span>' : ''}</h2><p class="muted small">Tenggat ${fmtFull(it.due)}</p></div>
          <label class="check"><input type="checkbox" id="only-pending" data-change="only-pending" ${only ? 'checked' : ''}> Tampilkan yang belum dinilai saja</label>
        </div>
        <p class="small" style="color:var(--ink-2)">${esc(it.instructions)}</p>
      </div>
      <div class="stack">${cards || empty('Beres!', `Tidak ada jawaban yang menunggu nilai untuk tugas ini${pendCount ? '' : ''}.`)}</div>`;
  }

  /* ---------- Buku nilai (guru) ---------- */
  function gradebookData(c) {
    const items = q.itemsOf(c.id);
    const studs = q.studentsOf(c.id);
    return { items, studs };
  }
  function gNilai(u) {
    const c = teacherClass(u); if (!c) return noClass();
    const { items, studs } = gradebookData(c);
    const colAvg = items.map(i => {
      const sc = studs.map(s => q.status(i, s.id)).filter(x => x.graded).map(x => x.score);
      return sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : null;
    });
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Buku Nilai', sub: 'Terisi sendiri dari hasil kuis dan nilai tugas yang Anda simpan. Inilah rekap resmi sekolah, jadi tidak perlu disalin ulang ke tempat lain.', actions: `<button class="btn" data-action="export-grades">${ic('down')}Unduh (CSV / Excel)</button>` })}
      ${items.length && studs.length ? `<div class="table-wrap"><table class="grades">
        <thead><tr><th scope="col">Nama siswa</th>${items.map(i => `<th scope="col"><span class="tag ${i.kind}">${i.kind}</span><span class="t">${esc(i.title)}</span></th>`).join('')}<th scope="col">Rata-rata</th></tr></thead>
        <tbody>${studs.map(s => `<tr><th scope="row" style="font-weight:600"><span class="row" style="flex-wrap:nowrap">${avatar(s, 'sm')}${esc(s.name)}</span></th>${items.map(i => {
          const x = q.status(i, s.id);
          if (x.graded) return `<td class="sc ${scoreClass(x.score)}">${x.score}</td>`;
          if (x.done) return `<td class="pend">perlu dinilai</td>`;
          return `<td class="miss">${x.overdue ? 'belum' : '·'}</td>`;
        }).join('')}<td class="avg num">${q.average(s.id) ?? '–'}</td></tr>`).join('')}</tbody>
        <tfoot><tr><td>Rata-rata kelas</td>${colAvg.map(v => `<td class="num">${v ?? '–'}</td>`).join('')}<td class="num">${q.classAverage(c.id) ?? '–'}</td></tr></tfoot>
      </table></div>
      <p class="small muted">Keterangan: <b style="color:var(--good)">hijau</b> 85 ke atas, <b style="color:var(--bad)">merah</b> di bawah 70. "belum" artinya tenggat sudah lewat tapi belum dikerjakan; titik artinya tenggat belum tiba.</p>`
        : empty('Buku nilai masih kosong', 'Nilai akan muncul di sini begitu ada tugas atau kuis yang dikerjakan.')}`;
  }

  function exportGrades(c, onlySid) {
    const { items } = gradebookData(c);
    const studs = onlySid ? [q.user(onlySid)] : q.studentsOf(c.id);
    const rows = [['Nama', ...items.map(i => `${i.kind === 'kuis' ? 'Kuis' : 'Tugas'}: ${i.title}`), 'Rata-rata']];
    studs.forEach(s => rows.push([s.name, ...items.map(i => { const x = q.status(i, s.id); return x.graded ? x.score : x.done ? 'perlu dinilai' : ''; }), q.average(s.id) ?? '']));
    const csv = '﻿' + rows.map(r => r.map(csvCell).join(';')).join('\r\n');
    download(`nilai-${slug(c.name)}${onlySid ? '-' + slug(studs[0].name) : ''}.csv`, csv, 'text/csv;charset=utf-8');
    toast('Rekap nilai diunduh. Bisa dibuka di Excel atau Google Sheets.');
  }

  /* ---------- Laporan kelas (guru) ---------- */
  function gLaporan(u, id) {
    const c = teacherClass(u); if (!c) return noClass();
    const studs = q.studentsOf(c.id);
    const quizzes = q.itemsOf(c.id, 'kuis');
    const quiz = quizzes.find(k => k.id === id) || quizzes.filter(k => q.attemptsOf(k.id).length).pop() || quizzes[0];
    let quizHtml = empty('Belum ada kuis', 'Buat kuis agar sebaran jawaban siswa bisa terlihat di sini.');
    if (quiz) {
      const stats = q.questionStats(quiz);
      const n = q.attemptsOf(quiz.id).length;
      const worst = n ? stats.slice().sort((a, b) => a.pct - b.pct)[0] : null;
      quizHtml = `
        <div class="chips">${quizzes.map(k => `<a class="chip ${k.id === quiz.id ? 'on' : ''}" href="#/laporan/${k.id}">${esc(k.title)}</a>`).join('')}</div>
        <div class="panel stack">
          <div class="row" style="justify-content:space-between"><h2 style="font-size:18px">${esc(quiz.title)}</h2><span class="muted small num">${n} dari ${studs.length} siswa sudah mengerjakan</span></div>
          ${n ? `
          ${worst && worst.pct < 70 ? `<div class="callout">${ic('bulb')}<p><b>Bahas ini saat tatap muka:</b> soal nomor ${worst.index + 1} hanya dijawab benar oleh ${worst.pct}% siswa. Jawaban salah yang paling banyak dipilih adalah "${esc(worst.q.options[worst.picks.map((p, i) => i === worst.q.answer ? -1 : p).reduce((b, v, i, a) => v > a[b] ? i : b, worst.q.answer === 0 ? 1 : 0)])}".</p></div>` : `<div class="callout info">${ic('check')}<p>Sebagian besar soal sudah dipahami dengan baik oleh kelas.</p></div>`}
          <div class="bars">${stats.map(s => `<div class="bar-row ${s.pct < 70 ? 'low' : ''}">
            <span class="lbl"><b>${s.index + 1}</b><span>${esc(s.q.q)}</span></span>
            <div class="bar" role="img" aria-label="${s.pct}% benar"><i style="width:${s.pct}%"></i></div><span class="pct">${s.pct}%</span></div>`).join('')}</div>
          <p class="small muted">Batang menunjukkan persentase siswa yang menjawab benar. Warna merah berarti di bawah 70%.</p>` : '<p class="muted">Belum ada siswa yang mengerjakan kuis ini.</p>'}
        </div>`;
    }

    const rows = studs.map(s => ({ s, avg: q.average(s.id), miss: q.missing(s.id), done: q.itemsOf(c.id).filter(i => q.status(i, s.id).done).length }));
    const total = q.itemsOf(c.id).length;
    return `
      ${pageHead({ eyebrow: esc(c.name) + ' · ' + esc(c.subject), title: 'Laporan Kelas', sub: 'Lihat bagian mana yang paling banyak keliru, supaya jam pelajaran dipakai untuk berdiskusi, bukan mengulang semua materi.' })}
      <section class="stack"><div class="section-title" style="margin:0"><h2>Sebaran jawaban kuis</h2></div>${quizHtml}</section>
      <section>
        <div class="section-title"><h2>Perkembangan tiap siswa</h2></div>
        <div class="list">${rows.map(x => `<div class="li">${avatar(x.s)}
          <span><span class="t">${esc(x.s.name)}</span><span class="m"><span class="num">${x.done}/${total} pekerjaan selesai</span>${x.miss.length ? `<span style="color:var(--bad)">${x.miss.length} lewat tenggat</span>` : ''}</span></span>
          <span class="r">${x.avg == null ? '<span class="pill plain">Belum ada nilai</span>' : x.avg < 75 ? `<span class="pill bad">Perlu didampingi · ${x.avg}</span>` : x.avg >= 85 ? `<span class="pill ok">Siap pengayaan · ${x.avg}</span>` : `<span class="pill info">Sesuai jalur · ${x.avg}</span>`}</span></div>`).join('')}</div>
      </section>`;
  }

  /* =========================================================
     PESERTA DIDIK
     ========================================================= */
  function sBeranda(u) {
    const c = q.cls(u.classId);
    const items = q.itemsOf(u.classId);
    const todo = items.filter(i => !q.status(i, u.id).done);
    const lastFb = st().submissions.filter(s => s.studentId === u.id && s.feedback).sort((a, b) => (b.gradedAt || '').localeCompare(a.gradedAt || ''))[0];
    const avg = q.average(u.id);
    const sd = c.level === 'SD';

    if (sd) {
      const tugasTodo = q.itemsOf(u.classId, 'tugas').filter(i => !q.status(i, u.id).done).length;
      const kuisTodo = q.itemsOf(u.classId, 'kuis').filter(i => !q.status(i, u.id).done).length;
      const unreadMat = q.materialsOf(u.classId).filter(m => !q.isRead(m.id, u.id)).length;
      return `
        ${pageHead({ hand: 'Halo,', title: `${esc(firstName(u))}! Mau belajar apa hari ini?`, sub: 'Pilih salah satu kotak di bawah ini.' })}
        <div class="tiles">
          <a class="tile t1" href="#/materi"><span class="pic">${ic('book')}</span><b>Bacaanku</b><span>Materi dari ${esc(shortName(q.user(c.teacherId)))}</span>${unreadMat ? `<span class="badge">${unreadMat} baru</span>` : ''}</a>
          <a class="tile t2" href="#/tugas"><span class="pic">${ic('clip')}</span><b>Tugasku</b><span>Pekerjaan rumah</span>${tugasTodo ? `<span class="badge">${tugasTodo} belum</span>` : ''}</a>
          <a class="tile t3" href="#/kuis"><span class="pic">${ic('bulb')}</span><b>Kuisku</b><span>Tebak-tebakan pelajaran</span>${kuisTodo ? `<span class="badge">${kuisTodo} belum</span>` : ''}</a>
          <a class="tile t4" href="#/nilai"><span class="pic">${ic('star')}</span><b>Nilaiku</b><span>Lihat bintang dan pesan guru</span></a>
        </div>
        ${lastFb ? `<section><div class="section-title"><h2>Pesan terbaru dari gurumu</h2></div>${sheet(lastFb, 'SD')}</section>` : ''}
        <div class="callout info">${ic('heart')}<p>Kalau bingung, minta tolong Ayah, Ibu, atau Bapak/Ibu guru untuk menemanimu, ya.</p></div>`;
    }

    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(firstName(u))}.`, sub: todo.length ? `Ada ${todo.length} pekerjaan yang menunggumu. Kerjakan yang tenggatnya paling dekat dulu.` : 'Semua pekerjaanmu sudah selesai. Kerja bagus!' })}
      <div class="stats">
        <a class="stat" href="#/nilai"><span class="k">Rata-rata nilaimu</span><span class="v num">${avg ?? '–'}</span><span class="d">Rata-rata kelas ${q.classAverage(u.classId) ?? '–'}</span></a>
        <a class="stat ${todo.length ? 'hl' : ''}" href="#/tugas"><span class="k">Belum dikerjakan</span><span class="v num">${todo.length}</span><span class="d">tugas & kuis</span></a>
        <a class="stat" href="#/materi"><span class="k">Materi dibaca</span><span class="v num">${q.materialsOf(u.classId).filter(m => q.isRead(m.id, u.id)).length}<small>/${q.materialsOf(u.classId).length}</small></span><span class="d">bacaan dari guru</span></a>
      </div>
      <div class="split">
        <section>
          <div class="section-title"><h2>Yang perlu kamu kerjakan</h2></div>
          ${todo.length ? `<div class="list">${todo.map(i => itemRow(u, i)).join('')}</div>` : empty('Tidak ada yang tertunda', 'Kamu bisa membaca ulang materi atau melihat masukan guru.')}
        </section>
        <section>
          <div class="section-title"><h2>Masukan terbaru</h2><a href="#/nilai">Semua masukan</a></div>
          ${lastFb ? `<p class="small muted" style="margin-bottom:8px">Untuk "${esc(q.item(lastFb.itemId).title)}"</p>${sheet(lastFb, c.level)}` : empty('Belum ada masukan', 'Masukan guru akan muncul di sini setelah tugasmu dinilai.')}
        </section>
      </div>`;
  }

  function itemRow(u, i) {
    const s = q.status(i, u.id);
    return `<a class="li" href="#/${i.kind === 'kuis' ? 'kuis' : 'tugas'}/${i.id}">
      <span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
      <span><span class="t">${esc(i.title)} ${i.group ? '<span class="tag">kelompok</span>' : ''}</span>
      <span class="m"><span>${ic('clock', 'ico-sm')} ${s.done ? `dikirim ${fmtShort(s.at)}` : relDue(i.due)}</span></span></span>
      <span class="r">${statusPill(i, s)}</span></a>`;
  }

  /* Lembar umpan balik bergaya kertas buku tulis */
  function sheet(sub, level) {
    const f = sub.feedback || {};
    const L = fbLabels(level);
    const item = q.item(sub.itemId);
    const t = item ? q.user(q.cls(item.classId).teacherId) : null;
    return `<div class="sheet">
      <span class="mark num">${sub.score}</span>
      ${f.good ? `<div class="part good"><span class="k">${L.good}</span><span class="v">${esc(f.good)}</span></div>` : ''}
      ${f.wrong ? `<div class="part wrong"><span class="k">${L.wrong}</span><span class="v">${esc(f.wrong)}</span></div>` : ''}
      ${f.next ? `<div class="part next"><span class="k">${L.next}</span><span class="v">${esc(f.next)}</span></div>` : ''}
      ${t ? `<div class="sig">— ${esc(shortName(t))}</div>` : ''}
    </div>`;
  }

  function sMateri(u) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    const mats = q.materialsOf(u.classId);
    return `
      ${pageHead({ title: sd ? 'Bacaanku' : 'Materi', sub: sd ? 'Pilih bacaan, lalu tekan tombol Baca.' : 'Baca kapan saja sesuai kecepatanmu. Kamu juga bisa menyimpannya untuk dibaca tanpa internet.' })}
      ${mats.length ? `<div class="cards">${mats.map(m => {
        const read = q.isRead(m.id, u.id);
        return `<article class="mcard">
          <div class="row" style="justify-content:space-between"><span class="muted small">${fmtShort(m.createdAt)}</span>${read ? `<span class="pill ok">Sudah dibaca</span>` : `<span class="pill warn">Baru</span>`}</div>
          <h3>${esc(m.title)}</h3>
          ${m.target ? `<p class="goal">${esc(m.target)}</p>` : ''}
          <div class="foot"><button class="btn btn-primary btn-sm" data-action="open-material" data-id="${m.id}">${ic('book', 'ico-sm')}Baca</button>
          <button class="btn btn-sm btn-ghost" data-action="download-material" data-id="${m.id}">${ic('down', 'ico-sm')}Simpan</button></div>
        </article>`;
      }).join('')}</div>` : empty('Belum ada materi', 'Gurumu belum membagikan bacaan.')}`;
  }

  function sTugas(u, id) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    if (id) {
      const it = q.item(id);
      if (it && it.kind === 'tugas' && it.classId === u.classId) return sTugasDetail(u, it, c);
    }
    const list = q.itemsOf(u.classId, 'tugas');
    const todo = list.filter(i => !q.status(i, u.id).done);
    const done = list.filter(i => q.status(i, u.id).done).reverse();
    return `
      ${pageHead({ title: sd ? 'Tugasku' : 'Tugas', sub: sd ? 'Tugas dari gurumu ada di sini.' : 'Kirim jawabanmu sebelum tenggat. Waktu pengiriman tercatat otomatis.' })}
      <section><div class="section-title"><h2>${sd ? 'Belum dikerjakan' : 'Belum dikumpulkan'}</h2></div>
        ${todo.length ? `<div class="list">${todo.map(i => itemRow(u, i)).join('')}</div>` : empty(sd ? 'Hore, semua tugas sudah selesai!' : 'Semua tugas sudah dikumpulkan', '')}</section>
      <section><div class="section-title"><h2>${sd ? 'Sudah dikerjakan' : 'Sudah dikumpulkan'}</h2></div>
        ${done.length ? `<div class="list">${done.map(i => itemRow(u, i)).join('')}</div>` : empty('Belum ada', 'Tugas yang sudah kamu kirim akan muncul di sini.')}</section>`;
  }

  function sTugasDetail(u, it, c) {
    const sd = c.level === 'SD';
    const s = q.status(it, u.id);
    const sub = s.record;
    const t = q.user(c.teacherId);
    const canEdit = !s.graded;
    return `
      <a class="btn btn-ghost btn-sm" href="#/tugas" style="align-self:flex-start">${ic('back', 'ico-sm')}${sd ? 'Kembali ke Tugasku' : 'Kembali ke daftar tugas'}</a>
      ${pageHead({ eyebrow: `Tugas dari ${esc(t ? t.name : 'guru')}`, title: esc(it.title) + (it.group ? ' <span class="tag">kelompok</span>' : ''), sub: `Tenggat: ${fmtFull(it.due)} (${relDue(it.due)})` })}
      <div class="split">
        <div class="stack">
          <div class="panel stack">
            ${it.target ? `<div class="callout">${ic('star')}<p><b>Target:</b> ${esc(it.target)}</p></div>` : ''}
            <div><h2 style="font-size:17px;margin-bottom:6px">${sd ? 'Yang harus kamu lakukan' : 'Petunjuk'}</h2><div class="reader">${richText(it.instructions)}</div></div>
          </div>
          ${canEdit ? `
          <form class="panel form" data-form="submit-tugas" data-item="${it.id}">
            <h2 style="font-size:17px">${sub ? 'Ubah jawabanmu' : sd ? 'Tulis jawabanmu di sini' : 'Kirim jawabanmu'}</h2>
            ${it.group ? `<div class="field"><label for="sb-members">Nama anggota kelompok</label><input class="input" id="sb-members" name="members" value="${esc(sub ? sub.members : '')}" placeholder="Contoh: Bima, Kirana, Yoga"></div>` : ''}
            <div class="field"><label for="sb-text">${sd ? 'Jawabanku' : 'Jawaban'}</label><textarea class="textarea" id="sb-text" name="text" rows="6" placeholder="${sd ? 'Tulis di sini, ya…' : 'Tulis jawabanmu di sini.'}">${esc(sub ? sub.text : '')}</textarea></div>
            <div class="field"><span class="label">${sd ? 'Foto atau berkas (kalau ada)' : 'Lampiran (tidak wajib)'}</span>
              <label class="file-drop" for="sb-file">${ic('up')}<span id="sb-file-name">${sub && sub.fileName ? esc(sub.fileName) : 'Pilih foto atau berkas'}</span><input type="file" id="sb-file" name="file" data-change="file-name" data-target="sb-file-name"></label></div>
            <div class="form-actions"><button class="btn btn-primary">${ic('up')}${sub ? 'Kirim ulang' : sd ? 'Kirim ke guru' : 'Kumpulkan'}</button></div>
            ${sub ? `<p class="small muted">Terakhir dikirim ${fmtFull(sub.submittedAt)}. Kamu masih bisa mengubahnya sebelum dinilai.</p>` : ''}
          </form>` : `
          <div class="panel stack"><h2 style="font-size:17px">Jawabanmu</h2>
            ${sub.members ? `<p class="small"><b>Anggota:</b> ${esc(sub.members)}</p>` : ''}
            <div class="answer">${esc(sub.text) || '<span class="muted">Tanpa teks.</span>'}</div>
            ${sub.fileName ? `<div><span class="attach">${ic('file', 'ico-sm')}${esc(sub.fileName)}</span></div>` : ''}
            <p class="small muted">Dikirim ${fmtFull(sub.submittedAt)}${s.late ? ' (lewat tenggat)' : ''}.</p></div>`}
        </div>
        <aside class="stack">
          <div class="panel stack"><h2 style="font-size:17px">Status</h2>${statusPill(it, s)}
            ${s.graded ? `<div class="row">${scoreRing(s.score, sd)}<p class="small" style="color:var(--ink-2);flex:1">${sd ? 'Baca pesan gurumu di bawah, ya!' : 'Baca masukan gurumu untuk tahu langkah selanjutnya.'}</p></div>` : `<p class="small muted">${s.done ? 'Gurumu akan menilai dan menulis masukan.' : 'Belum ada jawaban yang dikirim.'}</p>`}
          </div>
          ${s.graded && sub.feedback ? sheet(sub, c.level) : ''}
        </aside>
      </div>`;
  }

  function scoreRing(score, sd) {
    const col = score >= 85 ? 'var(--good)' : score < 70 ? 'var(--redpen)' : 'var(--navy)';
    return `<div class="score-ring" style="--p:${score};--c:${col}"><span class="num">${score}<small>${sd ? 'nilaimu' : 'dari 100'}</small></span></div>`;
  }
  function starsFor(score) {
    const n = score >= 90 ? 5 : score >= 80 ? 4 : score >= 70 ? 3 : score >= 60 ? 2 : 1;
    return `<span class="stars" aria-label="${n} dari 5 bintang">${[1, 2, 3, 4, 5].map(i => `<svg viewBox="0 0 24 24" class="${i > n ? 'off' : ''}" aria-hidden="true">${P.star}</svg>`).join('')}</span>`;
  }

  /* ---------- Kuis (siswa) ---------- */
  const draftKey = (qid, sid) => `ruangajar:draft:${qid}:${sid}`;
  function readDraft(qid, sid) { try { return JSON.parse(localStorage.getItem(draftKey(qid, sid)) || 'null'); } catch (e) { return null; } }
  function writeDraft(qid, sid, v) { try { localStorage.setItem(draftKey(qid, sid), JSON.stringify(v)); return true; } catch (e) { return false; } }
  function clearDraft(qid, sid) { try { localStorage.removeItem(draftKey(qid, sid)); } catch (e) { /* abaikan */ } }

  function sKuis(u, id) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    if (id) {
      const it = q.item(id);
      if (it && it.kind === 'kuis' && it.classId === u.classId) return sKuisDetail(u, it, c);
    }
    const list = q.itemsOf(u.classId, 'kuis');
    return `
      ${pageHead({ title: sd ? 'Kuisku' : 'Kuis', sub: sd ? 'Jawab pertanyaannya, lalu lihat berapa yang benar!' : 'Kuis pilihan ganda. Nilainya langsung keluar begitu kamu selesai.' })}
      ${list.length ? `<div class="list">${list.slice().reverse().map(i => itemRow(u, i)).join('')}</div>` : empty('Belum ada kuis', 'Gurumu belum membuat kuis.')}`;
  }

  function sKuisDetail(u, it, c) {
    const sd = c.level === 'SD';
    const att = q.attempt(it.id, u.id);
    const back = `<a class="btn btn-ghost btn-sm" href="#/kuis" style="align-self:flex-start">${ic('back', 'ico-sm')}${sd ? 'Kembali ke Kuisku' : 'Kembali ke daftar kuis'}</a>`;
    if (att) {
      const right = att.answers.filter((a, i) => a === it.questions[i].answer).length;
      return `${back}
        ${pageHead({ eyebrow: 'Hasil kuis', title: esc(it.title), sub: `Dikerjakan ${fmtFull(att.submittedAt)}.` })}
        <div class="panel row" style="gap:20px">${scoreRing(att.score, sd)}
          <div class="stack" style="gap:6px;flex:1;min-width:200px">
            ${sd ? starsFor(att.score) : ''}
            <p style="font-size:17px"><b>${right} dari ${it.questions.length}</b> jawaban benar.</p>
            <p class="small" style="color:var(--ink-2)">${att.score >= 80 ? (sd ? 'Keren! Kamu sudah paham.' : 'Bagus sekali. Pemahamanmu sudah kuat.') : (sd ? 'Tidak apa-apa. Baca lagi bacaannya, ya.' : 'Lihat soal yang keliru di bawah, lalu baca ulang bagian materinya.')}</p>
          </div></div>
        <div class="quiz">${it.questions.map((qq, i) => `
          <div class="qcard"><span class="qn">Soal ${i + 1}</span><h3>${esc(qq.q)}</h3>
            <div class="opts">${qq.options.map((o, oi) => {
              const cls = oi === qq.answer ? 'right' : oi === att.answers[i] ? 'wrongpick' : '';
              return `<div class="opt static ${cls}"><span class="l">${'ABCD'[oi]}</span><span>${esc(o)}</span>${oi === qq.answer ? '<span class="pill ok" style="margin-left:auto">Jawaban benar</span>' : oi === att.answers[i] ? '<span class="pill bad" style="margin-left:auto">Pilihanmu</span>' : ''}</div>`;
            }).join('')}</div></div>`).join('')}</div>`;
    }
    const draft = readDraft(it.id, u.id) || {};
    const answered = Object.keys(draft.answers || {}).length;
    return `${back}
      ${pageHead({ eyebrow: `${it.questions.length} soal · tenggat ${fmtShort(it.due)}`, title: esc(it.title), sub: sd ? 'Pilih satu jawaban untuk setiap soal. Tenang, jawabanmu tersimpan sendiri.' : 'Pilih satu jawaban untuk setiap soal. Jawabanmu tersimpan otomatis di perangkat ini, jadi aman kalau sinyal putus.' })}
      <form class="quiz" data-form="quiz" data-item="${it.id}">
        ${it.questions.map((qq, i) => `
          <fieldset class="qcard" style="margin:0"><legend class="sr-only">Soal ${i + 1}</legend><span class="qn">Soal ${i + 1}</span><h3>${esc(qq.q)}</h3>
            <div class="opts">${qq.options.map((o, oi) => `<label class="opt"><input type="radio" name="qa-${i}" value="${oi}" ${draft.answers && draft.answers[i] === oi ? 'checked' : ''} data-change="quiz-draft"><span class="l">${'ABCD'[oi]}</span><span>${esc(o)}</span></label>`).join('')}</div>
          </fieldset>`).join('')}
        <div class="quiz-bar">
          <span class="saved" id="draft-state">${answered ? `${ic('check', 'ico-sm')}<span><span id="answered-n">${answered}</span> dari ${it.questions.length} dijawab · tersimpan ${draft.at ? fmtTime(draft.at) : ''}</span>` : `<span class="muted">0 dari ${it.questions.length} dijawab</span>`}</span>
          <button class="btn btn-primary">${ic('check')}${sd ? 'Selesai!' : 'Kirim jawaban'}</button>
        </div>
      </form>`;
  }

  /* ---------- Nilai (siswa) ---------- */
  function sNilai(u) {
    const c = q.cls(u.classId);
    const sd = c.level === 'SD';
    const sc = q.scoresOf(u.id).reverse();
    const avg = q.average(u.id);
    const cavg = q.classAverage(u.classId);
    const fbs = st().submissions.filter(s => s.studentId === u.id && s.feedback && s.score != null).sort((a, b) => (b.gradedAt || '').localeCompare(a.gradedAt || ''));
    const trendNote = avg == null ? '' : cavg == null ? '' : avg >= cavg
      ? (sd ? 'Kamu sudah belajar dengan baik. Pertahankan, ya!' : 'Capaianmu sudah di atas rata-rata kelas. Coba tantang dirimu dengan langkah berikutnya dari guru.')
      : (sd ? 'Pelan-pelan saja. Baca pesan gurumu dan coba lagi.' : 'Capaianmu masih di bawah rata-rata kelas. Mulailah dari masukan "langkah berikutnya" di bawah ini.');
    return `
      ${pageHead({ title: sd ? 'Nilaiku' : 'Nilai & Masukan', sub: sd ? 'Bintang dan pesan dari gurumu.' : 'Semua nilai dan masukan guru untukmu. Angka di sini sama persis dengan yang dilihat guru dan orang tuamu.', actions: c.level === 'SMA' ? `<button class="btn" data-action="export-mine">${ic('down')}Unduh rekap nilaiku</button>` : '' })}
      <div class="panel row" style="gap:22px">
        ${avg != null ? scoreRing(avg, sd) : ''}
        <div class="stack" style="gap:6px;flex:1;min-width:220px">
          <p class="small muted">${sd ? 'Rata-rata nilaimu' : 'Rata-rata nilaimu'}${cavg != null && !sd ? ` · rata-rata kelas ${cavg}` : ''}</p>
          ${sd && avg != null ? starsFor(avg) : ''}
          <p>${avg == null ? 'Belum ada nilai.' : trendNote}</p>
        </div>
      </div>
      <div class="split">
        <section>
          <div class="section-title"><h2>${sd ? 'Semua nilaiku' : 'Rincian nilai'}</h2></div>
          ${sc.length ? `<div class="panel bars">${sc.map(x => `<div class="bar-row ${x.st.score < 70 ? 'low' : ''}">
            <span class="lbl"><span class="tag ${x.item.kind}">${x.item.kind}</span><a href="#/${x.item.kind === 'kuis' ? 'kuis' : 'tugas'}/${x.item.id}" style="color:inherit">${esc(x.item.title)}</a></span>
            <div class="bar"><i style="width:${x.st.score}%"></i></div><span class="pct">${x.st.score}</span></div>`).join('')}</div>` : empty('Belum ada nilai', 'Kerjakan tugas atau kuis dulu, ya.')}
        </section>
        <section>
          <div class="section-title"><h2>${sd ? 'Pesan dari guru' : 'Masukan guru'}</h2></div>
          ${fbs.length ? `<div class="stack">${fbs.map(s => `<div><p class="small muted" style="margin-bottom:6px">${esc(q.item(s.itemId).title)} · ${fmtShort(s.gradedAt)}</p>${sheet(s, c.level)}</div>`).join('')}</div>` : empty('Belum ada masukan', 'Masukan muncul setelah gurumu menilai tugasmu.')}
        </section>
      </div>`;
  }

  /* =========================================================
     ORANG TUA
     ========================================================= */
  function oBeranda(u) {
    const child = q.user(u.childId);
    if (!child) return pageHead({ title: 'Ringkasan Anak' }) + empty('Akun belum terhubung', 'Minta pengelola sekolah menghubungkan akun Anda dengan akun anak.');
    const c = q.cls(child.classId);
    const t = q.user(c.teacherId);
    const avg = q.average(child.id);
    const items = q.itemsOf(child.classId);
    const todo = items.filter(i => !q.status(i, child.id).done);
    const sc = q.scoresOf(child.id).reverse().slice(0, 5);
    const fb = st().submissions.filter(s => s.studentId === child.id && s.feedback && s.score != null).sort((a, b) => (b.gradedAt || '').localeCompare(a.gradedAt || ''))[0];
    const done = items.length - todo.length;
    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(u.name)}.`, sub: `Berikut perkembangan belajar ${esc(firstName(child))} di ${esc(c.name)}. Halaman ini hanya untuk dilihat, jadi Anda tidak perlu khawatir salah tekan.` })}
      <div class="panel row" style="gap:16px">${avatar(child, 'lg')}<div style="flex:1;min-width:180px"><h2 style="font-size:20px">${esc(child.name)}</h2><p class="muted small">${esc(c.name)} · ${c.level} · wali pelajaran ${esc(t ? t.name : '-')}</p></div>
        ${avg != null ? scoreRing(avg) : ''}</div>
      <div class="stats">
        <div class="stat"><span class="k">Rata-rata nilai</span><span class="v num">${avg ?? '–'}</span><span class="d">Rata-rata kelas ${q.classAverage(c.id) ?? '–'}</span></div>
        <div class="stat"><span class="k">Pekerjaan selesai</span><span class="v num">${done}<small>/${items.length}</small></span><span class="d">tugas & kuis</span></div>
        <div class="stat ${todo.length ? 'hl' : ''}"><span class="k">Belum dikerjakan</span><span class="v num">${todo.length}</span><span class="d">${todo.filter(i => Date.now() > new Date(i.due)).length} di antaranya lewat tenggat</span></div>
      </div>
      <div class="split">
        <section>
          <div class="section-title"><h2>Yang belum dikerjakan</h2></div>
          ${todo.length ? `<div class="list">${todo.map(i => { const s = q.status(i, child.id); return `<div class="li"><span class="li-icon ${i.kind}">${ic(i.kind === 'kuis' ? 'bulb' : 'clip')}</span>
            <span><span class="t">${esc(i.title)}</span><span class="m"><span>${ic('clock', 'ico-sm')} Tenggat ${fmtShort(i.due)} (${relDue(i.due)})</span></span></span><span class="r">${statusPill(i, s)}</span></div>`; }).join('')}</div>` : empty('Semua sudah dikerjakan', `${esc(firstName(child))} sudah menyelesaikan semua tugas dan kuis.`)}
          <div class="section-title" style="margin-top:22px"><h2>Nilai terbaru</h2></div>
          ${sc.length ? `<div class="panel bars">${sc.map(x => `<div class="bar-row ${x.st.score < 70 ? 'low' : ''}"><span class="lbl"><span class="tag ${x.item.kind}">${x.item.kind}</span>${esc(x.item.title)}</span><div class="bar"><i style="width:${x.st.score}%"></i></div><span class="pct">${x.st.score}</span></div>`).join('')}</div>` : empty('Belum ada nilai', '')}
        </section>
        <section>
          <div class="section-title"><h2>Masukan guru terbaru</h2></div>
          ${fb ? `<p class="small muted" style="margin-bottom:6px">${esc(q.item(fb.itemId).title)}</p>${sheet(fb, c.level)}` : empty('Belum ada masukan', '')}
          <div class="callout info" style="margin-top:16px">${ic('heart')}<p><b>Cara mendampingi di rumah:</b> tanyakan satu hal yang ${esc(firstName(child))} pelajari hari ini, lalu bacakan bersama bagian "langkah berikutnya" dari guru. ${c.level === 'SD' ? 'Untuk anak SD, temani saat membuka materi dan mengerjakan tugas.' : ''}</p></div>
        </section>
      </div>`;
  }

  /* =========================================================
     PENGELOLA SEKOLAH
     ========================================================= */
  function aBeranda(u) {
    const U = st().users;
    const count = r => U.filter(x => x.role === r).length;
    const recent = st().submissions.slice().sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).slice(0, 5);
    return `
      ${pageHead({ hand: `${greeting()},`, title: `${esc(shortName(u))}.`, sub: `Ringkasan ${esc(st().school)}.` })}
      <div class="stats">
        <a class="stat" href="#/kelas"><span class="k">Kelas</span><span class="v num">${st().classes.length}</span><span class="d">SD, SMP, dan SMA</span></a>
        <a class="stat" href="#/pengguna"><span class="k">Guru</span><span class="v num">${count('guru')}</span></a>
        <a class="stat" href="#/pengguna"><span class="k">Peserta didik</span><span class="v num">${count('siswa')}</span></a>
        <a class="stat" href="#/pengguna"><span class="k">Orang tua</span><span class="v num">${count('ortu')}</span></a>
      </div>
      <div class="split">
        <section><div class="section-title"><h2>Kegiatan terbaru</h2></div>
          <div class="list">${recent.map(s => { const stu = q.user(s.studentId); const it = q.item(s.itemId); if (!stu || !it) return ''; return `<div class="li">${avatar(stu)}<span><span class="t">${esc(stu.name)} mengumpulkan "${esc(it.title)}"</span><span class="m"><span>${ago(s.submittedAt)}</span><span>${esc((q.cls(stu.classId) || {}).name || '')}</span></span></span><span class="r">${s.score != null ? '<span class="pill ok">Dinilai</span>' : '<span class="pill warn">Menunggu nilai</span>'}</span></div>`; }).join('')}</div>
        </section>
        <section class="stack"><div class="section-title" style="margin:0"><h2>Pengaturan</h2></div>
          <div class="panel stack"><p class="small" style="color:var(--ink-2)">Buku nilai di RUANGAJAR disepakati sebagai rekap resmi sekolah, supaya guru tidak mengerjakan rekap dua kali.</p>
            <p class="small muted">Versi percontohan menyimpan data di peramban ini. Kembalikan data contoh bila ingin memulai ulang uji coba.</p>
            <button class="btn btn-danger" data-action="reset-demo">${ic('cycle')}Kembalikan data contoh</button></div>
        </section>
      </div>`;
  }

  function aKelas() {
    const gurus = st().users.filter(x => x.role === 'guru');
    return `
      ${pageHead({ title: 'Kelas', sub: 'Setiap kelas punya satu jenjang dan satu guru. Tampilan siswa menyesuaikan jenjangnya secara otomatis.', actions: `<button class="btn btn-primary" data-action="new-class">${ic('plus')}Tambah kelas</button>` })}
      <div class="list">${st().classes.map(c => { const t = q.user(c.teacherId); const n = q.studentsOf(c.id).length; return `<div class="li"><span class="li-icon">${ic('school')}</span>
        <span><span class="t">${esc(c.name)} · ${esc(c.subject)}</span><span class="m"><span>${esc(t ? t.name : 'Belum ada guru')}</span><span class="num">${n} siswa</span></span></span>
        <span class="r"><span class="tag lvl-${c.level}">${c.level}</span><button class="btn btn-sm btn-ghost btn-danger" data-action="del-class" data-id="${c.id}" aria-label="Hapus ${esc(c.name)}">${ic('trash', 'ico-sm')}</button></span></div>`; }).join('')}</div>
      <div class="callout info">${ic('help')}<p><b>SD:</b> menu besar bergambar dan istilah akrab seperti "Tugasku". <b>SMP:</b> istilah akademik, siswa mulai mengatur waktunya sendiri. <b>SMA:</b> tambahan tugas kelompok dan unduh rekap nilai.</p></div>
      ${gurus.length ? '' : ''}`;
  }

  function aPengguna() {
    const groups = [['guru', 'Guru'], ['siswa', 'Peserta didik'], ['ortu', 'Orang tua'], ['admin', 'Pengelola']];
    return `
      ${pageHead({ title: 'Pengguna', sub: 'Setiap orang punya satu akun dengan hak akses sesuai perannya.', actions: `<button class="btn btn-primary" data-action="new-user">${ic('plus')}Tambah pengguna</button>` })}
      ${groups.map(([r, label]) => {
        const list = st().users.filter(x => x.role === r);
        return `<section><div class="section-title"><h2>${label} <span class="muted num" style="font-weight:500">(${list.length})</span></h2></div>
          <div class="list">${list.map(x => `<div class="li">${avatar(x)}<span><span class="t">${esc(x.name)}</span><span class="m"><span>${esc(whoLine(x))}</span></span></span>
            <span class="r">${x.id !== st().session ? `<button class="btn btn-sm btn-ghost btn-danger" data-action="del-user" data-id="${x.id}" aria-label="Hapus ${esc(x.name)}">${ic('trash', 'ico-sm')}</button>` : '<span class="pill plain">Anda</span>'}</span></div>`).join('')}</div></section>`;
      }).join('')}`;
  }

  function classForm() {
    const gurus = st().users.filter(x => x.role === 'guru');
    openModal(`${modalHead('Tambah kelas')}
      <form class="modal-body form" data-form="add-class">
        <div class="field-row">
          <div class="field"><label for="c-name">Nama kelas</label><input class="input" id="c-name" name="name" required placeholder="Contoh: Kelas 7A"></div>
          <div class="field"><label for="c-subject">Mata pelajaran</label><input class="input" id="c-subject" name="subject" required placeholder="Contoh: Matematika"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="c-level">Jenjang</label><select class="select" id="c-level" name="level"><option>SD</option><option selected>SMP</option><option>SMA</option></select></div>
          <div class="field"><label for="c-teacher">Guru</label><select class="select" id="c-teacher" name="teacherId">${gurus.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select></div>
        </div>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Simpan kelas</button></div>
      </form>`);
  }
  function userForm() {
    const kids = st().users.filter(x => x.role === 'siswa');
    openModal(`${modalHead('Tambah pengguna')}
      <form class="modal-body form" data-form="add-user">
        <div class="field"><label for="u-name">Nama lengkap</label><input class="input" id="u-name" name="name" required placeholder="Contoh: Bu Rina Marlina"></div>
        <div class="field"><label for="u-role">Peran</label><select class="select" id="u-role" name="role" data-change="role-fields">
          <option value="siswa">Peserta didik</option><option value="guru">Guru</option><option value="ortu">Orang tua</option><option value="admin">Pengelola sekolah</option></select></div>
        <div class="field" data-for="siswa"><label for="u-class">Kelas</label><select class="select" id="u-class" name="classId">${st().classes.map(c => `<option value="${c.id}">${esc(c.name)} · ${c.level}</option>`).join('')}</select></div>
        <div class="field" data-for="ortu" hidden><label for="u-child">Nama anak</label><select class="select" id="u-child" name="childId">${kids.map(k => `<option value="${k.id}">${esc(k.name)}</option>`).join('')}</select></div>
        <div class="field" data-for="guru" hidden><label for="u-note">Keterangan</label><input class="input" id="u-note" name="note" placeholder="Contoh: Guru Matematika"></div>
        <div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">Batal</button><button class="btn btn-primary">Simpan pengguna</button></div>
      </form>`);
  }

  /* =========================================================
     Panduan singkat per peran
     ========================================================= */
  function helpModal() {
    const u = me();
    const sd = isSD(u);
    const steps = {
      guru: [
        ['Bagikan materi', 'Buka menu Materi, tekan "Tambah materi", tulis bacaan singkat beserta targetnya.'],
        ['Beri tugas atau kuis', 'Di menu Tugas & Kuis, atur tenggatnya. Siswa langsung mendapat pemberitahuan.'],
        ['Nilai di satu halaman', 'Menu Menilai menampilkan semua jawaban kelas. Isi nilai dan masukan tiga bagian.'],
        ['Lihat yang paling sering keliru', 'Laporan Kelas menunjukkan soal tersulit untuk dibahas saat tatap muka.'],
        ['Tidak perlu rekap ulang', 'Buku Nilai terisi sendiri dan bisa diunduh untuk arsip.']
      ],
      siswa: sd ? [
        ['Bacaanku', 'Tekan kotak hijau untuk membaca materi dari guru.'],
        ['Tugasku', 'Tulis jawabanmu, lalu tekan "Kirim ke guru".'],
        ['Kuisku', 'Pilih satu jawaban di setiap soal, lalu tekan "Selesai!".'],
        ['Nilaiku', 'Lihat bintangmu dan baca pesan dari guru.']
      ] : [
        ['Baca materi', 'Buka menu Materi. Tekan "Simpan" untuk membaca tanpa internet.'],
        ['Kumpulkan tugas', 'Buka tugas, tulis jawaban atau lampirkan berkas, lalu tekan "Kumpulkan".'],
        ['Kerjakan kuis', 'Jawabanmu tersimpan otomatis. Nilai langsung keluar setelah dikirim.'],
        ['Baca masukan guru', 'Di menu Nilai & Masukan, mulailah dari bagian "Langkah berikutnya".']
      ],
      ortu: [
        ['Lihat ringkasan', 'Halaman ini menampilkan rata-rata nilai, pekerjaan yang belum selesai, dan masukan guru.'],
        ['Dampingi di rumah', 'Bacakan bagian "langkah berikutnya" bersama anak.'],
        ['Pantau pemberitahuan', 'Tanda lonceng di atas memberi tahu saat ada nilai baru.']
      ],
      admin: [
        ['Atur kelas', 'Tambahkan kelas beserta jenjang dan gurunya di menu Kelas.'],
        ['Atur pengguna', 'Tambahkan guru, siswa, dan orang tua di menu Pengguna.'],
        ['Hubungkan orang tua', 'Saat menambah orang tua, pilih nama anaknya agar ringkasannya muncul.']
      ]
    }[u.role];
    openModal(`${modalHead('Panduan singkat', sd ? 'Cara memakai RUANGAJAR' : `Untuk ${roleName(u).toLowerCase()}`)}
      <div class="modal-body"><ol class="help-steps">${steps.map(([t, d]) => `<li><span><b>${t}</b>${d}</span></li>`).join('')}</ol>
      <p class="small muted" style="margin-top:14px">Setiap fitur penting bisa dicapai paling banyak dengan tiga kali klik.</p></div>`);
  }

  /* =========================================================
     Render utama
     ========================================================= */
  const VIEWS = {
    guru: { beranda: gBeranda, materi: gMateri, tugas: gTugas, menilai: gMenilai, nilai: gNilai, laporan: gLaporan },
    siswa: { beranda: sBeranda, materi: sMateri, tugas: sTugas, kuis: sKuis, nilai: sNilai },
    ortu: { beranda: oBeranda },
    admin: { beranda: aBeranda, kelas: aKelas, pengguna: aPengguna }
  };
  let lastPath = '';
  function render() {
    const u = me();
    const app = $('#app');
    document.body.className = '';
    if (!u) { app.innerHTML = viewLogin(); document.title = 'RUANGAJAR — Masuk'; return; }
    const r = route();
    const lvl = levelOf(u);
    document.body.classList.add('role-' + u.role);
    if (lvl) document.body.classList.add('lvl-' + lvl.toLowerCase());
    const views = VIEWS[u.role];
    let fn = views[r.page] || views.beranda;
    /* Revisi 2: siswa yang belum dimasukkan ke kelas mendapat pesan, bukan halaman kosong */
    if (u.role === 'siswa' && !q.cls(u.classId)) fn = () => pageHead({ title: 'Belum ada kelas' }) + empty('Akunmu belum masuk ke kelas mana pun', 'Minta pengelola sekolah memasukkanmu ke kelas lewat menu Pengguna.');
    if (!views[r.page]) r.page = 'beranda';
    app.innerHTML = shell(u, r, fn(u, r.id));
    const label = (navFor(u).find(n => n[0] === r.page) || [])[1];
    document.title = `${label ? label + ' · ' : ''}RUANGAJAR`;
    const path = location.hash;
    if (path !== lastPath) { window.scrollTo(0, 0); lastPath = path; }
  }

  /* =========================================================
     Aksi (klik)
     ========================================================= */
  const actions = {
    login(el) { st().session = el.dataset.id; save(); location.hash = '#/beranda'; render(); },
    logout() { askConfirm('Keluar dari RUANGAJAR?', 'Anda bisa masuk lagi kapan saja.', 'Ya, keluar', () => { st().session = null; save(); location.hash = ''; render(); }); },
    help: helpModal,
    'close-modal': closeModal,
    'close-modal-back'(el, e) { if (e.target === el) closeModal(); },
    'confirm-yes'() { const fn = pendingConfirm; pendingConfirm = null; closeModal(); if (fn) fn(); },
    notif(el) {
      const panel = $('#notif-panel');
      const open = panel.hidden;
      panel.hidden = !open;
      el.setAttribute('aria-expanded', String(open));
      if (!open) return;
      const u = me();
      const list = myNotifs(u).slice(0, 20);
      panel.innerHTML = `<header><h3>Pemberitahuan</h3>${list.some(n => !n.read) ? '<button class="btn btn-sm btn-ghost" data-action="notif-read">Tandai sudah dibaca</button>' : ''}</header>
        <div class="notif-list">${list.length ? list.map(n => `<a class="notif-item ${n.read ? '' : 'unread'}" href="${esc(n.link)}" data-action="notif-open" data-id="${n.id}"><span class="d"></span><span>${esc(n.text)}<time>${ago(n.at)}</time></span></a>`).join('') : '<div class="notif-empty">Belum ada pemberitahuan.</div>'}</div>`;
    },
    'notif-read'() { const u = me(); st().notifications.forEach(n => { if (n.userId === u.id) n.read = true; }); save(); render(); },
    'notif-open'(el) { const n = st().notifications.find(x => x.id === el.dataset.id); if (n) { n.read = true; save(); } setTimeout(render, 0); },

    'new-material': materialForm,
    'open-material'(el) { openMaterial(el.dataset.id); },
    'download-material'(el) {
      const m = q.material(el.dataset.id);
      const c = q.cls(m.classId);
      const text = `${m.title}\n${c.name} · ${c.subject}\n\n${m.target ? 'Target belajar: ' + m.target + '\n\n' : ''}${m.body}\n\n— Disimpan dari RUANGAJAR, ${fmtDate(new Date().toISOString())}`;
      download(`${slug(m.title)}.txt`, text);
      const u = me();
      if (u.role === 'siswa' && !q.isRead(m.id, u.id)) { (st().reads[m.id] = st().reads[m.id] || []).push(u.id); save(); }
      toast('Materi tersimpan di perangkatmu. Bisa dibaca tanpa internet.');
    },
    'download-attachment'(el) {
      const m = q.material(el.dataset.id);
      if (m.attachment && m.attachment.data) {
        fetch(m.attachment.data).then(r => r.blob()).then(b => download(m.attachment.name, b));
      } else toast('Berkas ini terlalu besar untuk disimpan di versi percontohan.');
    },
    'delete-material'(el) {
      const m = q.material(el.dataset.id);
      askConfirm('Hapus materi ini?', `"${esc(m.title)}" akan hilang dari halaman siswa.`, 'Hapus materi', () => {
        st().materials = st().materials.filter(x => x.id !== m.id); delete st().reads[m.id]; save(); render(); toast('Materi dihapus.');
      }, true);
    },
    'new-tugas': tugasForm,
    'new-kuis': kuisForm,
    'qb-add'() { $('#qb').insertAdjacentHTML('beforeend', qbItem()); const last = $$('#qb .qb-item').pop(); $('input[name=q]', last).focus(); },
    'qb-remove'(el) { if ($$('#qb .qb-item').length > 1) el.closest('.qb-item').remove(); else toast('Kuis perlu minimal satu soal.'); },
    'delete-item'(el) {
      const it = q.item(el.dataset.id);
      askConfirm(`Hapus ${it.kind} ini?`, `"${esc(it.title)}" beserta semua jawaban dan nilainya akan dihapus dari buku nilai.`, 'Hapus', () => {
        const s = st();
        s.items = s.items.filter(x => x.id !== it.id);
        s.submissions = s.submissions.filter(x => x.itemId !== it.id);
        s.attempts = s.attempts.filter(x => x.quizId !== it.id);
        save(); render(); toast('Sudah dihapus.');
      }, true);
    },
    remind(el) {
      const stu = q.user(el.dataset.student); const it = q.item(el.dataset.item); const u = me();
      notify([stu.id], `${shortName(u)} mengingatkan: "${it.title}" belum kamu kerjakan. Masih bisa dikirim, ya.`, `#/${it.kind === 'kuis' ? 'kuis' : 'tugas'}/${it.id}`);
      notify(q.parentsOf(stu.id).map(p => p.id), `${firstName(stu)} belum mengerjakan "${it.title}". Mohon bantu ingatkan di rumah.`, '#/beranda');
      save(); toast(`Pengingat terkirim ke ${esc(firstName(stu))}${q.parentsOf(stu.id).length ? ' dan orang tuanya' : ''}.`);
    },
    'export-grades'() { exportGrades(teacherClass(me())); },
    'export-mine'() { const u = me(); exportGrades(q.cls(u.classId), u.id); },
    'reset-demo'() { askConfirm('Kembalikan data contoh?', 'Semua perubahan selama uji coba akan dihapus dan diganti data contoh awal.', 'Ya, kembalikan', () => { RA.store.reset(); render(); toast('Data contoh sudah dikembalikan.'); }, true); },
    'new-class': classForm,
    'new-user': userForm,
    'del-class'(el) {
      const c = q.cls(el.dataset.id);
      if (q.studentsOf(c.id).length) { toast('Pindahkan atau hapus dulu siswa di kelas ini.'); return; }
      askConfirm('Hapus kelas?', `${esc(c.name)} akan dihapus.`, 'Hapus kelas', () => {
        const s = st(); s.classes = s.classes.filter(x => x.id !== c.id);
        const ids = s.items.filter(i => i.classId === c.id).map(i => i.id);
        s.items = s.items.filter(i => i.classId !== c.id); s.materials = s.materials.filter(m => m.classId !== c.id);
        s.submissions = s.submissions.filter(x => !ids.includes(x.itemId)); s.attempts = s.attempts.filter(x => !ids.includes(x.quizId));
        save(); render(); toast('Kelas dihapus.');
      }, true);
    },
    'del-user'(el) {
      const x = q.user(el.dataset.id);
      askConfirm('Hapus pengguna?', `Akun ${esc(x.name)} akan dihapus beserta pekerjaannya.`, 'Hapus akun', () => {
        const s = st();
        s.users = s.users.filter(y => y.id !== x.id);
        s.submissions = s.submissions.filter(y => y.studentId !== x.id);
        s.attempts = s.attempts.filter(y => y.studentId !== x.id);
        s.notifications = s.notifications.filter(y => y.userId !== x.id);
        s.classes.forEach(c => { if (c.teacherId === x.id) c.teacherId = null; });
        save(); render(); toast('Pengguna dihapus.');
      }, true);
    }
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (el && actions[el.dataset.action]) {
      if (el.tagName !== 'A' || el.dataset.action !== 'notif-open') { if (el.tagName === 'A' || el.tagName === 'BUTTON') e.preventDefault(); }
      actions[el.dataset.action](el, e);
    }
    const panel = $('#notif-panel');
    if (panel && !panel.hidden && !e.target.closest('.notif-wrap')) panel.hidden = true;
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if ($('#modal-root').innerHTML) closeModal(); const p = $('#notif-panel'); if (p) p.hidden = true; }
  });

  /* =========================================================
     Perubahan input
     ========================================================= */
  document.addEventListener('change', e => {
    const el = e.target;
    const k = el.dataset.change;
    if (!k) return;
    if (k === 'switch-class') { st().ui.activeClass[me().id] = el.value; save(); go('#/' + route().page); }
    if (k === 'only-pending') { st().ui.onlyPending = el.checked; save(); render(); }
    if (k === 'file-name') { const f = el.files[0]; const t = document.getElementById(el.dataset.target); if (t) t.textContent = f ? `${f.name} (${Math.max(1, Math.round(f.size / 1024))} KB)` : 'Pilih berkas'; }
    if (k === 'role-fields') { $$('[data-for]', el.form).forEach(f => { f.hidden = f.dataset.for !== el.value; }); }
    if (k === 'quiz-draft') {
      const form = el.form; const u = me(); const it = q.item(form.dataset.item);
      const answers = {};
      it.questions.forEach((_, i) => { const c = form.querySelector(`input[name="qa-${i}"]:checked`); if (c) answers[i] = Number(c.value); });
      const at = new Date().toISOString();
      const ok = writeDraft(it.id, u.id, { answers, at });
      $('#draft-state').innerHTML = `${ic('check', 'ico-sm')}<span>${Object.keys(answers).length} dari ${it.questions.length} dijawab · ${ok ? 'tersimpan ' + fmtTime(at) : 'belum bisa disimpan di perangkat ini'}</span>`;
    }
  });

  /* =========================================================
     Formulir
     ========================================================= */
  function readFile(file, limit = 700 * 1024) {
    return new Promise(res => {
      if (!file) return res(null);
      if (file.size > limit) return res({ name: file.name, size: file.size, data: null });
      const r = new FileReader();
      r.onload = () => res({ name: file.name, size: file.size, data: r.result });
      r.onerror = () => res({ name: file.name, size: file.size, data: null });
      r.readAsDataURL(file);
    });
  }

  const forms = {
    async material(f) {
      const u = me(); const c = teacherClass(u); const d = new FormData(f);
      const att = await readFile(d.get('file') && d.get('file').size ? d.get('file') : null);
      const m = { id: uid('m'), classId: c.id, createdAt: new Date().toISOString(), title: d.get('title').trim(), target: d.get('target').trim(), body: d.get('body').trim() };
      if (att) m.attachment = att;
      st().materials.push(m);
      notify(q.studentsOf(c.id).map(s => s.id), `Materi baru dari ${shortName(u)}: ${m.title}.`, '#/materi');
      if (!save() && att && att.data) { m.attachment.data = null; save(); }
      closeModal(); render(); toast(`Materi dibagikan. ${q.studentsOf(c.id).length} siswa sudah diberi tahu.`);
    },
    tugas(f) {
      const u = me(); const c = teacherClass(u); const d = new FormData(f);
      /* Revisi 3: tenggat tidak boleh sudah lewat */
      if (new Date(d.get('due')).getTime() <= Date.now()) { toast('Tenggat sudah lewat. Pilih tanggal dan jam yang akan datang.'); return; }
      const it = { id: uid('t'), classId: c.id, kind: 'tugas', createdAt: new Date().toISOString(), due: new Date(d.get('due')).toISOString(), title: d.get('title').trim(), target: d.get('target').trim(), instructions: d.get('instructions').trim(), group: !!d.get('group') };
      st().items.push(it);
      notify(q.studentsOf(c.id).map(s => s.id), `Tugas baru dari ${shortName(u)}: ${it.title}. Tenggat ${fmtShort(it.due)}.`, `#/tugas/${it.id}`);
      save(); closeModal(); render(); toast('Tugas dibagikan. Siswa sudah diberi tahu.');
    },
    kuis(f) {
      const u = me(); const c = teacherClass(u); const d = new FormData(f);
      if (new Date(d.get('due')).getTime() <= Date.now()) { toast('Tenggat sudah lewat. Pilih tanggal dan jam yang akan datang.'); return; }
      const questions = $$('.qb-item', f).map(b => ({
        q: $('input[name=q]', b).value.trim(),
        options: $$('input[name=opt]', b).map(i => i.value.trim()),
        answer: Number(($('input[type=radio]:checked', b) || { value: 0 }).value)
      }));
      const it = { id: uid('q'), classId: c.id, kind: 'kuis', createdAt: new Date().toISOString(), due: new Date(d.get('due')).toISOString(), title: d.get('title').trim(), questions };
      st().items.push(it);
      notify(q.studentsOf(c.id).map(s => s.id), `Kuis baru: ${it.title} (${questions.length} soal). Tenggat ${fmtShort(it.due)}.`, `#/kuis/${it.id}`);
      save(); closeModal(); render(); toast(`Kuis berisi ${questions.length} soal sudah dibagikan.`);
    },
    grade(f) {
      const sub = st().submissions.find(s => s.id === f.dataset.sub);
      const d = new FormData(f);
      const score = Math.max(0, Math.min(100, Math.round(Number(d.get('score')))));
      const fb = { good: d.get('good').trim(), wrong: d.get('wrong').trim(), next: d.get('next').trim() };
      if (!fb.good && !fb.wrong && !fb.next) { toast('Tulis minimal satu bagian masukan, supaya siswa tahu apa yang harus diperbaiki.'); return; }
      const first = sub.score == null;
      sub.score = score; sub.feedback = fb; sub.gradedAt = new Date().toISOString();
      const stu = q.user(sub.studentId); const it = q.item(sub.itemId); const u = me();
      notify([stu.id], `Nilai "${it.title}" sudah keluar${first ? '' : ' (diperbarui)'}: ${score}. Baca masukan dari ${shortName(u)}.`, `#/tugas/${it.id}`);
      notify(q.parentsOf(stu.id).map(p => p.id), `${firstName(stu)} mendapat nilai ${score} untuk "${it.title}".`, '#/beranda');
      save(); render();
      toast(`Tersimpan. Nilai ${esc(firstName(stu))} sudah masuk buku nilai dan terlihat oleh ${esc(firstName(stu))}${q.parentsOf(stu.id).length ? ' serta orang tuanya' : ''}.`);
    },
    async 'submit-tugas'(f) {
      const u = me(); const it = q.item(f.dataset.item); const d = new FormData(f);
      const text = (d.get('text') || '').trim();
      const file = d.get('file');
      const hasFile = file && file.size;
      let sub = q.sub(it.id, u.id);
      if (!text && !hasFile && !(sub && sub.fileName)) { toast('Tulis jawaban atau lampirkan berkas dulu, ya.'); return; }
      const now = new Date().toISOString();
      if (!sub) { sub = { id: uid('sb'), itemId: it.id, studentId: u.id, score: null, feedback: null, gradedAt: null, fileName: '' }; st().submissions.push(sub); }
      sub.text = text; sub.submittedAt = now; sub.members = (d.get('members') || '').trim();
      if (hasFile) sub.fileName = file.name;
      const late = now > it.due;
      const c = q.cls(u.classId);
      notify([c.teacherId], `${u.name} mengumpulkan "${it.title}"${late ? ' (lewat tenggat)' : ''}.`, `#/menilai/${it.id}`);
      save(); render();
      toast(isSD(u) ? 'Terkirim! Gurumu akan segera membacanya.' : `Terkirim pukul ${fmtTime(now)}${late ? ' (lewat tenggat)' : ''}. Gurumu sudah diberi tahu.`);
    },
    quiz(f) {
      const u = me(); const it = q.item(f.dataset.item);
      const answers = it.questions.map((_, i) => { const c = f.querySelector(`input[name="qa-${i}"]:checked`); return c ? Number(c.value) : null; });
      const blank = answers.filter(a => a == null).length;
      const submit = () => {
        const correct = answers.filter((a, i) => a === it.questions[i].answer).length;
        const score = Math.round((correct / it.questions.length) * 100);
        st().attempts.push({ id: uid('at'), quizId: it.id, studentId: u.id, answers, score, submittedAt: new Date().toISOString() });
        clearDraft(it.id, u.id);
        const c = q.cls(u.classId);
        notify([c.teacherId], `${u.name} selesai mengerjakan "${it.title}" dengan nilai ${score}.`, `#/laporan/${it.id}`);
        notify(q.parentsOf(u.id).map(p => p.id), `${firstName(u)} mendapat nilai ${score} untuk "${it.title}".`, '#/beranda');
        save(); render(); toast(isSD(u) ? `Selesai! Kamu menjawab benar ${correct} soal.` : `Kuis terkirim. Nilaimu ${score}.`);
      };
      if (blank) askConfirm('Masih ada soal yang kosong', `${blank} soal belum dijawab. Soal kosong dihitung salah. Tetap kirim sekarang?`, 'Tetap kirim', submit);
      else submit();
    },
    'add-class'(f) {
      const d = new FormData(f);
      st().classes.push({ id: uid('k'), name: d.get('name').trim(), subject: d.get('subject').trim(), level: d.get('level'), teacherId: d.get('teacherId') || null });
      save(); closeModal(); render(); toast('Kelas ditambahkan.');
    },
    'add-user'(f) {
      const d = new FormData(f); const role = d.get('role');
      const u = { id: uid(role === 'siswa' ? 's' : role === 'ortu' ? 'o' : 'u'), name: d.get('name').trim(), role };
      if (role === 'siswa') u.classId = d.get('classId');
      if (role === 'ortu') u.childId = d.get('childId');
      if (role === 'guru' || role === 'admin') u.note = (d.get('note') || '').trim() || (role === 'guru' ? 'Guru' : 'Pengelola sekolah');
      st().users.push(u); save(); closeModal(); render(); toast(`Akun ${esc(u.name)} sudah dibuat.`);
    }
  };

  document.addEventListener('submit', e => {
    const f = e.target.closest('[data-form]');
    if (!f) return;
    e.preventDefault();
    const fn = forms[f.dataset.form];
    if (fn) fn(f);
  });

  /* ---------- Sinyal internet ---------- */
  function syncOnline() { const b = $('#offline'); if (b) b.hidden = navigator.onLine; }
  window.addEventListener('online', () => { syncOnline(); toast('Sinyal kembali. Semua aman.'); });
  window.addEventListener('offline', syncOnline);

  window.addEventListener('hashchange', () => { closeModal(); render(); });

  RA.store.load();
  render();
})();
