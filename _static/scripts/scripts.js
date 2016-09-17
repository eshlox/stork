var slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70
});

var menuButton = document.querySelector('div#panel header button');

slideout.on('beforeclose', function() {
  menuButton.className = menuButton.className.replace(/\b is-active\b/, '');
});

slideout.on('beforeopen', function() {
  menuButton.className += ' is-active';
});

menuButton.addEventListener('click', function() {
  slideout.toggle();
});
