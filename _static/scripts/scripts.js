var slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70
});

slideout.on('beforeclose', function() {
  var overlay = document.getElementById('button-menu');
  overlay.className = overlay.className.replace(/\b is-active\b/, '');
});

slideout.on('beforeopen', function() {
  var overlay = document.getElementById('button-menu');
  overlay.className += ' is-active';
});

document.querySelector('.toggle-button').addEventListener('click', function() {
  slideout.toggle();
});
