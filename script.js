const COURSES = [
  // Semester 1
  {s:1, code:"MKKI4201", name:"Pengantar Statistika", sks:3},
  {s:1, code:"MKWN4108", name:"Bahasa Indonesia", sks:2},
  {s:1, code:"STDA4101", name:"Pengantar Sains Data", sks:3},
  {s:1, code:"STMA4111", name:"Kalkulus Diferensial", sks:3},
  {s:1, code:"STSI4101", name:"Pengantar Sistem Informasi", sks:3},
  {s:1, code:"STSI4304", name:"Dasar Infrastruktur TI", sks:2},

  // Semester 2
  {s:2, code:"STIK4122", name:"Pengantar Probabilitas", sks:3},
  {s:2, code:"STIK4234", name:"Model Linear Terapan", sks:3, oldGrade:"D"},
  {s:2, code:"STMA4113", name:"Aljabar Linear Elementer", sks:2, oldGrade:"A"},
  {s:2, code:"STSI4104", name:"Struktur Data", sks:3, oldGrade:"A"},
  {s:2, code:"STSI4105", name:"Basis Data", sks:3, oldGrade:"A"},
  {s:2, code:"STSI4106", name:"Logika Informatika", sks:3, oldGrade:"A"},

  // Semester 3
  {s:3, code:"MKWN4110", name:"Pancasila", sks:2},
  {s:3, code:"SPMT4216", name:"Algoritma dan Pemrograman", sks:3},
  {s:3, code:"STDA4201", name:"Basis Data NoSQL", sks:3},
  {s:3, code:"STDA4202", name:"Analitik Big Data", sks:3},
  {s:3, code:"STDA4203", name:"Pengantar Kecerdasan Artifisial", sks:3},
  {s:3, code:"STIK4235", name:"Pengantar Statistika Matematis", sks:3},
  {s:3, code:"STSI4307", name:"Data Mining", sks:3},

  // Semester 4
  {s:4, code:"MKDI4201", name:"Bahasa Inggris", sks:3},
  {s:4, code:"MKDI4203", name:"Kewirausahaan di Era Digital", sks:3},
  {s:4, code:"MKWN4101", name:"Pendidikan Agama Islam", sks:3},
  {s:4, code:"MKWN4109", name:"Pendidikan Kewarganegaraan", sks:2},
  {s:4, code:"STDA4204", name:"Machine Learning", sks:3},
  {s:4, code:"STIK4243", name:"Analisis Runtun Waktu", sks:3},
  {s:4, code:"STIK4246", name:"Metode Statistika Multivariat", sks:3},

  // Semester 5
  {s:5, code:"ECON4101", name:"Pengantar Ekonomi Makro", sks:3},
  {s:5, code:"EMBS4433", name:"E-Business", sks:3},
  {s:5, code:"STAG4121", name:"Manajemen Agribisnis", sks:3},
  {s:5, code:"STIK4112", name:"Pengumpulan dan Penyajian Data", sks:3},
  {s:5, code:"STIK4352", name:"Inferensi Bayesian", sks:3},
  {s:5, code:"STSI4207", name:"Sistem Informasi Manajemen", sks:3},
  {s:5, code:"STSI4406", name:"Manajemen Proyek Sistem Informasi", sks:2},

  // Semester 6
  {s:6, code:"FSAB4301", name:"Manajemen Risiko Dan Asuransi", sks:3},
  {s:6, code:"MKKI4301", name:"Pemberdayaan Masyarakat (Matakuliah Pilihan)", sks:3},
  {s:6, code:"STDA4205", name:"Metodologi Penelitian", sks:3},
  {s:6, code:"STDA4301", name:"Solusi TI untuk Masyarakat (Matakuliah Pilihan)", sks:3},
  {s:6, code:"STDA4302", name:"Platform Sains Data dan Kecerdasan Artifisial", sks:2},
  {s:6, code:"STPL4211", name:"Sistem Informasi Perencanaan", sks:3},
  {s:6, code:"STSI4202", name:"Rekayasa Perangkat Lunak", sks:3},
  {s:6, code:"STSI4404", name:"Keamanan Jaringan", sks:3},

  // Semester 7
  {s:7, code:"MKDI4202", name:"Belajar di Era Digital", sks:3},
  {s:7, code:"STDA4401", name:"Pengantar Teknologi Blockchain", sks:3},
  {s:7, code:"STDA4402", name:"Pengantar Teknologi Cloud", sks:2},
  {s:7, code:"STDA4440", name:"Capstone Project (Matakuliah Pilihan)", sks:6},
  {s:7, code:"STSI4204", name:"Analisis dan Visualisasi Data", sks:2},

  // Semester 8
  {s:8, code:"STDA4403", name:"Kecerdasan Bisnis", sks:3},
  {s:8, code:"STDA4404", name:"Deep Learning", sks:3},
  {s:8, code:"STDA4405", name:"Pengantar Teknologi Web3", sks:3},
  {s:8, code:"STMA4223", name:"Metode Numerik", sks:4},
  {s:8, code:"STSI4301", name:"Sistem Pendukung Keputusan", sks:3}
];

const KEY = "materikuliahku-v1";
const DB_NAME = "materikuliahku-files";
let state = JSON.parse(localStorage.getItem(KEY) || "{}");
let currentView = "dashboard";
let currentSemester = 0;

function saveState() {
  localStorage.setItem(KEY, JSON.stringify(state));
}
function getCourse(code) {
  return COURSES.find(c => c.code === code);
}
function courseData(code) {
  state[code] ||= {grades:{diskusi:[], tugas:[], presentasi:[], uas:""}, notes:[], concepts:[], progress:0};
  return state[code];
}
function sum(arr) { return arr.reduce((a,b)=>a+(Number(b)||0),0); }
function avg(arr) { return arr.length ? sum(arr)/arr.length : 0; }
function gradeInfo(code) {
  const d = courseData(code);
  const diskusi = sum(d.grades.diskusi);
  const tugas = sum(d.grades.tugas);
  const presentasi = sum(d.grades.presentasi);
  const uas = Number(d.grades.uas) || 0;
  const total = diskusi + tugas + presentasi + uas;
  return {diskusi,tugas,presentasi,uas,total};
}
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),2200);
}

function render() {
  const app = document.getElementById("app");
  const titles = {dashboard:"Dashboard",courses:"Mata Kuliah",grades:"Nilai Akademik",notes:"Catatan & Konsep",files:"File PDF"};
  document.getElementById("pageTitle").textContent = titles[currentView] || "Dashboard";
  if(currentView==="dashboard") app.innerHTML = dashboardHTML();
  if(currentView==="courses") app.innerHTML = coursesHTML();
  if(currentView==="grades") app.innerHTML = gradesHTML();
  if(currentView==="notes") app.innerHTML = notesHTML();
  if(currentView==="files") app.innerHTML = filesHTML();
  bindViewEvents();
}

function dashboardHTML() {
  const total = COURSES.length;
  const passed = COURSES.filter(c=>c.oldGrade).length;
  const current = COURSES.filter(c=>c.s>=3 && c.s<=8).length;
  const notes = COURSES.reduce((n,c)=>n+courseData(c.code).notes.length,0);
  return `
    <div class="hero">
      <div class="eyebrow">S1 SAINS DATA</div>
      <h2>Ruang kerja kuliah yang terstruktur.</h2>
      <p>Simpan materi, catatan konsep, PDF, dan nilai dalam satu dashboard. Data nilai dan file yang Anda masukkan disimpan lokal di browser ini.</p>
    </div>
    <div class="stats">
      <div class="stat"><div class="label">Total Mata Kuliah</div><div class="value">${total}</div><div class="sub">Semester 1–8</div></div>
      <div class="stat"><div class="label">Sudah Ada Nilai LKAM</div><div class="value">${passed}</div><div class="sub">Data awal semester 1–2</div></div>
      <div class="stat"><div class="label">Rencana Mata Kuliah</div><div class="value">${current}</div><div class="sub">Semester 3–8</div></div>
      <div class="stat"><div class="label">Catatan Tersimpan</div><div class="value">${notes}</div><div class="sub">Konsep pribadi</div></div>
    </div>
    <div class="section-head"><div><h2>Peta Perkuliahan</h2><p>Ringkasan struktur kurikulum dari LKAM yang Anda upload.</p></div></div>
    <div class="semester-grid">
      ${[1,2,3,4,5,6,7,8].map(s=>semesterCard(s)).join("")}
    </div>
  `;
}
function semesterCard(s) {
  const cs = COURSES.filter(c=>c.s===s);
  return `<div class="semester-card">
    <div class="top"><div><strong>Semester ${s}</strong><div class="muted" style="font-size:11px;margin-top:4px">${cs.length} mata kuliah</div></div><span class="badge">${sum(cs.map(c=>c.sks))} SKS</span></div>
    <div class="course-list">${cs.slice(0,5).map(c=>`<div class="course-row"><span>${c.code} — ${c.name}</span><span class="grade-chip">${c.oldGrade||"—"}</span></div>`).join("")}</div>
    ${cs.length>5?`<div class="muted" style="font-size:10px;margin-top:8px">+ ${cs.length-5} mata kuliah lainnya</div>`:""}
  </div>`;
}

function coursesHTML() {
  const sems = [0,1,2,3,4,5,6,7,8];
  const filtered = COURSES.filter(c => currentSemester===0 || c.s===currentSemester);
  return `
    <div class="section-head"><div><h2>Semua Mata Kuliah</h2><p>Buka satu mata kuliah untuk materi, konsep, catatan, PDF, dan nilai.</p></div></div>
    <div class="filters">${sems.map(s=>`<button class="filter-btn ${currentSemester===s?"active":""}" data-sem="${s}">${s===0?"Semua":"Semester "+s}</button>`).join("")}</div>
    <div class="course-grid">${filtered.map(c=>courseCard(c)).join("")}</div>
  `;
}
function courseCard(c) {
  const d=courseData(c.code), g=gradeInfo(c.code);
  return `<article class="course-card">
    <div class="course-code">${c.code} · ${c.sks} SKS</div>
    <h3 class="course-name">${c.name}</h3>
    <div class="course-meta">Semester ${c.s} · Nilai LKAM: ${c.oldGrade||"Belum ada"}</div>
    <div class="progress"><span style="width:${Math.min(100,Number(d.progress)||0)}%"></span></div>
    <div class="course-meta">Progress materi: ${Number(d.progress)||0}% · Total komponen nilai: ${g.total}</div>
    <div class="card-actions"><button class="btn btn-primary detail-btn" data-code="${c.code}">Buka</button><button class="btn btn-soft grade-btn" data-code="${c.code}">Nilai</button></div>
  </article>`;
}

function gradesHTML() {
  return `
    <div class="form-card">
      <div class="section-head" style="margin:0 0 12px"><div><h2>Input Nilai</h2><p>Masukkan nilai satu per satu. Total di bawah menjumlahkan seluruh Diskusi + Tugas + Presentasi + UAS.</p></div></div>
      <div class="kpi-row">
        <span class="kpi">Diskusi → dijumlahkan</span><span class="kpi">Tugas → dijumlahkan</span><span class="kpi">Presentasi → dijumlahkan</span><span class="kpi">UAS → 1 nilai</span>
      </div>
    </div>
    <div class="grade-table-wrap">
      <table class="grade-table"><thead><tr>
        <th>Semester</th><th>Mata Kuliah</th><th>Diskusi 1</th><th>Diskusi 2</th><th>Diskusi 3</th><th>Tugas 1</th><th>Tugas 2</th><th>Presentasi</th><th>UAS</th><th>Total</th>
      </tr></thead><tbody>
      ${COURSES.map(c=>{
        const d=courseData(c.code), g=gradeInfo(c.code);
        const cell=(type,i)=>`<input class="grade-input" type="number" min="0" max="100" value="${d.grades[type][i]??""}" data-code="${c.code}" data-type="${type}" data-index="${i}">`;
        return `<tr><td>S${c.s}</td><td><strong>${c.name}</strong><br><span class="muted">${c.code}</span></td>
          <td>${cell("diskusi",0)}</td><td>${cell("diskusi",1)}</td><td>${cell("diskusi",2)}</td>
          <td>${cell("tugas",0)}</td><td>${cell("tugas",1)}</td><td>${cell("presentasi",0)}</td>
          <td><input class="grade-input" type="number" min="0" max="100" value="${d.grades.uas??""}" data-code="${c.code}" data-type="uas"></td>
          <td class="total-cell">${g.total}</td></tr>`;
      }).join("")}</tbody></table>
    </div>
  `;
}

function notesHTML() {
  const items = [];
  COURSES.forEach(c=>courseData(c.code).notes.forEach((n,i)=>items.push({c,n,i})));
  return `
    <div class="form-card">
      <div class="section-head" style="margin:0 0 12px"><div><h2>Tambah Catatan / Konsep</h2><p>Simpan ringkasan definisi, rumus, analogi, contoh, atau poin UAS.</p></div></div>
      <div class="form-grid">
        <div class="form-group"><label>Mata Kuliah</label><select id="noteCourse">${COURSES.map(c=>`<option value="${c.code}">${c.code} — ${c.name}</option>`).join("")}</select></div>
        <div class="form-group"><label>Judul</label><input id="noteTitle" placeholder="Contoh: OLS dan Residual"></div>
        <div class="form-group full"><label>Isi Catatan</label><textarea id="noteBody" placeholder="Tulis konsep dengan bahasa sendiri..."></textarea></div>
        <div class="form-group full"><button class="btn btn-primary" id="saveNote">Simpan Catatan</button></div>
      </div>
    </div>
    ${items.length?`<div class="note-grid">${items.map(x=>`<article class="note-card"><div class="eyebrow">${x.c.code}</div><h3>${x.n.title}</h3><p>${escapeHTML(x.n.body)}</p><button class="btn btn-danger delete-note" data-code="${x.c.code}" data-index="${x.i}">Hapus</button></article>`).join("")}</div>`:`<div class="empty">Belum ada catatan. Tambahkan catatan pertama di form di atas.</div>`}
  `;
}

function filesHTML() {
  return `
    <div class="form-card">
      <div class="section-head" style="margin:0 0 12px"><div><h2>Upload PDF per Mata Kuliah</h2><p>File disimpan di browser menggunakan IndexedDB. Tidak dikirim ke server pada versi ini.</p></div></div>
      <div class="form-grid">
        <div class="form-group"><label>Mata Kuliah</label><select id="fileCourse">${COURSES.map(c=>`<option value="${c.code}">${c.code} — ${c.name}</option>`).join("")}</select></div>
        <div class="form-group"><label>Pilih PDF</label><input id="pdfInput" type="file" accept="application/pdf,.pdf"></div>
        <div class="form-group full"><button class="btn btn-primary" id="uploadPdf">Simpan PDF</button></div>
      </div>
    </div>
    <div id="fileList" class="file-grid"><div class="empty">Memuat file...</div></div>
  `;
}

function detailModal(code) {
  const c=getCourse(code), d=courseData(code), g=gradeInfo(code);
  document.getElementById("modalCourseTitle").textContent = c.name;
  document.getElementById("modalCourseBody").innerHTML = `
    <div class="kpi-row" style="margin-bottom:16px">
      <span class="kpi">${c.code}</span><span class="kpi">${c.s} SKS</span><span class="kpi">Progress ${d.progress||0}%</span><span class="kpi">Total nilai ${g.total}</span>
    </div>
    <div class="course-detail-grid">
      <div>
        <div class="form-card">
          <h3>Konsep Penting</h3>
          <div id="conceptList">${d.concepts.length?d.concepts.map((x,i)=>`<div class="concept"><strong>${escapeHTML(x.title)}</strong><p>${escapeHTML(x.body)}</p><button class="btn btn-danger delete-concept" data-code="${c.code}" data-index="${i}">Hapus</button></div>`).join(""):`<div class="empty">Belum ada konsep.</div>`}</div>
          <div class="form-grid">
            <div class="form-group"><label>Judul Konsep</label><input id="conceptTitle" placeholder="Misalnya: Normalisasi"></div>
            <div class="form-group"><label>Progress (%)</label><input id="progressInput" type="number" min="0" max="100" value="${d.progress||0}"></div>
            <div class="form-group full"><label>Penjelasan sederhana</label><textarea id="conceptBody" placeholder="Definisi sederhana, analogi, rumus, hubungan dengan konsep lain..."></textarea></div>
            <div class="form-group full"><button class="btn btn-primary" id="addConcept">Tambah Konsep</button></div>
          </div>
        </div>
      </div>
      <div>
        <div class="form-card">
          <h3>Ringkasan Nilai</h3>
          <div class="course-list">
            <div class="course-row"><span>Jumlah Diskusi</span><strong>${g.diskusi}</strong></div>
            <div class="course-row"><span>Jumlah Tugas</span><strong>${g.tugas}</strong></div>
            <div class="course-row"><span>Presentasi</span><strong>${g.presentasi}</strong></div>
            <div class="course-row"><span>UAS</span><strong>${g.uas}</strong></div>
            <div class="course-row"><span>Total</span><strong class="grade-chip">${g.total}</strong></div>
          </div>
        </div>
        <div class="form-card"><h3>Catatan</h3><p class="muted">Gunakan menu Catatan & Konsep untuk menyimpan ringkasan per mata kuliah.</p><button class="btn btn-soft" id="goNotes">Buka Catatan</button></div>
      </div>
    </div>
  `;
  document.getElementById("courseModal").classList.remove("hidden");
  document.getElementById("addConcept").onclick = ()=>{
    const title=document.getElementById("conceptTitle").value.trim();
    const body=document.getElementById("conceptBody").value.trim();
    if(!title||!body) return toast("Judul dan isi konsep wajib diisi.");
    d.concepts.push({title,body});
    d.progress=Math.max(0,Math.min(100,Number(document.getElementById("progressInput").value)||0));
    saveState(); detailModal(code); render(); toast("Konsep disimpan.");
  };
  document.querySelectorAll(".delete-concept").forEach(btn=>btn.onclick=()=>{
    d.concepts.splice(Number(btn.dataset.index),1); saveState(); detailModal(code); render();
  });
  document.getElementById("goNotes").onclick=()=>{closeModal(); currentView="notes"; render();};
}

function closeModal(){document.getElementById("courseModal").classList.add("hidden");}

function bindViewEvents() {
  document.querySelectorAll(".filter-btn").forEach(b=>b.onclick=()=>{currentSemester=Number(b.dataset.sem);render();});
  document.querySelectorAll(".detail-btn").forEach(b=>b.onclick=()=>detailModal(b.dataset.code));
  document.querySelectorAll(".grade-btn").forEach(b=>b.onclick=()=>{currentView="grades";render(); setTimeout(()=>document.querySelector(`[data-code="${CSS.escape(b.dataset.code)}"]`)?.focus(),0);});
  document.querySelectorAll(".grade-input").forEach(inp=>inp.onchange=()=>{
    const d=courseData(inp.dataset.code), type=inp.dataset.type, i=Number(inp.dataset.index);
    if(type==="uas") d.grades.uas=inp.value;
    else d.grades[type][i]=inp.value;
    saveState(); render(); toast("Nilai disimpan.");
  });
  const saveNote=document.getElementById("saveNote");
  if(saveNote) saveNote.onclick=()=>{
    const code=document.getElementById("noteCourse").value, title=document.getElementById("noteTitle").value.trim(), body=document.getElementById("noteBody").value.trim();
    if(!title||!body) return toast("Judul dan isi catatan wajib diisi.");
    courseData(code).notes.push({title,body}); saveState(); render(); toast("Catatan disimpan.");
  };
  document.querySelectorAll(".delete-note").forEach(b=>b.onclick=()=>{
    courseData(b.dataset.code).notes.splice(Number(b.dataset.index),1); saveState(); render(); toast("Catatan dihapus.");
  });
  const upload=document.getElementById("uploadPdf");
  if(upload) upload.onclick=async()=>{
    const input=document.getElementById("pdfInput"), code=document.getElementById("fileCourse").value, file=input.files[0];
    if(!file) return toast("Pilih file PDF dulu.");
    if(file.type!=="application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return toast("Hanya PDF yang diterima.");
    await dbPut({id:crypto.randomUUID(),code,name:file.name,size:file.size,createdAt:new Date().toISOString(),blob:file});
    input.value=""; await renderFiles(); toast("PDF tersimpan di browser.");
  };
  renderFiles();
}

async function renderFiles() {
  const box=document.getElementById("fileList"); if(!box) return;
  const files=await dbAll();
  box.innerHTML=files.length?files.map(f=>{
    const c=getCourse(f.code);
    return `<article class="file-card"><div class="eyebrow">${f.code}</div><h3 class="file-name">${escapeHTML(f.name)}</h3><p class="muted">${c?.name||""}<br>${formatBytes(f.size)} · ${new Date(f.createdAt).toLocaleString("id-ID")}</p><div class="card-actions"><button class="btn btn-primary open-file" data-id="${f.id}">Buka PDF</button><button class="btn btn-danger delete-file" data-id="${f.id}">Hapus</button></div></article>`;
  }).join(""):`<div class="empty" style="grid-column:1/-1">Belum ada PDF yang diupload.</div>`;
  box.querySelectorAll(".open-file").forEach(b=>b.onclick=async()=>{
    const f=await dbGet(b.dataset.id), url=URL.createObjectURL(f.blob); window.open(url,"_blank");
  });
  box.querySelectorAll(".delete-file").forEach(b=>b.onclick=async()=>{
    if(confirm("Hapus PDF ini dari browser?")){await dbDelete(b.dataset.id);await renderFiles();toast("PDF dihapus.");}
  });
}

function escapeHTML(str=""){return str.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function formatBytes(n){if(n<1024)return n+" B"; if(n<1024**2)return (n/1024).toFixed(1)+" KB"; return (n/1024**2).toFixed(1)+" MB";}

function openDB() {
  return new Promise((resolve,reject)=>{
    const r=indexedDB.open(DB_NAME,1);
    r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains("files")) r.result.createObjectStore("files",{keyPath:"id"});};
    r.onsuccess=()=>resolve(r.result); r.onerror=()=>reject(r.error);
  });
}
async function dbPut(obj){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction("files","readwrite");tx.objectStore("files").put(obj);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}
async function dbAll(){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction("files","readonly"),r=tx.objectStore("files").getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function dbGet(id){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction("files","readonly"),r=tx.objectStore("files").get(id);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function dbDelete(id){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction("files","readwrite");tx.objectStore("files").delete(id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});}

document.querySelectorAll(".nav-item").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  currentView=btn.dataset.view; render(); document.getElementById("sidebar").classList.remove("open");
});
document.getElementById("closeModal").onclick=closeModal;
document.getElementById("courseModal").onclick=e=>{if(e.target.id==="courseModal")closeModal();};
document.getElementById("mobileMenu").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
document.getElementById("themeToggle").onclick=()=>{
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")){
    document.documentElement.style.setProperty("--bg","#0b1220");
    document.documentElement.style.setProperty("--surface","#111a2b");
    document.documentElement.style.setProperty("--surface-2","#172238");
    document.documentElement.style.setProperty("--text","#e8eef8");
    document.documentElement.style.setProperty("--muted","#9aa6b8");
    document.documentElement.style.setProperty("--line","#26344d");
  } else location.reload();
};
document.getElementById("globalSearch").oninput=e=>{
  const q=e.target.value.toLowerCase().trim();
  if(!q) return;
  const hit=COURSES.find(c=>(c.name+" "+c.code).toLowerCase().includes(q));
  if(hit){currentView="courses";currentSemester=hit.s;render();}
};
render();
