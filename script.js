const grid = document.querySelector("#internship-grid");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const clearButton = document.querySelector("#clear-filters");
const resultCount = document.querySelector("#result-count");
const statusMessage = document.querySelector("#status-message");

let internships = [];

function createCard(internship) {
  const card = document.createElement("article");
  card.className = "internship-card";

  const top = document.createElement("div");
  top.className = "card-top";

  const mark = document.createElement("span");
  mark.className = "company-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = internship.company.charAt(0).toUpperCase();

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = internship.type;

  top.append(mark, tag);

  const title = document.createElement("h3");
  title.textContent = internship.title;

  const company = document.createElement("p");
  company.className = "company";
  company.textContent = internship.company;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const domain = document.createElement("span");
  domain.textContent = internship.domain;

  const location = document.createElement("span");
  location.textContent = `📍 ${internship.location}`;

  const duration = document.createElement("span");
  duration.textContent = `◷ ${internship.duration}`;

  meta.append(domain, location, duration);
  card.append(top, title, company, meta);
  return card;
}

function renderInternships(items) {
  grid.replaceChildren();
  resultCount.textContent = `${items.length} ${items.length === 1 ? "opportunity" : "opportunities"} found`;
  statusMessage.className = "status-message";

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const heading = document.createElement("h3");
    heading.textContent = "No internships found";
    const message = document.createElement("p");
    message.textContent = "Try a different keyword or clear your filters.";
    empty.append(heading, message);
    grid.append(empty);
    statusMessage.textContent = "No results match your search.";
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((internship) => fragment.append(createCard(internship)));
  grid.append(fragment);
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDomain = domainFilter.value;

  const filtered = internships.filter((item) => {
    const searchableText = `${item.title} ${item.company} ${item.domain} ${item.location}`.toLowerCase();
    const matchesSearch = searchableText.includes(query);
    const matchesDomain = selectedDomain === "all" || item.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  renderInternships(filtered);
}

async function loadInternships() {
  try {
    const response = await fetch("internships.json");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const records = await response.json();
    if (!Array.isArray(records)) throw new Error("Internship data must be a list.");
    internships = records;
    applyFilters();
  } catch (error) {
    console.error("Could not load internship records:", error);
    resultCount.textContent = "Internships unavailable";
    statusMessage.className = "status-message error";
    statusMessage.textContent = "We couldn't load internships right now. Please run the project with a local server and refresh the page.";
    grid.replaceChildren();
  }
}

searchInput.addEventListener("input", applyFilters);
domainFilter.addEventListener("change", applyFilters);
clearButton.addEventListener("click", () => {
  searchInput.value = "";
  domainFilter.value = "all";
  applyFilters();
});

loadInternships();
