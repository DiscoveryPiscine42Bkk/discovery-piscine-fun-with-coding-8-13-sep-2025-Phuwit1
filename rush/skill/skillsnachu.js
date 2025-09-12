document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('skillTrack');
  const prev = document.getElementById('skillPrev');
  const next = document.getElementById('skillNext');


  const skills = [
    { title: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { title: 'HTML', icon: './logo/html5.png'},
    { title: 'CSS', icon: './logo/css3.png' },
    { title: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { title: 'Next.js', icon: './logo/Next.png' },
    { title: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { title: 'TailwindCSS', icon: './logo/tailwind1.png' },
    { title: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
   
  ];

  skills.forEach(s => {
    const card = document.createElement('div');
    card.className = "flex-shrink-0 w-40 snap-start bg-white/5 border border-white/10 rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition";
    card.innerHTML = `
      <img src="${s.icon}" alt="${s.title}" class="w-12 h-12 mb-2">
      <h3 class="text-sm font-medium text-gray-200">${s.title}</h3>
    `;
    track.appendChild(card);
  });


  let step = 180;
  function updateArrows() {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    prev.style.opacity = track.scrollLeft <= 0 ? '0.4' : '1';
    next.style.opacity = track.scrollLeft >= maxScroll ? '0.4' : '1';
  }

  prev.addEventListener('click', () => track.scrollBy({ left: -step, behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step, behavior: 'smooth' }));
  track.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();
});
