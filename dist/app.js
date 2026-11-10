(function () {
  const { timeline, projects } = window.PORTFOLIO;
  const host = document.querySelector("#timeline");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Keep the layout and interaction breakpoint together. A coarse pointer is
  // treated as a disclosure, even when a device also has a mouse attached.
  const disclosureMode = matchMedia("(max-width: 720px), (hover: none), (pointer: coarse)");
  const esc = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const casesFor = milestone => milestone.projects.map(id => projects[id]).filter(Boolean);
  const card = project => {
    const image = project.public && project.cover ? `<img src="assets/${esc(project.cover)}" alt="${esc(project.title)}" loading="lazy">` : (project.logo ? `<img class="case-card-logo" src="assets/${esc(project.logo)}" alt="${esc(project.source)}" loading="lazy">` : "");
    const brand = project.public && project.logo ? `<img class="case-card-brand" src="assets/${esc(project.logo)}" alt="${esc(project.source)}" loading="lazy">` : "";
    const state = project.public ? "" : `<span class="case-state">${esc(project.status || "Case in development")}</span>`;
    return `<a class="case-card project-${esc(project.id)} ${project.public ? "" : "is-development"}" href="projects/${esc(project.slug)}/"><span class="case-card-media">${image}${brand}<span class="case-card-placeholder" aria-hidden="true">↗</span></span><span class="case-card-body"><span class="case-card-meta">${esc(project.source)} · ${esc(project.type)}</span><strong>${esc(project.title)}</strong><span>${esc(project.summary)}</span>${state}</span></a>`;
  };
  const panel = milestone => {
    const cases = casesFor(milestone);
    return cases.length ? `<div class="case-card-list" tabindex="0" aria-label="Related projects. Scroll horizontally to browse.">${cases.map(card).join("")}</div>` : `<div class="journey-empty"><p class="eyebrow">${milestone.kind === "work" ? "Work milestone" : "Education milestone"}</p><p>No public case is linked to this milestone yet.</p></div>`;
  };
  const milestone = (item, index) => {
    const hasCases = casesFor(item).length > 0;
    const control = hasCases ? `<button class="milestone-select" type="button" aria-expanded="false" aria-controls="mobile-panel-${esc(item.id)}"><span class="sr-only">Show related cases for </span>${esc(item.title)}<span class="milestone-arrow" aria-hidden="true">↓</span></button>` : `<h3>${esc(item.title)}</h3>`;
    return `<article class="timeline-item journey-milestone reveal ${hasCases ? "has-cases" : ""}" data-milestone="${esc(item.id)}" data-index="${index}"><div class="timeline-date">${esc(item.period)}</div><div class="timeline-dot" aria-hidden="true"></div><div class="timeline-content"><p class="timeline-meta">${esc(item.meta)} · ${item.kind}</p>${control}<p>${esc(item.copy)}</p></div>${hasCases ? `<div class="mobile-case-panel" id="mobile-panel-${esc(item.id)}" hidden>${panel(item)}</div>` : ""}</article>`;
  };
  host.innerHTML = timeline.map(milestone).join("");
  function setPanelOpen(element, open, animate = true) {
    const button = element.querySelector(".milestone-select");
    const projectPanel = element.querySelector(".mobile-case-panel");
    element.classList.toggle("is-active", open);
    button.setAttribute("aria-expanded", String(open));
    if (!projectPanel) return;
    clearTimeout(projectPanel._hideTimer);
    if (open) {
      projectPanel.hidden = false;
      if (animate && !disclosureMode.matches) {
        void projectPanel.offsetHeight;
        requestAnimationFrame(() => projectPanel.classList.add("is-open"));
      } else projectPanel.classList.add("is-open");
      return;
    }
    projectPanel.classList.remove("is-open");
    if (animate && !disclosureMode.matches) {
      projectPanel._hideTimer = setTimeout(() => {
        if (!element.classList.contains("is-active")) projectPanel.hidden = true;
      }, 1100);
    } else projectPanel.hidden = true;
  }
  function activate(element) {
    const item = timeline[Number(element.dataset.index)];
    if (!item || !casesFor(item).length) return;
    interactive.forEach(node => { if (node !== element) setPanelOpen(node, false); });
    setPanelOpen(element, true);
  }
  const interactive = [...host.querySelectorAll(".journey-milestone.has-cases")];
  interactive.forEach(item => {
    item.addEventListener("pointerenter", event => {
      if (!disclosureMode.matches && event.pointerType !== "touch") activate(item);
    });
    item.addEventListener("focusin", () => activate(item));
    const button = item.querySelector(".milestone-select");
    button.addEventListener("click", () => {
      if (!disclosureMode.matches) return;
      const open = button.getAttribute("aria-expanded") === "true";
      interactive.forEach(other => { if (other !== item) setPanelOpen(other, false, false); });
      setPanelOpen(item, !open, false);
    });
    const rail = item.querySelector(".case-card-list");
    if (rail) {
      rail.addEventListener("wheel", event => {
        if (disclosureMode.matches || rail.scrollWidth <= rail.clientWidth || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
        const maxScroll = rail.scrollWidth - rail.clientWidth;
        const atStart = rail.scrollLeft <= 1;
        const atEnd = rail.scrollLeft >= maxScroll - 1;
        // Hand the wheel back to the page once the horizontal rail has reached
        // the relevant edge, so a visitor can continue through the journey.
        if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;
        event.preventDefault();
        rail.scrollBy({ left: event.deltaY, behavior: reduceMotion ? "auto" : "smooth" });
      }, { passive: false });
      rail.addEventListener("keydown", event => {
        if (event.target !== rail || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        rail.scrollBy({ left: event.key === "ArrowRight" ? 260 : -260, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
  if (reduceMotion) document.querySelectorAll(".mobile-case-panel").forEach(panel => panel.style.transition = "none");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
  } else document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
}());

/* Skills are navigable entry points to the relevant project selection. */
(function () {
  const labels = {
    "SolidWorks":"SolidWorks", "Fusion 360":"Fusion 360", "Rhino":"Rhino", "Grasshopper":"Grasshopper", "Python":"Python", "Arduino":"Arduino", "Figma":"Figma", "Working with ChatGPT":"Working with ChatGPT", "Blender":"Blender",
    "Adobe Photoshop":"Adobe Photoshop", "Adobe Illustrator":"Adobe Illustrator", "Adobe InDesign":"Adobe InDesign", "Design schetsen":"Design Sketching", "Reframing":"Reframing", "Lassen":"Welding"
  };
  const extra = ["Play Design", "Service Design", "Behavioural Design", "Engineering Related Design"];
  const title = document.querySelector("#software-title");
  if (!title) return;
  title.textContent = "Software Skills";
  document.querySelector("#other-skills-title").textContent = "Other Skills";
  document.querySelectorAll(".skill-grid li, .other-skills li").forEach(item => {
    const name = item.querySelector("b");
    if (!name) return;
    if (labels[name.textContent]) name.textContent = labels[name.textContent];
    const level = item.querySelector("span");
    if (level) level.textContent = level.textContent.replace("Zeer ervaren", "Highly experienced").replace("Gemiddelde kennis", "Intermediate").replace("Basiskennis", "Basic").replace("Basis tot gemiddeld", "Basic to intermediate").replace("Bovengemiddeld", "Above intermediate").replace("Gevorderd", "Advanced").replace("Ontwerpmethode", "Design method").replace("Basis", "Basic").replace("Ervaren", "Experienced");
    item.classList.add("skill-link"); item.tabIndex = 0; item.setAttribute("role", "link");
    const open = () => location.href = `skills/?skill=${encodeURIComponent(name.textContent)}`;
    item.addEventListener("click", open); item.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
  const list = document.querySelector(".other-skills ul");
  extra.forEach(name => { const item = document.createElement("li"); item.className = "skill-link"; item.tabIndex = 0; item.setAttribute("role", "link"); item.innerHTML = `<div><b>${name}</b><span>Design approach</span></div>`; const open = () => location.href = `skills/?skill=${encodeURIComponent(name)}`; item.addEventListener("click", open); item.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } }); list.append(item); });
  const adobeLogos = {"Adobe Photoshop":"adobe-photoshop.png","Adobe Illustrator":"adobe-illustrator.png","Adobe InDesign":"adobe-indesign.png"};
  document.querySelectorAll(".adobe-skill").forEach(item => { const name = item.querySelector("b")?.textContent; const file = adobeLogos[name]; if (file) item.insertAdjacentHTML("afterbegin", `<img src="assets/skills/${file}" alt="${name} logo">`); });
  document.querySelectorAll(".adobe-skill span").forEach(level => level.textContent = "5 / 5 · Highly experienced");
  document.querySelectorAll(".adobe-skill").forEach(item => item.insertAdjacentHTML("beforeend", '<i class="skill-rating" style="--rating:5" aria-label="5 out of 5"></i>'));
  document.querySelectorAll(".skill-grid li").forEach(item => { const name=item.querySelector("b")?.textContent; if(name==="Rhino") { item.querySelector("span").textContent="3 / 5 · Intermediate"; item.querySelector(".skill-rating").style.setProperty("--rating",3); } if(name==="Grasshopper") { item.querySelector("span").textContent="4 / 5 · Above intermediate"; item.querySelector(".skill-rating").style.setProperty("--rating",4); } });
}());
