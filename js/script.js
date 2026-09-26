// 1. Ambil URL halaman saat ini
const currentUrl = window.location.pathname;

// 2. Ambil semua link di dalam nav
const navLinks = document.querySelectorAll('.sidebar-nav a');

// 3. Cocokkan URL dan tambahkan class 'active'
navLinks.forEach(link => {
  const linkPath = new URL(link.href).pathname;
  
  // Normalisasi: Hapus garis miring di akhir (jika ada) agar pencocokan akurat
  const normalizedCurrent = currentUrl.replace(/\/$/, '') || '/';
  const normalizedLink = linkPath.replace(/\/$/, '') || '/';
  
  if (normalizedCurrent === normalizedLink) {
    link.classList.add('active');
  }
});

// --- FITUR FILTER & LIVE SEARCH (HALAMAN CATEGORY) ---
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const writeupCards = document.querySelectorAll('.writeup-card');
const noResultsMsg = document.getElementById('no-results');

// Blok if ini memastikan script hanya jalan jika kita sedang berada di halaman Category
if (categoryFilter && searchInput) {
    function filterCards() {
        const selectedCategory = categoryFilter.value.toUpperCase();
        // Lowercase & trim untuk sanitasi input pencarian
        const searchQuery = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        writeupCards.forEach(card => {
            const cardCategory = card.dataset.category || "";
            // Mencari kecocokan kata dari seluruh isi teks di dalam kotak tersebut
            const cardContent = card.textContent.toLowerCase(); 

            // Logika Evaluasi: Apakah dropdown cocok? Dan apakah teks cocok?
            const matchesCategory = (selectedCategory === "ALL" || cardCategory === selectedCategory);
            const matchesSearch = cardContent.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden'); // Tampilkan
                visibleCount++;
            } else {
                card.classList.add('hidden'); // Sembunyikan
            }
        });

        // Jika perhitungan jumlah kotak yang tampil adalah 0, munculkan pesan peringatan
        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    // Pasang "pendengar" agar fungsi di atas dipanggil secara otomatis setiap ada perubahan
    categoryFilter.addEventListener('change', filterCards);
    searchInput.addEventListener('input', filterCards);
}

// --- FUNGSI COPY LINK SHARE ---
function copyToClipboard() {
    const currentUrl = window.location.href;
    const copyTextSpan = document.getElementById('copy-text');
    
    navigator.clipboard.writeText(currentUrl).then(() => {
        if (copyTextSpan) {
            copyTextSpan.textContent = "Copied!";
            setTimeout(() => {
                copyTextSpan.textContent = "Copy Link";
            }, 2000); // Mengembalikan teks semula setelah 2 detik
        }
    }).catch(err => {
        console.error('Gagal menyalin tautan: ', err);
    });
}

// === ANIMASI TERMINAL TYPING (HALAMAN PROFILE) ===
async function initTerminalTyping() {
    const elements = document.querySelectorAll('.typing-text');
    if (elements.length === 0) return;

    // 1. Simpan teks asli dan kosongkan isi elemen (untuk persiapan animasi)
    const texts = [];
    elements.forEach(el => {
        texts.push(el.textContent.trim());
        el.textContent = ''; 
    });

    // 2. Buat elemen kursor hijau kotak
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';

    // 3. Loop berantai: Ketik baris 1, lanjut baris 2, dst.
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const text = texts[i];
        
        // Atur kecepatan: paragraf summary (kelas fast-type) diketik lebih cepat (15ms)
        const speed = el.classList.contains('fast-type') ? 15 : 60; 

        el.appendChild(cursor); // Pindahkan kursor ke baris saat ini
        
        // Loop mengetik per karakter menggunakan textContent (Anti-XSS / Sangat Secure)
        for (let j = 0; j < text.length; j++) {
            cursor.insertAdjacentText('beforebegin', text.charAt(j));
            await new Promise(r => setTimeout(r, speed));
        }
        
        // Hapus kursor dari baris ini jika mau pindah ke baris bawahnya
        if (i < elements.length - 1) {
            el.removeChild(cursor);
        }
    }
}

// Jalankan saat kerangka HTML sudah selesai dimuat browser
document.addEventListener('DOMContentLoaded', initTerminalTyping);

// === ANIMASI FETCHING CTF STATS ===
document.addEventListener('DOMContentLoaded', () => {
    const loadingMsg = document.getElementById('stats-loading');
    const badgesDisplay = document.getElementById('badges-display');

    if (loadingMsg && badgesDisplay) {
        // Tampilkan teks loading dalam 1 detik
        setTimeout(() => {
            loadingMsg.classList.remove('hidden');
        }, 1000);

        // Munculkan gambar badge secara clean dalam 2.5 detik
        setTimeout(() => {
            badgesDisplay.classList.remove('hidden');
        }, 2500);
    }
});

// === FITUR COPY PGP PUBLIC KEY ===
function copyPGPKey() {
    const pgpContent = document.getElementById('pgp-key-content').textContent;
    const copyTextBtn = document.getElementById('pgp-copy-text');
    
    navigator.clipboard.writeText(pgpContent).then(() => {
        if (copyTextBtn) {
            copyTextBtn.textContent = "Key Copied!";
            // Reset teks setelah 2 detik
            setTimeout(() => {
                copyTextBtn.textContent = "Copy Key";
            }, 2000);
        }
    }).catch(err => {
        console.error('Gagal menyalin PGP Key: ', err);
    });
}