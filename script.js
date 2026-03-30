// ==========================================
// 1. FUNGSI GLOBAL (WAJIB DI PALING ATAS)
// ==========================================

// Fungsi untuk mengganti video dan membuat kotak playlist membesar
function playThis(file, judul, element) {
    const video = document.getElementById('playerVideo');
    const vSource = document.getElementById('vSource');
    const activeTitle = document.getElementById('activeTitle');

    if (vSource && video) {
        vSource.src = file;
        activeTitle.innerText = judul;
        video.load();
        video.play();

        // Menghapus kelas 'active' dari semua kartu video
        document.querySelectorAll('.v-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Menambah kelas 'active' pada kartu yang sedang diklik
        element.classList.add('active');
    }
}

// Fungsi untuk scroll halus ke bagian tertentu
window.scrollToSection = function(sectionId) {
    const target = document.getElementById(sectionId);
    
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        // Update menu navigasi agar yang aktif berpindah warna
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.innerText.toLowerCase() === sectionId.toLowerCase()) {
                item.classList.add('active');
            }
        });
    }
};

// ==========================================
// 2. LOGIKA INTERAKSI (JALAN SAAT HALAMAN SIAP)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Logika Toggle Mode Pink ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isPinkMode = false;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isPinkMode = !isPinkMode;
            body.classList.toggle('pink-mode');
            themeToggle.innerText = isPinkMode ? "Pink ON" : "Pink OFF";
        });
    }

    // --- Logika Skill Spotlight (Efek Blur & Focus) ---
    window.focusSkill = function(element) {
        const container = document.querySelector('.skill-container');
        const cards = document.querySelectorAll('.skill-card');

        if (element.classList.contains('active')) {
            element.classList.remove('active');
            container.classList.remove('has-active');
        } else {
            cards.forEach(card => card.classList.remove('active'));
            element.classList.add('active');
            container.classList.add('has-active');
        }
    };

    // --- Logika Animasi Muncul (Entrance) ---
    setTimeout(() => {
        document.querySelectorAll('.entrance-content, .entrance-video').forEach(el => {
            el.classList.add('entrance-anim');
        });
    }, 300);

    // --- Logika Fitur Like ---
    const likeBtn = document.getElementById('btnLike');
    const likeCounter = document.getElementById('likeCounter');
    let hasLiked = false;

    if (likeBtn && likeCounter) {
        likeBtn.addEventListener('click', () => {
            if (!hasLiked) {
                likeCounter.innerText = parseInt(likeCounter.innerText) + 1;
                likeCounter.classList.add('bump');
                setTimeout(() => likeCounter.classList.remove('bump'), 300);
                hasLiked = true;
                likeBtn.disabled = true;
                likeBtn.innerText = "Liked";
            }
        });
    }

    // --- Logika Loading Bar (WhatsApp & CV) ---
    const setupLoading = (btnId) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        const bar = btn.querySelector('.loading-bar');
        let prog = 0; 
        let timer;

        const start = () => {
            clearInterval(timer);
            timer = setInterval(() => {
                if (prog < 105) { 
                    prog += 6; 
                    bar.style.width = prog + '%'; 
                }
            }, 20);
        };
        const stop = () => {
            clearInterval(timer);
            timer = setInterval(() => {
                if (prog > 0) { 
                    prog -= 8; 
                    bar.style.width = prog + '%'; 
                } else {
                    clearInterval(timer);
                }
            }, 20);
        };

        btn.addEventListener('mousedown', start);
        btn.addEventListener('mouseup', stop);
        btn.addEventListener('mouseleave', stop);
        btn.addEventListener('touchstart', (e) => { start(); });
        btn.addEventListener('touchend', stop);
    };

    setupLoading('btnWA');
    setupLoading('btnCV');

    // Logika Klik Sosmed (Warna Icon)
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            socialIcons.forEach(i => { i.classList.remove('active'); i.style.color = ""; });
            icon.classList.add('active');
            icon.style.color = icon.getAttribute('data-color');
        });
    });

    // Logika Navigasi Active
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}); // Penutup DOMContentLoade
