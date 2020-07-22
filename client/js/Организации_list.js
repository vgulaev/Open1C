App = {};

window.addEventListener('load', async function( event ) {
  document.querySelectorAll('.open1CDynamicList').forEach((e) => {
    App.list = new dinamicList(e);
  });
  App.q = document.querySelector('#q');
  App.q.addEventListener('keyup', event => {
    App.list.request(App.q.value);
  });
})
