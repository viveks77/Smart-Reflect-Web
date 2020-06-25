function openMenu() {
  const sideMenu = document.getElementById('sidemenu');
  const main = document.getElementById('main');
  if (sideMenu.classList.contains('active')) {
    sideMenu.style.marginLeft = '-230px';
    main.style.marginLeft = '180px';
    sideMenu.classList.remove('active');
    sideMenu.classList.add('hidden');
  } else if (sideMenu.classList.contains('hidden')) {
    sideMenu.style.marginLeft = '0';
    main.style.marginLeft = '320px';
    sideMenu.classList.remove('hidden');
    sideMenu.classList.add('active');
  }
}
