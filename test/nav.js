document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");

  // Get cart elements
  const cartIcon = document.querySelector(".cart-icon");
  const cartDropdown = document.querySelector(".cart-dropdown");
  const navItemsRight = document.querySelector(".nav-items-right");

  console.log("Cart elements:", {
    icon: cartIcon,
    dropdown: cartDropdown,
    container: navItemsRight,
  });

  // Search functionality (unchanged)
  const searchButton = document.querySelector(".search-button");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const searchPreview = document.getElementById("searchPreview");
  const body = document.body;

  // Calculate scrollbar width
  const calculateScrollbarWidth = () => {
    if (!body.style.getPropertyValue("--scrollbar-width")) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${scrollbarWidth}px`
      );
    }
  };

  // Initialize scrollbar width
  calculateScrollbarWidth();
  window.addEventListener("resize", calculateScrollbarWidth);

  // Toggle search function
  const toggleSearch = (isActive) => {
    if (isActive) {
      document.querySelector(".cart-dropdown")?.classList.remove("active");
      searchOverlay.classList.add("active");
      body.classList.add("html-search-active");
      searchInput?.focus();
    } else {
      searchOverlay.classList.remove("active");
      body.classList.remove("html-search-active");
    }
  };

  // Prevent mouse/touch scrolling
  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // Prevent keyboard scrolling
  function preventScrollKeys(e) {
    if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
      e.preventDefault();
      return false;
    }
  }

  // Search toggle
  if (searchButton && searchOverlay) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      toggleSearch(true);
    });

    searchOverlay.addEventListener("click", function (e) {
      if (e.target === searchOverlay) toggleSearch(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") toggleSearch(false);
    });
  }

  // Search input event
  if (searchInput && searchPreview) {
    searchInput.addEventListener("input", function () {
      const hasContent = this.value.trim().length > 0;
      searchPreview.style.display = hasContent ? "block" : "none";

      if (hasContent) {
        searchPreview.innerHTML = `
          <div class="search-result">
            <h4>نتایج جستجو برای: ${this.value}</h4>
            <p>نمونه نتیجه جستجو</p>
          </div>
        `;
      }
    });
  }

  // FIXED CART FUNCTIONALITY - UPDATED VERSION
  if (cartIcon && cartDropdown && navItemsRight) {
    console.log("Initializing cart functionality");

    // Add click handler to cart icon
    cartIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent click event from bubbling up
      console.log("Cart icon clicked");

      // Close search if open
      if (searchOverlay?.classList.contains("active")) {
        toggleSearch(false);
      }

      // Toggle cart dropdown visibility
      cartDropdown.classList.toggle("active");
    });

    // Close cart dropdown when clicking outside (improved RTL support)
    document.addEventListener("click", function (e) {
      const isClickInsideCart =
        e.target.closest(".cart-icon") || e.target.closest(".cart-dropdown");

      if (!isClickInsideCart) {
        cartDropdown.classList.remove("active");
      }
    });

    // Keep dropdown open when clicking inside
    cartDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Close dropdown when scrolling (optional)
    window.addEventListener("scroll", function () {
      if (cartDropdown.classList.contains("active")) {
        cartDropdown.classList.remove("active");
      }
    });
  } else {
    console.error("Cart elements not found - please check:", {
      cartIcon: !!cartIcon,
      cartDropdown: !!cartDropdown,
      navItemsRight: !!navItemsRight,
    });
  }
  // Close overlays when clicking nav items
  document.querySelectorAll(".nav-item, .dropdown-main").forEach((item) => {
    item.addEventListener("click", () => {
      searchOverlay?.classList.remove("active");
      body.classList.remove("html-search-active");
      document.querySelector(".cart-dropdown")?.classList.remove("active");
    });
  });
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".nav-links") &&
      !e.target.closest(".mobile-menu-toggle")
    ) {
      navLinks.classList.remove("active");
    }
  });

  // Dropdown toggle for mobile
  const dropdowns = document.querySelectorAll(".dropdown, .nested-dropdown");
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(
      ".dropdown-main, .nested-dropdown-main"
    );
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          dropdown.classList.toggle("active");
        }
      });
    }
  });
});
// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Dropdown functionality for mobile
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const dropdownMain = dropdown.querySelector(".dropdown-main");

  dropdownMain.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("active");

      // Close other open dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (
          otherDropdown !== dropdown &&
          otherDropdown.classList.contains("active")
        ) {
          otherDropdown.classList.remove("active");
        }
      });
    }
  });
});

// Nested dropdown functionality for mobile
const nestedDropdowns = document.querySelectorAll(".nested-dropdown");
nestedDropdowns.forEach((nestedDropdown) => {
  const nestedMain = nestedDropdown.querySelector(".nested-dropdown-main");

  nestedMain.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      nestedDropdown.classList.toggle("active");

      // Close other open nested dropdowns at the same level
      nestedDropdowns.forEach((otherNested) => {
        if (
          otherNested !== nestedDropdown &&
          otherNested.parentElement === nestedDropdown.parentElement &&
          otherNested.classList.contains("active")
        ) {
          otherNested.classList.remove("active");
        }
      });
    }
  });
});

// Cart dropdown functionality
const cartIcon = document.querySelector(".cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");

cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartDropdown.classList.toggle("active");
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown") && !e.target.closest(".menu-toggle")) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }

  if (!e.target.closest(".nested-dropdown")) {
    nestedDropdowns.forEach((nestedDropdown) => {
      nestedDropdown.classList.remove("active");
    });
  }

  if (!e.target.closest(".cart-icon-container")) {
    cartDropdown.classList.remove("active");
  }

  if (
    !e.target.closest(".nav-links") &&
    !e.target.closest(".menu-toggle") &&
    window.innerWidth <= 768
  ) {
    navLinks.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});
