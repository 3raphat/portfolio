const html = String.raw;

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-container a");
  const sections = document.querySelectorAll("section");
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  function toggleTheme() {
    body.classList.toggle("dark");
    updateButtonText();
    saveThemePreference();
  }

  function updateButtonText() {
    const sunIcon = html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path
          d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    `;
    const moonIcon = html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path
          d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
    themeToggle.innerHTML = body.classList.contains("dark") ? sunIcon : moonIcon;
  }

  function saveThemePreference() {
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
  }

  function loadThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark");
    }
    updateButtonText();
  }

  function setActiveLink() {
    const scrollPosition = window.scrollY + 100;
    let activeIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      if (scrollPosition >= sections[i].offsetTop) {
        activeIndex = i;
      } else {
        break;
      }
    }

    navLinks.forEach((link, index) => {
      if (index === activeIndex) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function smoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  }

  function toggleScrollToTopButton() {
    scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  themeToggle.addEventListener("click", toggleTheme);

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("scroll", toggleScrollToTopButton);

  navLinks.forEach((link) => link.addEventListener("click", smoothScroll));
  const footerLinks = document.querySelectorAll(".footer-links a");
  footerLinks.forEach((link) => link.addEventListener("click", smoothScroll));
  scrollToTopBtn.addEventListener("click", scrollToTop);

  loadThemePreference();
  setActiveLink();

  function greeting() {
    const greetingText = document.getElementById("greeting-text");
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      greetingText.textContent = "Good morning ☀️, ";
    } else if (currentHour < 18) {
      greetingText.textContent = "Good afternoon 🌤️, ";
    } else {
      greetingText.textContent = "Good evening 🌙, ";
    }
  }

  greeting();

  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const message = formData.get("message");

    const subject = `Contact Form Submission from ${name}`;
    const body = `Name: ${name}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:treeraphat234@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;

    window.location.href = mailtoLink;

    contactForm.reset();
  });

  const projectsContainer = document.querySelector(".projects-container");
  const projects = [
    {
      name: "Sana - Discord music bot",
      description: "A Discord music bot that aims to be free to use for everyone.",
      link: "https://sanamusicbot.vercel.app",
    },
    {
      name: "Pokédex",
      description: "A Pokémon encyclopedia that allows you to search for Pokémon and view their details.",
      link: "https://pokedex-nine-weld-67.vercel.app",
    },
    {
      name: "QR Craft",
      description: "Simple and clean QR code generator/reader.",
      link: "https://qr-craft.vercel.app",
    },
    {
      name: "Sync playlist (YouTube Music -> Spotify)",
      description: "Sync your playlist from YouTube Music to Spotify by using GitHub Action.",
      link: "https://github.com/3raphat/sync-playlist",
    },
    {
      name: "TempCodeBin",
      description: "A temporary storage and sharing platform for code snippets with others.",
      link: "https://tempcodebin.vercel.app",
    },
  ];

  projects.forEach((project) => {
    const projectCard = document.createElement("a");
    projectCard.className = "project-card";
    projectCard.href = project.link;
    projectCard.target = "_blank";
    projectCard.rel = "noopener noreferrer";
    projectCard.innerHTML = html`
      <div class="project-info">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      </div>
    `;
    projectsContainer.appendChild(projectCard);
  });

  function fetchQuote() {
    const quoteContainer = document.querySelector(".quote-container");
    quoteContainer.innerHTML = "<p>Loading quote...</p>";

    fetch("https://quotes-api-self.vercel.app/quote")
      .then((response) => response.json())
      .then((data) => {
        const quote = data.quote.replace("“", "").replace("”", "");

        quoteContainer.innerHTML = html`
          <blockquote>
            <span class="quote-mark">&ldquo;</span>${quote}<span class="quote-mark">&rdquo;</span>
            <footer>&mdash; ${data.author}</footer>
          </blockquote>
        `;
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        quoteContainer.innerHTML = "<p>Failed to load quote. Please-in try again later.</p>";
      });
    quoteContainer.innerHTML = "<p>Failed to load quote. Please-in try again later.</p>";
  }

  fetchQuote();

  const sr = ScrollReveal({
    origin: "bottom",
    distance: "20px",
    duration: 1000,
    delay: 200,
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    reset: false,
  });

  sr.reveal("#konami-code-container", { origin: "top" });

  sr.reveal(".profile-container", { origin: "left" });
  sr.reveal(".divider", { origin: "top", distance: "10px" });
  sr.reveal(".nav-container", { origin: "top", distance: "40px" });

  sr.reveal("#about .section-header", { origin: "left" });
  sr.reveal("#about .about-text", { origin: "right" });

  sr.reveal("#education .section-header", { origin: "right" });
  sr.reveal("#education .education-item", { interval: 200 });

  sr.reveal("#skills .section-header", { origin: "left" });
  sr.reveal("#skills .skill-category", { interval: 200 });

  sr.reveal("#projects .section-header", { origin: "right" });
  sr.reveal("#projects .project-card", { interval: 200 });

  sr.reveal("#contact .section-header", { origin: "left" });
  sr.reveal("#contact .social-links, #contact .contact-form", { interval: 200 });
  sr.reveal("#contact .social-links li", { interval: 100 });
  sr.reveal("#contact .contact-form .form-group", { interval: 100 });

  sr.reveal(".quote-container", { distance: "40px" });

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
    "Enter",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    const expectedKey = konamiCode[konamiIndex];
    if (expectedKey === "a" || expectedKey === "b" ? e.key.toLowerCase() === expectedKey : e.key === expectedKey) {
      const keyElement = document.querySelector(`.keyboard-container span:nth-child(${konamiIndex + 1})`);
      if (keyElement) {
        keyElement.classList.add("active");
      }
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        revealProfileInfo();
        konamiIndex = 0;
        resetKeyboardColors();
      }
    } else {
      konamiIndex = 0;
      resetKeyboardColors();
    }
  });

  function resetKeyboardColors() {
    const keyElements = document.querySelectorAll(".keyboard-container span");
    keyElements.forEach((element) => {
      element.classList.remove("active");
    });
  }

  function revealProfileInfo() {
    const keyboardContainer = document.querySelector(".keyboard-container");

    function animateText(message, delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          keyboardContainer.textContent = "";
          let index = 0;

          function typeText() {
            if (index < message.length) {
              keyboardContainer.textContent += message[index];
              index++;
              const randomDelay = Math.floor(Math.random() * (150 - 50 + 1)) + 50; // Random delay between 50ms and 150ms
              setTimeout(typeText, randomDelay);
            } else {
              resolve();
            }
          }

          typeText();
        }, delay);
      });
    }

    animateText("Decrypting my location...", 0).then(() => animateText("13.7563° N, 100.5018° E", 2000));
  }
});
