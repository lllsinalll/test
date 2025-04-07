document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");

  // Search functionality elements
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
      searchOverlay?.classList.add("active");
      body.classList.add("html-search-active");
      searchInput?.focus();
    } else {
      searchOverlay?.classList.remove("active");
      body.classList.remove("html-search-active");
    }
  };

  // Search toggle
  if (searchButton && searchOverlay) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      toggleSearch(true);
    });

    searchOverlay?.addEventListener("click", function (e) {
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

  // Close overlays when clicking nav items
  const faqQuestions = document.querySelectorAll(".faq-question");

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      // Add click event to each FAQ question
      question.addEventListener("click", function () {
        // Find the parent .faq-card element
        const faqCard = question.closest(".faq-card");

        if (faqCard) {
          // Toggle the 'active' class on the parent .faq-card
          faqCard.classList.toggle("active");
        }
      });
    });
  } else {
    console.warn("No FAQ questions found on the page");
  }
});
