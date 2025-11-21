// Basic interactivity: search, update summary, TOC smooth scroll, year

document.addEventListener('DOMContentLoaded', function(){
  // set year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // search
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const content = document.getElementById('mainContent');

  function highlight(text){
    // remove old highlights
    const html = content.innerHTML.replace(/<mark class="highlight">(.*?)<\/mark>/g, '$1');
    content.innerHTML = html;

    if(!text) return;
    // naive highlight
    const regex = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
    content.innerHTML = content.innerHTML.replace(regex, function(m){
      return '<mark class="highlight">'+m+'</mark>'
    });
  }

  searchBtn.addEventListener('click', function(){
    highlight(searchInput.value.trim());
  });

  searchInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter') highlight(searchInput.value.trim());
  });

  // update summary
  const updateBtn = document.getElementById('updateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const editArea = document.getElementById('editArea');

  updateBtn.addEventListener('click', function(){
    const text = editArea.value.trim();
    if(!text) return alert('Tulis ringkesan dhisik.');
    // update the infobox paragraph (first p in .infobox)
    const infobox = document.querySelector('.infobox p');
    if(infobox) infobox.textContent = text;
    alert('Ringkesan wis diupdate.');
  });

  resetBtn.addEventListener('click', function(){
    editArea.value = 'Masukkan ringkesanmu ing kene...';
  });

  // smooth scroll for TOC
  document.querySelectorAll('.toc a').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth'});
    });
  });
});