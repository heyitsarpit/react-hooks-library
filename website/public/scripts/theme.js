// A minified version is inlined in _document.tsx

!(function () {
  var b = document.body.classList;
  b.remove('dark'); // remove default theme
  var e = localStorage.getItem('theme');
  if (e) b.add(e.replace(/"/g, ''));
  else {
    var m = window.matchMedia('(prefers-color-scheme: dark)');
    m.matches ? b.add('dark') : b.add('light');
  }
})();


  