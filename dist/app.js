(function () {
  const { timeline, projects } = window.PORTFOLIO;
  const host = document.querySelector("#timeline");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileJourney = matchMedia("(max-width: 720px), (hover: none)");
  const esc = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const casesFor = milestone => milestone.projects.map(id => projects[id]).filter(Boolean);
  const card = project => {
    const image = project.public && project.cover ? `<img src="assets/${esc(project.cover)}" alt="${esc(project.title)}" loading="lazy">` : (project.logo ? `<img class="case-card-logo" src="assets/${esc(project.logo)}" alt="${esc(project.source)}" loading="lazy">` : "");
    const state = project.public ? "" : `<span class="case-state">${esc(project.status || "Case in development")}</span>`;
    return `<a class="case-card ${project.public ? "" : "is-development"}" href="projects/${esc(project.slug)}/"><span class="case-card-media">${image}<span class="case-card-placeholder" aria-hidden="true">↗</span></span><span class="case-card-body"><span class="case-card-meta">${esc(project.source)} · ${esc(project.type)}</span><strong>${esc(project.title)}</strong><span>${esc(project.summary)}</span>${state}</span></a>`;
  };
  const panel = milestone => {
    const cases = casesFor(milestone);
    return cases.length ? `<div class="case-card-list">${cases.map(card).join("")}</div>` : `<div class="journey-empty"><p class="eyebrow">${milestone.kind === "work" ? "Work milestone" : "Education milestone"}</p><p>No public case is linked to this milestone yet.</p></div>`;
  };
  const milestone = (item, index) => {
    const hasCases = casesFor(item).length > 0;
    const control = hasCases ? `<button class="milestone-select" type="button" aria-expanded="false" aria-controls="mobile-panel-${esc(item.id)}"><span class="sr-only">Show related cases for </span>${esc(item.title)}<span class="milestone-arrow" aria-hidden="true">↓</span></button>` : `<h3>${esc(item.title)}</h3>`;
    return `<article class="timeline-item journey-milestone reveal ${hasCases ? "has-cases" : ""}" data-milestone="${esc(item.id)}" data-index="${index}"><div class="timeline-date">${esc(item.period)}</div><div class="timeline-dot" aria-hidden="true"></div><div class="timeline-content"><p class="timeline-meta">${esc(item.meta)} · ${item.kind}</p>${control}<p>${esc(item.copy)}</p></div>${hasCases ? `<div class="mobile-case-panel" id="mobile-panel-${esc(item.id)}" hidden>${panel(item)}</div>` : ""}</article>`;
  };
  host.innerHTML = timeline.map(milestone).join("");
  function activate(element) {
    const item = timeline[Number(element.dataset.index)];
    if (!item || !casesFor(item).length) return;
    host.querySelectorAll(".journey-milestone.is-active").forEach(node => { node.classList.remove("is-active"); const panel = node.querySelector(".mobile-case-panel"); if (panel) { panel.classList.remove("is-open"); clearTimeout(panel._hideTimer); panel._hideTimer = setTimeout(() => { if (!node.classList.contains("is-active")) panel.hidden = true; }, 520); } });
    element.classList.add("is-active");
    const projectPanel = element.querySelector(".mobile-case-panel");
    if (!mobileJourney.matches && projectPanel) {
      projectPanel.hidden = false;
      element.querySelector(".milestone-select").setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => projectPanel.classList.add("is-open"));
    }
  }
  const interactive = [...host.querySelectorAll(".journey-milestone.has-cases")];
  interactive.forEach(item => {
    item.addEventListener("mouseenter", () => activate(item));
    item.addEventListener("focusin", () => activate(item));
    item.addEventListener("mouseleave", () => {
      if (!mobileJourney.matches) {
        item.classList.remove("is-active");
        const projectPanel = item.querySelector(".mobile-case-panel");
        if (projectPanel) { projectPanel.classList.remove("is-open"); clearTimeout(projectPanel._hideTimer); projectPanel._hideTimer = setTimeout(() => { if (!item.classList.contains("is-active")) projectPanel.hidden = true; }, 520); }
        item.querySelector(".milestone-select").setAttribute("aria-expanded", "false");
      }
    });
    const button = item.querySelector(".milestone-select");
    button.addEventListener("click", () => {
      if (!mobileJourney.matches) return;
      const mobilePanel = item.querySelector(".mobile-case-panel");
      const open = button.getAttribute("aria-expanded") === "true";
      interactive.forEach(other => { other.querySelector(".milestone-select").setAttribute("aria-expanded", "false"); const otherPanel = other.querySelector(".mobile-case-panel"); if (otherPanel) otherPanel.hidden = true; });
      button.setAttribute("aria-expanded", String(!open));
      mobilePanel.hidden = open;
      mobilePanel.classList.toggle("is-open", !open);
      if (!open) activate(item);
    });
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
  if (reduceMotion) document.querySelectorAll(".mobile-case-panel").forEach(panel => panel.style.transition = "none");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
  } else document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
}());
