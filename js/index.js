const burgerMenuButton = document.querySelector('.burger-menu-button');
const burgerMenuIcon = document.querySelector('.burger-menu-button i');
const burgerMenu = document.querySelector('.burger-menu');

burgerMenuButton.onclick = () => {
  burgerMenu.classList.toggle('open');
  const isOpen = burgerMenu.classList.contains('open');
  burgerMenuIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}
