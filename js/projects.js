const html = String.raw;

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-container");
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  const loadingElement = document.getElementById("loading");
  const backButton = document.getElementById("back-button");

  let currentPage = 1;
  let isLoading = false;
  let hasMoreProjects = true;
  let observer;
  let sentinel;

  function createProjectCard(repo, index) {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = repo.html_url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.style.animationDelay = `${index * 0.1}s`;

    const title = document.createElement("h3");
    title.textContent = repo.name;

    const description = document.createElement("p");
    description.textContent = repo.description || "No description available";

    const language = document.createElement("span");
    language.className = "language";

    repo.language
      ? (language.innerHTML = html`
          <img src="${getIconImageSrc(formatLanguage(repo.language))}" alt="${repo.language}" />
          <span>${repo.language}</span>
        `)
      : (language.textContent = "N/A");

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(language);

    return card;
  }

  function formatLanguage(language) {
    if (language === "HTML") {
      return "html5";
    } else if (language === "CSS") {
      return "css3";
    } else {
      return language;
    }
  }

  function toggleScrollToTopButton() {
    scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showLoading() {
    loadingElement.style.display = "flex";
  }

  function hideLoading() {
    loadingElement.style.display = "none";
  }

  function getIconImageSrc(iconName) {
    if (typeof iconName === "string")
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName.toLowerCase()}/${iconName.toLowerCase()}-original.svg`;
  }

  function fetchProjects() {
    if (isLoading || !hasMoreProjects) return;

    isLoading = true;
    showLoading();
    const apiUrl = `https://api.github.com/users/3raphat/repos?sort=updated&direction=desc&per_page=20&page=${currentPage}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          hasMoreProjects = false;
          hideLoading();
          if (observer && sentinel) {
            observer.unobserve(sentinel);
          }
          return;
        }

        data.forEach((repo, index) => {
          const projectCard = createProjectCard(repo, index);
          projectsContainer.insertBefore(projectCard, sentinel);
        });

        currentPage++;
        isLoading = false;
        hideLoading();
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        isLoading = false;
        hideLoading();
      });
  }

  function setupInfiniteScroll() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchProjects();
        }
      });
    }, options);

    sentinel = document.createElement("div");
    sentinel.id = "sentinel";
    projectsContainer.appendChild(sentinel);

    observer.observe(sentinel);
  }

  function goBack() {
    window.history.back();
  }

  backButton.addEventListener("click", goBack);

  fetchProjects();
  setupInfiniteScroll();

  window.addEventListener("scroll", toggleScrollToTopButton);
  scrollToTopBtn.addEventListener("click", scrollToTop);

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});
