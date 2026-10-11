const navs=[...document.querySelectorAll('[data-nav]')];
const chapters=[...document.querySelectorAll('.chapter')];
function updateReading(){const top=window.scrollY;document.querySelector('.progress>div').style.width=`${Math.min(100,top/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)}%`;let current=chapters[0];for(const chapter of chapters){if(chapter.getBoundingClientRect().top<=170)current=chapter;}for(const nav of navs){const active=nav.dataset.nav===current.id;nav.classList.toggle('active',active);if(active)nav.setAttribute('aria-current','location');else nav.removeAttribute('aria-current');}}
addEventListener('scroll',updateReading,{passive:true});addEventListener('resize',updateReading);updateReading();
