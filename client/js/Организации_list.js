App = {};

window.addEventListener('load', async function( event ) {
  document.querySelectorAll('.open1CDynamicList').forEach((e) => {
    App.list = new dinamicList(e);
  });
  App.q = document.querySelector('#q');
  App.q.addEventListener('keyup', event => {
    let q = {};
    if (App.q.value.length > 0) {
      q.q = App.q.value;
    }
    App.list.request(q);
  });
})
