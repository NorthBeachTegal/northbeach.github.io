
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const headerEl = document.querySelector("header");

// Toggle menu mobile
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// 1) Auto-hide navbar saat scroll ke bawah, muncul lagi saat scroll ke atas
let lastScrollY = window.pageYOffset;

window.addEventListener("scroll", () => {
  const currentY = window.pageYOffset;

  if (currentY > lastScrollY && currentY > 80) {
    // scroll ke bawah & sudah lewat 80px
    headerEl.classList.add("header-hidden");
    navLinks.classList.remove("open"); // sekalian nutup menu mobile
  } else {
    // scroll ke atas
    headerEl.classList.remove("header-hidden");
  }

  lastScrollY = currentY;
});

// 2) Smooth scroll dengan offset header saat klik link navbar
const navAnchors = document.querySelectorAll('nav a[href^="#"]');

navAnchors.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const target = document.getElementById(id);
    if (!target) return;

    const headerHeight = headerEl.offsetHeight;
    const targetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      10; // jarak kecil di bawah navbar

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // tutup menu mobile setelah klik
    navLinks.classList.remove("open");
  });
});

// Tahun di footer
document.getElementById("year").textContent = new Date().getFullYear();

// ========== ANIMATE ON SCROLL ==========
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target); // jalan sekali saja
        }
      });
    },
    {
      threshold: 0.15, // 15% elemen kelihatan baru animasi
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // fallback kalau browser jadul: langsung tampil
  revealEls.forEach((el) => el.classList.add("reveal-visible"));
}
