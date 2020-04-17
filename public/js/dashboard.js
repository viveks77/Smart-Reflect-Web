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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}