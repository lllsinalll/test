document.addEventListener("DOMContentLoaded", () => {
  // Character Counter Functionality
  const initCharacterCounter = () => {
    const messageField = document.getElementById("message");
    const charCount = document.getElementById("char-count");
    const warningMessage = document.getElementById("warning-message");

    if (messageField && charCount && warningMessage) {
      const updateCounter = () => {
        const currentLength = messageField.value.length;
        charCount.textContent = currentLength;

        if (currentLength >= 500) {
          messageField.value = messageField.value.substring(0, 500);
          charCount.parentElement.classList.add("limit-exceeded");
          warningMessage.style.display = "block";
        } else if (currentLength >= 450) {
          charCount.parentElement.classList.add("limit-exceeded");
          warningMessage.style.display = "none";
        } else {
          charCount.parentElement.classList.remove("limit-exceeded");
          warningMessage.style.display = "none";
        }
      };

      messageField.addEventListener("input", updateCounter);
      updateCounter(); // Initialize counter
    }
  };

  // Smooth Scroll Functionality
  const initSmoothScroll = () => {
    if (CSS.supports("scroll-behavior", "smooth")) {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });
    }
  };

  // Search Functionality
  // Search Functionality
  const initSearch = () => {
    const searchButton = document.querySelector(".search-button");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchInput = document.getElementById("searchInput");
    const searchPreview = document.getElementById("searchPreview");

    let scrollPosition = 0;

    const toggleSearch = (open = true) => {
      if (open) {
        // Save scroll position
        scrollPosition = window.scrollY || window.pageYOffset;

        // Apply fixed positioning while keeping scrollbar
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.overflowY = "scroll"; // Force scrollbar to stay

        // Show overlay
        searchOverlay.classList.add("active");
        if (searchInput) searchInput.focus();
      } else {
        // Remove fixed positioning
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";

        // Restore scroll position
        const scrollTo = scrollPosition;
        document.body.style.top = "";
        window.scrollTo(0, scrollTo);

        // Hide overlay
        searchOverlay.classList.remove("active");
      }
    };

    // Rest of your event handlers remain the same...
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSearch(true);
    });

    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) toggleSearch(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggleSearch(false);
    });

    // Keep your existing search input handling...
    if (searchInput && searchPreview) {
      searchInput.addEventListener("input", function () {
        const query = this.value.trim();
        const hasContent = query.length > 0;

        searchPreview.classList.toggle("active", hasContent);

        if (hasContent) {
          searchPreview.innerHTML = `
            <div class="search-result">
              <h4>نتایج جستجو برای: ${this.value}</h4>
              <p>نمونه نتیجه جستجو</p>
            </div>
          `;
        } else {
          searchPreview.innerHTML = "";
        }
      });
    }
  };

  // Floating Labels
  const initFloatingLabels = () => {
    document.querySelectorAll(".form-control").forEach((input) => {
      const label = input.nextElementSibling;
      if (!label || !label.matches("label")) return;

      const updateLabel = () => {
        label.style.opacity = input.value.trim() ? "0" : "1";
      };

      input.addEventListener("input", updateLabel);
      input.addEventListener("blur", updateLabel);
      updateLabel(); // Initial state
    });
  };

  // Initialize all components
  initCharacterCounter();
  initSmoothScroll();
  initSearch();
  initFloatingLabels();
});
