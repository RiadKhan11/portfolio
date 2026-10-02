const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('#home, #work, #education, #publication, #cv, #contact')];

// Active nav item based on visible section.
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-38% 0px -52% 0px', threshold: 0 }
);
sections.forEach(section => sectionObserver.observe(section));

// Mobile navigation.
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

// Publication filters.
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

function showPublications(filter) {

  publicationItems.forEach(item => {
    if (filter === 'all') {
      item.classList.remove('hidden');
    } 
    else if (item.dataset.type === filter) {
      item.classList.remove('hidden');
    } 
    else {
      item.classList.add('hidden');
    }
  });

  filterButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
}


// Initial page load: show ALL
showPublications('all');


// Button clicks
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    showPublications(button.dataset.filter);
  });
});

console.log(document.querySelectorAll('.publication-item.hidden').length);


// Scroll reveal.
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealItems.forEach(item => revealObserver.observe(item));

// Footer year.
document.getElementById('year').textContent = new Date().getFullYear();
