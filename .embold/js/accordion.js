const accordions = document.querySelectorAll('.accordion-header');

accordions.forEach(acc => {
  acc.addEventListener('click', () => {
    acc.classList.toggle('active');
  });
});
