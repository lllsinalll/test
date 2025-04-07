document.addEventListener("DOMContentLoaded", () => {
  const animateOnScroll = () => {
    const elements = [
      {
        element: document.querySelector(".section-title"),
        class: "visible",
      },
      { element: document.querySelector(".divider"), class: "visible" },
      {
        element: document.querySelector(".description"),
        class: "visible",
      },
      ...Array.from(document.querySelectorAll(".feature-card")).map((el) => ({
        element: el,
        class: "visible",
      })),
      {
        element: document.querySelector(".how-it-works"),
        class: "visible",
      },
      {
        element: document.querySelector(".big-button"),
        class: "visible",
      },
    ];

    elements.forEach(({ element, class: className }) => {
      if (element && isElementInViewport(element)) {
        element.classList.add(className);
      }
    });
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});
