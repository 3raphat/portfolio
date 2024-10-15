document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-container a");
  const sections = document.querySelectorAll("section");

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

  const scrollToTopBtn = document.getElementById("scroll-to-top");

  function toggleScrollToTopButton() {
    scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  scrollToTopBtn.addEventListener("click", scrollToTop);
  window.addEventListener("scroll", toggleScrollToTopButton);

  window.addEventListener("scroll", setActiveLink);

  navLinks.forEach((link) => link.addEventListener("click", smoothScroll));

  const footerLinks = document.querySelectorAll(".footer-links a");
  footerLinks.forEach((link) => link.addEventListener("click", smoothScroll));

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
  let konamiCompleted = false;

  document.addEventListener("keydown", (e) => {
    if (konamiCompleted) return;

    const expectedKey = konamiCode[konamiIndex];
    if (expectedKey === "a" || expectedKey === "b" ? e.key.toLowerCase() === expectedKey : e.key === expectedKey) {
      const keyElement = document.querySelector(`.keyboard-container span:nth-child(${konamiIndex + 1})`);
      if (keyElement) {
        const audio = new Audio("assets/audio/correct.mp3");
        audio.volume = 0.2;
        audio.play();

        keyElement.classList.add("active");
      }
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        revealProfileInfo();
        konamiCompleted = true;
        resetKeyboardColors();
      }
    } else if (konamiIndex > 0) {
      const audio = new Audio("assets/audio/wrong.mp3");
      audio.volume = 0.2;
      audio.play();

      const keyElements = document.querySelectorAll(".keyboard-container span");
      keyElements.forEach((element) => {
        element.classList.add("wrong");
        setTimeout(() => {
          element.classList.remove("wrong");
        }, 500);
      });

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
