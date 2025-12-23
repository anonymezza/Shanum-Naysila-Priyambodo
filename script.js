// Loading animation with count-up
document.addEventListener("DOMContentLoaded", function () {
  const loadingContainer = document.querySelector(".loading-container");
  const countUpElement = document.getElementById("count-up");
  const loadingProgress = document.getElementById("loading-progress");
  const bgMusic = document.getElementById("bg-music");
  const musicPlayer = document.getElementById("music-player");
  const musicIcon = musicPlayer.querySelector("i");

  let count = 0;
  let progress = 0;
  const targetCount = 100;
  const countDuration = 2000;
  const countStep = targetCount / (countDuration / 30);

  // Count-up animation
  const countUpInterval = setInterval(() => {
    count += countStep;
    progress = (count / targetCount) * 100;

    countUpElement.textContent = Math.min(Math.floor(count), targetCount);
    loadingProgress.style.width = `${Math.min(progress, 100)}%`;

    if (count >= targetCount) {
      clearInterval(countUpInterval);
      countUpElement.textContent = targetCount;
      loadingProgress.style.width = "100%";

      // Fade out loading screen
      setTimeout(() => {
        loadingContainer.classList.add("fade-out");

        // Show main content animations
        setTimeout(() => {
          loadingContainer.style.display = "none";
          startAnimations();
        }, 1000);
      }, 500);
    }
  }, 30);

  // Music player functionality - PERBAIKAN
  let isPlaying = false;

  // Fungsi untuk toggle play/pause
  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.classList.remove("fa-pause");
      musicIcon.classList.add("fa-music");
      musicPlayer.classList.remove("playing");
    } else {
      // Coba play musik, jika gagal karena autoplay policy, minta interaksi user
      const playPromise = bgMusic.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Berhasil diputar
            musicIcon.classList.remove("fa-music");
            musicIcon.classList.add("fa-pause");
            musicPlayer.classList.add("playing");
            isPlaying = true;
          })
          .catch((error) => {
            console.log("Autoplay prevented. User interaction required.");
            // Reset state
            musicIcon.classList.remove("fa-pause");
            musicIcon.classList.add("fa-music");
            musicPlayer.classList.remove("playing");
            isPlaying = false;
            // Beri instruksi ke user
            alert("Klik tombol musik untuk memutar lagu latar. Jika masih tidak bisa, coba klik tombol ini sekali lagi.");
          });
      }
    }
  }

  // Event listener untuk tombol musik
  musicPlayer.addEventListener("click", function (e) {
    e.stopPropagation();

    if (!isPlaying) {
      // Jika belum playing, coba play
      const playPromise = bgMusic.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            musicIcon.classList.remove("fa-music");
            musicIcon.classList.add("fa-pause");
            musicPlayer.classList.add("playing");
            isPlaying = true;
          })
          .catch((error) => {
            console.log("Autoplay error:", error);
            // Fallback: ubah state manual karena user sudah interaksi
            musicIcon.classList.remove("fa-music");
            musicIcon.classList.add("fa-pause");
            musicPlayer.classList.add("playing");
            isPlaying = true;
            // Coba play lagi setelah interaksi user
            setTimeout(() => bgMusic.play(), 100);
          });
      }
    } else {
      // Jika sedang playing, pause
      bgMusic.pause();
      musicIcon.classList.remove("fa-pause");
      musicIcon.classList.add("fa-music");
      musicPlayer.classList.remove("playing");
      isPlaying = false;
    }
  });

  // Handle ketika musik selesai diputar
  bgMusic.addEventListener("ended", function () {
    musicIcon.classList.remove("fa-pause");
    musicIcon.classList.add("fa-music");
    musicPlayer.classList.remove("playing");
    isPlaying = false;
  });

  // Preload images for galleries
  preloadGalleryImages();
});

// Start animations when page loads
function startAnimations() {
  // Initial animations for header elements
  setTimeout(() => {
    document.getElementById("polaroid-frame").classList.add("visible");
  }, 300);

  setTimeout(() => {
    document.getElementById("main-heading").classList.add("visible");
  }, 600);

  setTimeout(() => {
    document.getElementById("main-subtitle").classList.add("visible");
  }, 900);

  // Animate stickers with delay
  setTimeout(() => {
    document.getElementById("sticker-1").classList.add("visible");
  }, 1200);

  setTimeout(() => {
    document.getElementById("sticker-2").classList.add("visible");
  }, 1500);

  setTimeout(() => {
    document.getElementById("sticker-3").classList.add("visible");
  }, 1800);

  // Setup semua fitur
  setupScrollAnimations();
  setupStaggeredAnimations();
  setupNavigation();
  setupCameraSimulator();
  setupPuzzleGame();
  setupMusicPlayer();
  setupTimeCapsule();
  setupCountdown();
  setupSharing();
}

// Setup scroll animations untuk semua elemen
function setupScrollAnimations() {
  // Pilih semua elemen yang ingin dianimasikan
  const animatedElements = document.querySelectorAll(
    ".description-content, .section-title, .section-subtitle, " +
      ".puzzle-container, .music-player-large, .timecapsule-container, " +
      ".countdown-container, .share-container, " +
      ".preview-images, .puzzle-controls, .playlist, " +
      ".album-cover, .player-controls, .capsule, " +
      ".capsule-controls, .countdown-display, .countdown-info, " +
      ".birthday-wishes, .share-options, .share-preview, " +
      ".share-customize, .footer-content, .control-buttons, " +
      ".puzzle-stats, .player-buttons, .volume-control, " +
      ".date-selector, .message-input, .sealed-capsules, " +
      ".wish-input, .wishes-wall, .puzzle-board"
  );

  // Tambahkan class animate-on-scroll secara otomatis
  animatedElements.forEach((element) => {
    // Hanya tambahkan jika belum ada
    if (!element.classList.contains("animate-on-scroll")) {
      element.classList.add("animate-on-scroll");

      // Tambahkan arah animasi berdasarkan posisi atau jenis elemen
      if (element.classList.contains("section-title") || element.classList.contains("section-subtitle")) {
        element.classList.add("fade-in-down");
      } else if (element.classList.contains("music-player-large") || element.classList.contains("capsule-controls")) {
        element.classList.add("fade-in-left");
      } else if (element.classList.contains("timecapsule-container") || element.classList.contains("countdown-info")) {
        element.classList.add("fade-in-right");
      } else if (element.classList.contains("countdown-container") || element.classList.contains("album-cover")) {
        element.classList.add("scale-in");
      } else {
        element.classList.add("fade-in-up");
      }
    }
  });

  // Buat Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Tambahkan class visible untuk memulai animasi
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observasi semua elemen yang memiliki class animate-on-scroll
  const allAnimatedElements = document.querySelectorAll(".animate-on-scroll");
  allAnimatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Update active nav item based on scroll
  const navItems = document.querySelectorAll(".nav-bubble");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.dataset.section === current) {
        item.classList.add("active");
      }
    });
  });
}

// Fungsi untuk animasi berurutan (staggered)
function setupStaggeredAnimations() {
  // Elemen yang akan dianimasikan berurutan
  const staggeredGroups = [
    {
      selector: ".puzzle-controls > *",
      delay: 100,
      animation: "fade-in-up",
    },
    {
      selector: ".control-buttons .puzzle-btn",
      delay: 150,
      animation: "fade-in-up",
    },
    {
      selector: ".puzzle-stats > *",
      delay: 100,
      animation: "fade-in-up",
    },
    {
      selector: ".playlist .playlist-item",
      delay: 100,
      animation: "fade-in-left",
    },
    {
      selector: ".player-buttons .player-btn",
      delay: 150,
      animation: "fade-in-up",
    },
    {
      selector: ".capsule-controls > *",
      delay: 150,
      animation: "fade-in-up",
    },
    {
      selector: ".sealed-capsules .sealed-capsule-item",
      delay: 100,
      animation: "fade-in-up",
    },
    {
      selector: ".countdown-display .countdown-item",
      delay: 200,
      animation: "scale-in",
    },
    {
      selector: ".countdown-info > *",
      delay: 150,
      animation: "fade-in-up",
    },
    {
      selector: ".share-options .share-option-btn",
      delay: 100,
      animation: "fade-in-up",
    },
    {
      selector: ".wishes-wall .wish-item",
      delay: 100,
      animation: "fade-in-up",
    },
    {
      selector: ".preview-images .preview-image",
      delay: 150,
      animation: "fade-in-up",
    },
  ];

  // Setup observer untuk setiap grup
  staggeredGroups.forEach((group) => {
    const elements = document.querySelectorAll(group.selector);

    elements.forEach((element, index) => {
      // Tambahkan class animasi
      if (!element.classList.contains("animate-on-scroll")) {
        element.classList.add("animate-on-scroll", group.animation);

        // Atur delay untuk animasi
        element.style.transitionDelay = `${index * group.delay}ms`;
      }
    });

    // Buat observer untuk grup ini
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observasi setiap elemen dalam grup
    elements.forEach((element) => {
      observer.observe(element);
    });
  });
}

// Setup floating navigation
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-bubble");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const floatingNav = document.querySelector(".floating-nav");

  // Initialize mobile nav state
  if (window.innerWidth <= 768) {
    floatingNav.style.display = "none";
  }

  // Toggle mobile navigation
  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      floatingNav.classList.toggle("active");
      mobileToggle.classList.toggle("active");

      if (floatingNav.classList.contains("active")) {
        floatingNav.style.display = "flex";
      } else {
        floatingNav.style.display = "none";
      }
    });
  }

  // Navigation click handler
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = item.dataset.section;

      // Tutup semua modal/popup terlebih dahulu
      closeAllModals();

      if (targetSection === "camera") {
        // Show camera simulator
        openCamera();
      } else {
        // Scroll to section
        const section = document.getElementById(targetSection);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Update active nav
      navItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");

      // Close mobile nav jika terbuka
      closeMobileNav();
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!floatingNav.contains(e.target) && !mobileToggle.contains(e.target)) {
      closeMobileNav();
    }
  });

  // Close mobile nav when scrolling
  window.addEventListener("scroll", () => {
    closeMobileNav();
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      floatingNav.style.display = "flex";
      floatingNav.classList.remove("active");
      mobileToggle.classList.remove("active");
    } else {
      if (!floatingNav.classList.contains("active")) {
        floatingNav.style.display = "none";
      }
    }
  });

  // Function to close mobile navigation
  function closeMobileNav() {
    if (floatingNav.classList.contains("active")) {
      floatingNav.classList.remove("active");
      mobileToggle.classList.remove("active");
      floatingNav.style.display = "none";
    }
  }
}

// Fungsi untuk menutup semua modal
function closeAllModals() {
  closeCamera();
  closeInstagramModal();
}

// Fungsi untuk membuka kamera
function openCamera() {
  const cameraContainer = document.getElementById("camera-simulator");
  if (cameraContainer) {
    cameraContainer.style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.classList.add("no-scroll");

    // Reset kamera ke state awal
    resetCamera();
  }
}

// Fungsi untuk menutup kamera
function closeCamera() {
  const cameraContainer = document.getElementById("camera-simulator");
  if (cameraContainer) {
    cameraContainer.style.display = "none";
    document.body.style.overflow = "auto";
    document.body.classList.remove("no-scroll");
  }
}

// Fungsi untuk membuka modal Instagram
function openInstagramModal() {
  const modal = document.getElementById("instagram-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Fungsi untuk menutup modal Instagram
function closeInstagramModal() {
  const modal = document.getElementById("instagram-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Reset state kamera
function resetCamera() {
  const polaroidOutput = document.getElementById("polaroid-output");
  const developingText = document.querySelector(".developing-text");
  const filterOptions = document.getElementById("filter-options");

  if (polaroidOutput) polaroidOutput.style.display = "none";
  if (developingText) developingText.style.display = "block";
  if (filterOptions) filterOptions.style.display = "none";
}

// Setup camera simulator dengan fitur download yang lengkap
function setupCameraSimulator() {
  const cameraContainer = document.getElementById("camera-simulator");
  const shutterBtn = document.getElementById("shutter-btn");
  const cameraFlash = document.getElementById("camera-flash");
  const polaroidOutput = document.getElementById("polaroid-output");
  const capturedPhoto = document.getElementById("captured-photo");
  const filterToggle = document.getElementById("filter-toggle");
  const filterOptions = document.getElementById("filter-options");
  const uploadPhoto = document.getElementById("upload-photo");
  const photoUpload = document.getElementById("photo-upload");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cameraCloseBtn = document.getElementById("camera-close-btn");
  const downloadPhotoBtn = document.getElementById("download-photo");
  const polaroidCaption = document.getElementById("polaroid-caption");
  const polaroidDate = document.getElementById("polaroid-date");

  let currentFilter = "vintage";

  // Format tanggal untuk polaroid
  const now = new Date();
  const formattedDate = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  polaroidDate.textContent = formattedDate;

  // Close camera when clicking outside
  cameraContainer.addEventListener("click", (e) => {
    if (e.target === cameraContainer) {
      closeCamera();
    }
  });

  // Close button
  cameraCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeCamera();
    updateActiveNavOnCameraClose();
  });

  // Shutter button
  shutterBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    // Flash effect
    cameraFlash.classList.add("active");
    setTimeout(() => {
      cameraFlash.classList.remove("active");
    }, 300);

    // Capture photo (using sample image)
    const sampleImages = ["Assets/img/4.jpeg", "Assets/img/1.jpeg", "Assets/img/6.jpeg", "Assets/img/2.jpeg", "Assets/img/3.jpeg"];

    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    capturedPhoto.src = randomImage;

    // Apply current filter
    applyFilter(capturedPhoto, currentFilter);

    // Show polaroid output with developing animation
    polaroidOutput.style.display = "block";

    // Simulate developing time
    setTimeout(() => {
      const developingText = document.querySelector(".developing-text");
      if (developingText) {
        developingText.style.display = "none";
      }
    }, 2000);
  });

  // Filter toggle
  filterToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    filterOptions.style.display = filterOptions.style.display === "flex" ? "none" : "flex";
  });

  // Filter selection
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;

      // Apply filter to main photo if exists
      if (capturedPhoto.src) {
        applyFilter(capturedPhoto, currentFilter);
      }
    });
  });

  // Upload photo
  uploadPhoto.addEventListener("click", (e) => {
    e.stopPropagation();
    photoUpload.click();
  });

  photoUpload.addEventListener("change", function (e) {
    e.stopPropagation();
    if (this.files && this.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        capturedPhoto.src = e.target.result;
        applyFilter(capturedPhoto, currentFilter);
        polaroidOutput.style.display = "block";

        setTimeout(() => {
          const developingText = document.querySelector(".developing-text");
          if (developingText) {
            developingText.style.display = "none";
          }
        }, 2000);
      };

      reader.readAsDataURL(this.files[0]);
    }
  });

  // Download photo dengan frame polaroid lengkap
  downloadPhotoBtn.addEventListener("click", async function (e) {
    e.stopPropagation();

    if (!capturedPhoto.src || capturedPhoto.src === "") {
      alert("Tidak ada foto untuk diunduh. Ambil foto terlebih dahulu!");
      return;
    }

    // Tampilkan loading
    const originalHTML = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    this.disabled = true;

    try {
      // Buat canvas untuk gambar dengan frame polaroid
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Ukuran canvas untuk polaroid
      canvas.width = 800;
      canvas.height = 1000;

      // Background putih untuk polaroid
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gambar border polaroid
      ctx.strokeStyle = "#E0E0E0";
      ctx.lineWidth = 20;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Tambah border dalam
      ctx.strokeStyle = "#CCCCCC";
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      // Tunggu gambar selesai load
      await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = capturedPhoto.src;

        img.onload = function () {
          // Apply filter ke gambar
          const tempCanvas = document.createElement("canvas");
          const tempCtx = tempCanvas.getContext("2d");
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;

          // Terapkan filter sesuai pilihan
          tempCtx.filter = capturedPhoto.style.filter || "sepia(0.3) contrast(1.1) brightness(1.05)";
          tempCtx.drawImage(img, 0, 0);

          // Gambar foto di tengah dengan border
          const photoX = 100;
          const photoY = 100;
          const photoWidth = 600;
          const photoHeight = 600;

          // Gambar shadow untuk foto
          ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 5;

          // Gambar foto
          ctx.drawImage(tempCanvas, 0, 0, img.width, img.height, photoX, photoY, photoWidth, photoHeight);

          // Reset shadow
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // Gambar border foto
          ctx.strokeStyle = "#888888";
          ctx.lineWidth = 3;
          ctx.strokeRect(photoX, photoY, photoWidth, photoHeight);

          // Tambah teks caption
          ctx.fillStyle = "#333333";
          ctx.font = 'bold 48px "Caveat", cursive';
          ctx.textAlign = "center";
          ctx.fillText(polaroidCaption.textContent, canvas.width / 2, 750);

          // Tambah teks tanggal
          ctx.font = 'italic 36px "Caveat", cursive';
          ctx.fillStyle = "#666666";
          ctx.fillText(polaroidDate.textContent, canvas.width / 2, 820);

          // Tambah watermark
          ctx.font = '24px "Caveat", cursive';
          ctx.fillStyle = "#888888";
          ctx.fillText("Kenangan Indah untuk Shanum", canvas.width / 2, 920);

          resolve();
        };

        img.onerror = function () {
          console.error("Gagal memuat gambar untuk download");
          alert("Gagal memuat gambar. Coba lagi.");
          resolve();
        };
      });

      // Convert to blob dan download
      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `kenangan-shanum-${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        setTimeout(() => URL.revokeObjectURL(url), 100);

        alert("Foto dengan frame polaroid berhasil diunduh!");
      }, "image/png");
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Terjadi kesalahan saat mengunduh gambar.");
    } finally {
      // Reset tombol
      downloadPhotoBtn.innerHTML = originalHTML;
      downloadPhotoBtn.disabled = false;
    }
  });

  // Apply filter to image
  function applyFilter(imgElement, filterName) {
    switch (filterName) {
      case "vintage":
        imgElement.style.filter = "sepia(0.5) contrast(1.1) brightness(1.1) saturate(1.3)";
        break;
      case "sepia":
        imgElement.style.filter = "sepia(0.8)";
        break;
      case "blackwhite":
        imgElement.style.filter = "grayscale(1) contrast(1.2)";
        break;
      case "warm":
        imgElement.style.filter = "sepia(0.3) saturate(1.5) hue-rotate(-10deg)";
        break;
      case "cool":
        imgElement.style.filter = "sepia(0.2) saturate(0.8) hue-rotate(20deg) brightness(1.1)";
        break;
      default:
        imgElement.style.filter = "sepia(0.3) contrast(1.1) brightness(1.05)";
    }
  }
}

// Update active nav ketika kamera ditutup
function updateActiveNavOnCameraClose() {
  const navItems = document.querySelectorAll(".nav-bubble");
  const sections = document.querySelectorAll("section");
  let currentSectionId = "";

  // Cari section yang paling dekat dengan atas viewport
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSectionId = section.id;
    }
  });

  // Update active nav
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.section === currentSectionId) {
      item.classList.add("active");
    }
  });
}

// Setup puzzle game dengan perbaikan responsive
function setupPuzzleGame() {
  const puzzleBoard = document.getElementById("puzzle-board");
  const shuffleBtn = document.getElementById("shuffle-puzzle");
  const solveBtn = document.getElementById("solve-puzzle");
  const newPuzzleBtn = document.getElementById("new-puzzle");
  const puzzleComplete = document.getElementById("puzzle-complete");
  const puzzleTime = document.getElementById("puzzle-time");
  const puzzleMoves = document.getElementById("puzzle-moves");
  const imageSelector = document.getElementById("puzzle-image-selector");
  const randomImageBtn = document.getElementById("random-image-btn");
  const sharePuzzleBtn = document.getElementById("share-puzzle");
  const nextPuzzleBtn = document.getElementById("next-puzzle");

  let puzzlePieces = [];
  let emptyIndex = 8;
  let moves = 0;
  let timerInterval = null;
  let seconds = 0;
  let currentImageIndex = 0;
  let isShuffled = false;

  // Daftar gambar puzzle
  const puzzleImages = [
    {
      id: 1,
      name: "Gambar 1 - Shanum",
      url: "Assets/img/1.jpeg",
      fallback: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Gambar 2 - Naysila",
      url: "Assets/img/3.jpeg",
      fallback: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Gambar 3 - Priyambodo",
      url: "Assets/img/4.jpeg",
      fallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Buat preview images
  createPreviewImages();

  // Initialize dengan gambar pertama
  initPuzzle(puzzleImages[0], false);

  // Event listener untuk selector
  imageSelector.addEventListener("change", function () {
    const selectedIndex = parseInt(this.value) - 1;
    if (selectedIndex >= 0 && selectedIndex < puzzleImages.length) {
      currentImageIndex = selectedIndex;
      resetGame();
      initPuzzle(puzzleImages[selectedIndex], false);
      updatePreviewImages(selectedIndex);
      updateCurrentImageInfo(selectedIndex);
    }
  });

  // Random image button
  if (randomImageBtn) {
    randomImageBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * puzzleImages.length);
      currentImageIndex = randomIndex;
      imageSelector.value = puzzleImages[randomIndex].id;
      resetGame();
      initPuzzle(puzzleImages[randomIndex], false);
      updatePreviewImages(randomIndex);
      updateCurrentImageInfo(randomIndex);
    });
  }

  // Shuffle button
  shuffleBtn.addEventListener("click", () => {
    if (!isShuffled) {
      shufflePuzzle();
      isShuffled = true;
    } else {
      alert("Puzzle sudah dalam keadaan acak! Coba selesaikan dulu.");
    }
  });

  // Solve button
  solveBtn.addEventListener("click", showCompleteImage);

  // New puzzle button
  newPuzzleBtn.addEventListener("click", () => {
    resetGame();
    initPuzzle(puzzleImages[currentImageIndex], false);
  });

  // Share puzzle button
  if (sharePuzzleBtn) {
    sharePuzzleBtn.addEventListener("click", sharePuzzleResult);
  }

  // Next puzzle button
  if (nextPuzzleBtn) {
    nextPuzzleBtn.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % puzzleImages.length;
      imageSelector.value = puzzleImages[currentImageIndex].id;
      resetGame();
      initPuzzle(puzzleImages[currentImageIndex], false);
      updatePreviewImages(currentImageIndex);
      updateCurrentImageInfo(currentImageIndex);
    });
  }

  function createPreviewImages() {
    const previewContainer = document.getElementById("preview-images");
    if (!previewContainer) return;

    puzzleImages.forEach((image, index) => {
      const previewDiv = document.createElement("div");
      previewDiv.className = `preview-image ${index === 0 ? "active" : ""}`;
      previewDiv.dataset.index = index;

      const img = document.createElement("img");
      img.src = image.url;
      img.alt = image.name;
      img.onerror = function () {
        this.src = image.fallback;
      };

      const label = document.createElement("div");
      label.className = "preview-label";
      label.textContent = `Gambar ${index + 1}`;

      previewDiv.appendChild(img);
      previewDiv.appendChild(label);

      previewDiv.addEventListener("click", () => {
        currentImageIndex = index;
        imageSelector.value = image.id;
        resetGame();
        initPuzzle(image, false);
        updatePreviewImages(index);
        updateCurrentImageInfo(index);
      });

      previewContainer.appendChild(previewDiv);
    });
  }

  function updatePreviewImages(activeIndex) {
    document.querySelectorAll(".preview-image").forEach((preview, index) => {
      preview.classList.toggle("active", index === activeIndex);
    });
  }

  function updateCurrentImageInfo(index) {
    const currentImageInfo = document.getElementById("current-image-info");
    const currentImageName = document.getElementById("current-image-name");

    if (currentImageInfo && currentImageName) {
      currentImageName.textContent = puzzleImages[index].name;
    }
  }

  function resetGame() {
    if (timerInterval) clearInterval(timerInterval);
    puzzleBoard.innerHTML = "";
    puzzlePieces = [];
    moves = 0;
    seconds = 0;
    isShuffled = false;
    puzzleMoves.textContent = "0";
    puzzleTime.textContent = "00:00";
    puzzleComplete.style.display = "none";
  }

  function initPuzzle(imageConfig, shouldShuffle = false) {
    // Preload image
    const imageToUse = new Image();

    imageToUse.onload = function () {
      createPuzzlePieces(imageConfig.url, shouldShuffle);
    };

    imageToUse.onerror = function () {
      createPuzzlePieces(imageConfig.fallback, shouldShuffle);
    };

    imageToUse.src = imageConfig.url;

    function createPuzzlePieces(imageUrl, shuffle) {
      emptyIndex = 8;

      // Dapatkan ukuran puzzle board
      const boardSize = puzzleBoard.clientWidth;
      const pieceSize = boardSize / 3;

      for (let i = 0; i < 9; i++) {
        const piece = document.createElement("div");
        piece.className = "puzzle-piece";
        piece.dataset.index = i;
        piece.dataset.correctIndex = i;

        if (i === 8) {
          piece.classList.add("empty");
        } else {
          const row = Math.floor(i / 3);
          const col = i % 3;
          piece.style.backgroundImage = `url('${imageUrl}')`;
          piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
          piece.style.backgroundSize = `${boardSize}px ${boardSize}px`;

          const numberDiv = document.createElement("div");
          numberDiv.className = "puzzle-number";
          numberDiv.textContent = i + 1;
          piece.appendChild(numberDiv);
        }

        piece.draggable = true;
        piece.addEventListener("dragstart", handleDragStart);
        piece.addEventListener("dragover", handleDragOver);
        piece.addEventListener("drop", handleDrop);
        piece.addEventListener("click", handlePieceClick);

        puzzleBoard.appendChild(piece);
        puzzlePieces.push(piece);
      }

      if (shouldShuffle) {
        shufflePuzzle();
      }

      startTimer();
    }
  }

  function shufflePuzzle() {
    if (puzzlePieces.length === 0) return;

    puzzlePieces = Array.from(puzzleBoard.children);
    emptyIndex = 8;

    for (let i = 0; i < 100; i++) {
      const possibleMoves = [];

      puzzlePieces.forEach((piece, index) => {
        if (!piece.classList.contains("empty") && canMove(index)) {
          possibleMoves.push(index);
        }
      });

      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        swapPieces(randomMove, emptyIndex);
        emptyIndex = randomMove;
      }
    }

    moves = 0;
    puzzleMoves.textContent = "0";
    isShuffled = true;
  }

  function canMove(index) {
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    const targetRow = Math.floor(index / 3);
    const targetCol = index % 3;

    const rowDiff = Math.abs(emptyRow - targetRow);
    const colDiff = Math.abs(emptyCol - targetCol);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  function swapPieces(index1, index2) {
    [puzzlePieces[index1], puzzlePieces[index2]] = [puzzlePieces[index2], puzzlePieces[index1]];

    puzzlePieces[index1].dataset.index = index1;
    puzzlePieces[index2].dataset.index = index2;

    puzzleBoard.innerHTML = "";
    puzzlePieces.forEach((piece) => {
      puzzleBoard.appendChild(piece);
    });
  }

  function isPuzzleSolved() {
    for (let i = 0; i < puzzlePieces.length; i++) {
      if (parseInt(puzzlePieces[i].dataset.index) !== parseInt(puzzlePieces[i].dataset.correctIndex)) {
        return false;
      }
    }
    return true;
  }

  function showPuzzleComplete() {
    puzzleComplete.style.display = "block";
    isShuffled = false;

    document.getElementById("complete-time").textContent = puzzleTime.textContent;
    document.getElementById("complete-moves").textContent = puzzleMoves.textContent;
    document.getElementById("complete-image").textContent = puzzleImages[currentImageIndex].name;

    createConfetti();
  }

  function showCompleteImage() {
    const currentImage = puzzleImages[currentImageIndex];
    const imageUrl = currentImage.url;

    puzzlePieces.forEach((piece, i) => {
      if (!piece.classList.contains("empty")) {
        const originalBgPos = piece.style.backgroundPosition;
        piece.dataset.originalBgPos = originalBgPos;
        piece.style.backgroundPosition = "0 0";
        piece.style.opacity = "0.9";
        piece.querySelector(".puzzle-number").style.opacity = "0.3";
      }
    });

    setTimeout(() => {
      puzzlePieces.forEach((piece, i) => {
        if (!piece.classList.contains("empty") && piece.dataset.originalBgPos) {
          piece.style.backgroundPosition = piece.dataset.originalBgPos;
          piece.style.opacity = "1";
          piece.querySelector(".puzzle-number").style.opacity = "1";
        }
      });
    }, 3000);
  }

  function handlePieceClick() {
    if (this.classList.contains("empty")) return;

    const clickedIndex = parseInt(this.dataset.index);

    if (canMove(clickedIndex)) {
      swapPieces(clickedIndex, emptyIndex);
      emptyIndex = clickedIndex;
      moves++;
      puzzleMoves.textContent = moves;

      if (isPuzzleSolved()) {
        clearInterval(timerInterval);
        showPuzzleComplete();
      }
    }
  }

  function handleDragStart(e) {
    if (this.classList.contains("empty")) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", this.dataset.index);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));

    if (canMove(draggedIndex)) {
      swapPieces(draggedIndex, emptyIndex);
      emptyIndex = draggedIndex;
      moves++;
      puzzleMoves.textContent = moves;

      if (isPuzzleSolved()) {
        clearInterval(timerInterval);
        showPuzzleComplete();
      }
    }
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      puzzleTime.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function sharePuzzleResult() {
    const time = puzzleTime.textContent;
    const movesCount = puzzleMoves.textContent;
    const imageName = puzzleImages[currentImageIndex].name;

    const message = `🎉 Saya berhasil menyelesaikan puzzle "${imageName}" dalam ${time} dengan ${movesCount} langkah! 🧩`;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: "Hasil Puzzle Kenangan",
        text: message,
        url: url,
      });
    } else {
      const shareText = `${message}\n\nCoba mainkan juga: ${url}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Hasil puzzle berhasil disalin ke clipboard!");
      });
    }
  }

  function createConfetti() {
    const confettiCount = 50;
    const colors = ["#FF8787", "#E26868", "#F7E733", "#D8D9CF"];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = "50%";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = "-20px";
      confetti.style.zIndex = "9999";
      confetti.style.pointerEvents = "none";

      document.body.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        }
      );

      animation.onfinish = () => {
        document.body.removeChild(confetti);
      };
    }
  }

  // Handle responsive puzzle size on window resize
  window.addEventListener("resize", () => {
    if (puzzlePieces.length > 0 && puzzleBoard.children.length > 0) {
      // Update background size for all pieces
      const boardSize = puzzleBoard.clientWidth;
      const pieceSize = boardSize / 3;

      Array.from(puzzleBoard.children).forEach((piece, i) => {
        if (!piece.classList.contains("empty")) {
          const row = Math.floor(i / 3);
          const col = i % 3;
          piece.style.backgroundSize = `${boardSize}px ${boardSize}px`;
          piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
        }
      });
    }
  });
}

// Setup music player
function setupMusicPlayer() {
  const playlistItems = document.querySelectorAll(".playlist-item");
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev-song");
  const nextBtn = document.getElementById("next-song");
  const volumeSlider = document.getElementById("volume-slider");
  const nowPlayingTitle = document.getElementById("now-playing-title");
  const nowPlayingArtist = document.getElementById("now-playing-artist");
  const vinylRecord = document.querySelector(".vinyl-record");

  const audioPlayer = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;

  // Initialize first song
  loadSong(currentSongIndex);

  // Play/Pause button
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      vinylRecord.classList.remove("playing");
    } else {
      audioPlayer.play().catch((e) => {
        console.log("Autoplay prevented.");
      });
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      vinylRecord.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });

  // Previous button
  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
      audioPlayer.play();
    }
  });

  // Next button
  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
      audioPlayer.play();
    }
  });

  // Volume slider
  volumeSlider.addEventListener("input", (e) => {
    audioPlayer.volume = e.target.value / 100;
  });

  // Playlist items
  playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      playlistItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      currentSongIndex = index;
      loadSong(currentSongIndex);
      if (isPlaying) {
        audioPlayer.play();
      }
    });
  });

  // When song ends, play next
  audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
  });

  function loadSong(index) {
    const item = playlistItems[index];
    const src = item.dataset.src;
    const title = item.dataset.title;
    const artist = item.dataset.artist;

    audioPlayer.src = src;
    nowPlayingTitle.textContent = title;
    nowPlayingArtist.textContent = artist;

    playlistItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    if (isPlaying) {
      audioPlayer.play();
    }
  }
}

// Setup time capsule
function setupTimeCapsule() {
  const openDateInput = document.getElementById("open-date");
  const capsuleInput = document.getElementById("capsule-input");
  const sealBtn = document.getElementById("seal-capsule");
  const sealedCapsules = document.getElementById("sealed-capsules");
  const capsuleDate = document.getElementById("capsule-date");
  const capsuleMessage = document.getElementById("capsule-message");

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  openDateInput.min = tomorrow.toISOString().split("T")[0];

  // Load saved capsules from localStorage
  loadCapsules();

  // Seal capsule
  sealBtn.addEventListener("click", () => {
    const date = openDateInput.value;
    const message = capsuleInput.value.trim();

    if (!date) {
      alert("Pilih tanggal untuk membuka kapsul!");
      return;
    }

    if (!message) {
      alert("Tulis pesan untuk kapsul waktu!");
      return;
    }

    // Create capsule object
    const capsule = {
      id: Date.now(),
      date: date,
      message: message,
      created: new Date().toISOString(),
    };

    // Save to localStorage
    saveCapsule(capsule);

    // Add to UI
    addCapsuleToUI(capsule);

    // Update display capsule
    const formattedDate = formatDate(date);
    capsuleDate.textContent = formattedDate;
    capsuleMessage.textContent = `"${message.substring(0, 50)}..."`;

    // Clear inputs
    capsuleInput.value = "";
    openDateInput.value = "";

    alert("Kapsul waktu berhasil disegel!");
  });

  function saveCapsule(capsule) {
    let capsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]");
    capsules.push(capsule);
    localStorage.setItem("timeCapsules", JSON.stringify(capsules));
  }

  function loadCapsules() {
    const capsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]");
    capsules.forEach((capsule) => addCapsuleToUI(capsule));

    // Show next upcoming capsule
    if (capsules.length > 0) {
      const nextCapsule = capsules.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
      const formattedDate = formatDate(nextCapsule.date);
      capsuleDate.textContent = formattedDate;
      capsuleMessage.textContent = `"${nextCapsule.message.substring(0, 50)}..."`;
    }
  }

  function addCapsuleToUI(capsule) {
    const capsuleItem = document.createElement("div");
    capsuleItem.className = "sealed-capsule-item";
    capsuleItem.innerHTML = `
            <div>
                <div class="sealed-capsule-date">${formatDate(capsule.date)}</div>
                <div class="sealed-capsule-preview">${capsule.message.substring(0, 80)}...</div>
            </div>
            <button class="capsule-open-btn" data-id="${capsule.id}">
                <i class="fas fa-unlock"></i>
            </button>
        `;

    sealedCapsules.appendChild(capsuleItem);

    // Add event listener to open button
    capsuleItem.querySelector(".capsule-open-btn").addEventListener("click", function () {
      const capsuleId = parseInt(this.dataset.id);
      openCapsule(capsuleId);
    });
  }

  function openCapsule(id) {
    const capsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]");
    const capsule = capsules.find((c) => c.id === id);

    if (!capsule) {
      alert("Kapsul tidak ditemukan!");
      return;
    }

    const openDate = new Date(capsule.date);
    const today = new Date();

    if (today >= openDate) {
      alert(`Pesan dari kapsul waktu:\n\n${capsule.message}`);
      // Remove opened capsule
      const updatedCapsules = capsules.filter((c) => c.id !== id);
      localStorage.setItem("timeCapsules", JSON.stringify(updatedCapsules));

      // Refresh UI
      sealedCapsules.innerHTML = '<h3><i class="fas fa-box"></i> Kapsul Tersegel</h3>';
      updatedCapsules.forEach((c) => addCapsuleToUI(c));
    } else {
      const timeLeft = Math.ceil((openDate - today) / (1000 * 60 * 60 * 24));
      alert(`Kapsul ini masih tersegel! Buka dalam ${timeLeft} hari lagi.`);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

// Setup countdown
function setupCountdown() {
  const countdownDays = document.getElementById("countdown-days");
  const countdownHours = document.getElementById("countdown-hours");
  const countdownMinutes = document.getElementById("countdown-minutes");
  const countdownSeconds = document.getElementById("countdown-seconds");
  const nextBirthdayDate = document.getElementById("next-birthday-date");
  const birthdayWishInput = document.getElementById("birthday-wish");
  const sendWishBtn = document.getElementById("send-wish");
  const wishesWall = document.getElementById("wishes-wall");

  // Set next birthday (12 April - contoh tanggal)
  const today = new Date();
  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, 3, 12); // April = bulan 3 (0-indexed)

  if (today > nextBirthday) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  // Format date for display
  const formattedDate = nextBirthday.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  nextBirthdayDate.textContent = formattedDate;

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const now = new Date();
    const timeDiff = nextBirthday - now;

    if (timeDiff <= 0) {
      countdownDays.textContent = "00";
      countdownHours.textContent = "00";
      countdownMinutes.textContent = "00";
      countdownSeconds.textContent = "00";
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    countdownDays.textContent = days.toString().padStart(2, "0");
    countdownHours.textContent = hours.toString().padStart(2, "0");
    countdownMinutes.textContent = minutes.toString().padStart(2, "0");
    countdownSeconds.textContent = seconds.toString().padStart(2, "0");
  }

  // Send birthday wish
  sendWishBtn.addEventListener("click", () => {
    const wish = birthdayWishInput.value.trim();

    if (!wish) {
      alert("Tulis ucapan terlebih dahulu!");
      return;
    }

    // Create wish object
    const wishObj = {
      text: wish,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Save to localStorage
    saveWish(wishObj);

    // Add to UI
    addWishToUI(wishObj);

    // Clear input
    birthdayWishInput.value = "";

    alert("Ucapan berhasil dikirim!");
  });

  function saveWish(wish) {
    let wishes = JSON.parse(localStorage.getItem("birthdayWishes") || "[]");
    wishes.push(wish);
    localStorage.setItem("birthdayWishes", JSON.stringify(wishes));
  }

  function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem("birthdayWishes") || "[]");
    wishes.forEach((wish) => addWishToUI(wish));
  }

  function addWishToUI(wish) {
    const wishItem = document.createElement("div");
    wishItem.className = "wish-item";
    wishItem.innerHTML = `
            <div class="wish-text">${wish.text}</div>
            <div class="wish-date">${wish.date}</div>
        `;

    wishesWall.appendChild(wishItem);
  }

  // Load existing wishes
  loadWishes();
}

// Setup sharing dengan fitur Instagram yang lengkap
function setupSharing() {
  const shareButtons = document.querySelectorAll(".share-option-btn");
  const copyLinkBtn = document.getElementById("copy-link");
  const colorOptions = document.querySelectorAll(".color-option");
  const shareToInstagramBtn = document.getElementById("share-to-instagram");
  const instagramModal = document.getElementById("instagram-modal");
  const modalCloseBtn = document.getElementById("modal-close");
  const saveInstagramImageBtn = document.getElementById("save-instagram-image");
  const copyInstagramCaptionBtn = document.getElementById("copy-instagram-caption");
  const modalImagePreview = document.getElementById("modal-image-preview");
  const previewCard = document.getElementById("preview-card");
  const sharePreviewImage = document.getElementById("share-preview-image");
  const sharePreviewTitle = document.getElementById("share-preview-title");
  const sharePreviewContent = document.getElementById("share-preview-desc");

  // Share buttons
  shareButtons.forEach((btn) => {
    if (btn.id !== "copy-link") {
      btn.addEventListener("click", function () {
        const platform = this.dataset.platform;
        const url = window.location.href;
        const text = "Lihat website kenangan indah untuk Shanum!";

        let shareUrl = "";

        switch (platform) {
          case "whatsapp":
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
            break;
          case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
          case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
          case "instagram":
            // Untuk Instagram, buka modal khusus
            openInstagramModal();
            generateInstagramImage();
            return;
          case "pinterest":
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`;
            break;
        }

        if (shareUrl) {
          window.open(shareUrl, "_blank", "width=600,height=400");
        }
      });
    }
  });

  // Copy link button
  copyLinkBtn.addEventListener("click", () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        const originalHTML = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i><span>Tautan Disalin!</span>';

        setTimeout(() => {
          copyLinkBtn.innerHTML = originalHTML;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Gagal menyalin tautan. Silakan salin manual dari address bar.");
      });
  });

  // Color options for customization
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      colorOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      const color = this.dataset.color;
      const titleColor = this.dataset.titleColor;
      const bgColor = this.dataset.bgColor;

      // Update preview card styling
      if (previewCard) {
        previewCard.style.borderColor = color;
        previewCard.style.backgroundColor = bgColor;
      }

      if (sharePreviewTitle) {
        sharePreviewTitle.style.color = titleColor;
      }

      if (sharePreviewContent) {
        sharePreviewContent.style.color = titleColor;
      }
    });
  });

  // Share to Instagram button
  if (shareToInstagramBtn) {
    shareToInstagramBtn.addEventListener("click", () => {
      openInstagramModal();
      generateInstagramImage();
    });
  }

  // Close modal button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeInstagramModal);
  }

  // Close modal when clicking outside
  instagramModal.addEventListener("click", (e) => {
    if (e.target === instagramModal) {
      closeInstagramModal();
    }
  });

  // Save Instagram image
  if (saveInstagramImageBtn) {
    saveInstagramImageBtn.addEventListener("click", saveInstagramImage);
  }

  // Copy Instagram caption
  if (copyInstagramCaptionBtn) {
    copyInstagramCaptionBtn.addEventListener("click", copyInstagramCaption);
  }

  function generateInstagramImage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Instagram optimal size: 1080x1080 for square, 1080x1350 for portrait
    canvas.width = 1080;
    canvas.height = 1350;

    // Get active color option
    const activeColorOption = document.querySelector(".color-option.active");
    const bgColor = activeColorOption?.dataset.bgColor || "#FFFFFF";
    const titleColor = activeColorOption?.dataset.titleColor || "#E26868";
    const borderColor = activeColorOption?.dataset.color || "#FF8787";

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Decorative elements
    ctx.fillStyle = `${borderColor}20`; // 20% opacity
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 300, 200, 0, Math.PI * 2);
    ctx.fill();

    // Title
    ctx.fillStyle = titleColor;
    ctx.font = 'bold 60px "Dancing Script", cursive';
    ctx.textAlign = "center";
    ctx.fillText("Kenangan Indah", canvas.width / 2, 200);

    ctx.font = 'bold 50px "Dancing Script", cursive';
    ctx.fillText("untuk Shanum", canvas.width / 2, 270);

    // Load preview image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = sharePreviewImage.src;

    img.onload = function () {
      // Draw image with rounded corners
      const imageX = 140;
      const imageY = 350;
      const imageWidth = 800;
      const imageHeight = 600;

      // Create clipping path for rounded corners
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 30);
      ctx.clip();

      ctx.drawImage(img, 0, 0, img.width, img.height, imageX, imageY, imageWidth, imageHeight);
      ctx.restore();

      // Add image border
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 30);
      ctx.stroke();

      // Add decorative elements
      ctx.fillStyle = `${borderColor}30`;
      ctx.beginPath();
      ctx.arc(canvas.width - 150, 100, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(150, canvas.height - 100, 40, 0, Math.PI * 2);
      ctx.fill();

      // Add message
      ctx.fillStyle = titleColor;
      ctx.font = 'italic 36px "Playfair Display", serif';
      ctx.textAlign = "center";

      const message = "Kumpulan kenangan dan pesan spesial untuk seseorang yang sangat berarti";
      wrapText(ctx, message, canvas.width / 2, 1000, 900, 40);

      // Add URL
      ctx.font = '28px "Caveat", cursive';
      ctx.fillStyle = "#666666";
      ctx.fillText("www.shanumnaysila.com", canvas.width / 2, 1150);

      // Add hashtags
      ctx.font = 'bold 32px "Caveat", cursive';
      ctx.fillStyle = borderColor;
      ctx.fillText("#KenanganIndah #Shanum #Cinta #Memories", canvas.width / 2, 1250);

      // Set modal image preview
      modalImagePreview.src = canvas.toDataURL("image/png");
    };

    img.onerror = function () {
      // Fallback if image fails to load
      ctx.fillStyle = borderColor;
      ctx.font = '40px "Caveat", cursive';
      ctx.textAlign = "center";
      ctx.fillText("🎀 Kenangan Spesial 🎀", canvas.width / 2, 500);

      modalImagePreview.src = canvas.toDataURL("image/png");
    };
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let testLine = "";
    let lineCount = 0;

    for (let n = 0; n < words.length; n++) {
      testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
        lineCount++;

        // Max 3 lines
        if (lineCount >= 3) {
          context.fillText(line + "...", x, y);
          return;
        }
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function saveInstagramImage() {
    if (!modalImagePreview.src) {
      alert("Gambar belum siap. Silakan tunggu sebentar.");
      return;
    }

    const link = document.createElement("a");
    link.href = modalImagePreview.src;
    link.download = `instagram-shanum-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Gambar Instagram berhasil disimpan!");
  }

  function copyInstagramCaption() {
    const caption = `✨ Kenangan Indah untuk Shanum ✨

Kumpulan kenangan dan pesan spesial untuk seseorang yang sangat berarti 💖

Jelajahi website spesial ini untuk melihat lebih banyak kenangan indah!

🔗 www.shanumnaysila.com

#KenanganIndah #Shanum #Cinta #Memories #SpecialMoments #Love #BeautifulMemories`;

    navigator.clipboard
      .writeText(caption)
      .then(() => {
        alert("Caption Instagram berhasil disalin! 🎉");
      })
      .catch((err) => {
        console.error("Failed to copy caption: ", err);
        alert("Gagal menyalin caption. Silakan salin manual.");
      });
  }
}

// Preload images for smoother experience
function preloadGalleryImages() {
  const imageUrls = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Tambahkan roundedRect ke CanvasRenderingContext2D
if (CanvasRenderingContext2D && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
  };
}
