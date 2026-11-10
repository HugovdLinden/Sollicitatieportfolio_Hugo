(function(){
  const slug=document.body.dataset.project,p=window.PORTFOLIO.projects[slug];
  if(!p){location.href='../../';return}
  document.title=`${p.title} | Hugo van der Linden`;
  const heroMedia=p.video?`<video autoplay muted loop playsinline poster="../../assets/${p.image}" aria-label="${p.title} project video"><source src="../../assets/${p.video}" type="video/mp4"></video>`:`<img src="../../assets/${p.image}" alt="${p.title}">`;
  document.querySelector('#case').innerHTML=`
    <section class="case-hero">${heroMedia}<div><p class="eyebrow">${p.period} · ${p.role}</p><h1>${p.title}</h1><p class="case-summary">${p.summary}</p></div></section>
    <main class="case-main"><section class="case-intro"><h2>The design<br><em>challenge.</em></h2><div><p>${p.challenge}</p><p>${p.story}</p></div></section>
    <section class="facts"><div><b>Role</b>${p.role}</div><div><b>Context</b>${p.phase}</div><div><b>Focus</b>${p.outcomes[0]}</div></section>
    <section class="case-gallery" aria-label="Project images"><img src="../../assets/${p.gallery[0]}" alt="${p.title} development image" loading="lazy">${p.gallery[1]?`<img src="../../assets/${p.gallery[1]}" alt="${p.title} detail" loading="lazy">`:''}</section>
    <section class="case-intro"><h2>What it<br><em>delivers.</em></h2><ul>${p.outcomes.map(o=>`<li>${o}</li>`).join('')}</ul></section>
    <nav class="next-case" aria-label="Continue through portfolio"><p class="eyebrow">Next case study</p><a href="../${p.next}/">${window.PORTFOLIO.projects[p.next].title} <span aria-hidden="true">↗</span></a></nav></main>`;
}());
