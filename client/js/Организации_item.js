App = {
  createOrUpdate: () => {
    let id = document.querySelector('[binding="id"]').innerHTML;
    App.data.id = id;
    var req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        window.location.href = '/Справочники/Организации/list';
      }
    }

    req.open('post', '/Справочники/Организации/createOrUpdate', true);
    req.send(JSON.stringify(App.data));

  },
  render: () => {
    Object.keys(App.data).forEach(e => {
      let node = document.querySelector(`[binding="${e}"]`);
      if ('INPUT' == node.tagName) {
        node.value = App.data[e];
      } else if ('SPAN' == node.tagName) {
        node.innerHTML = App.data[e];
      }
    });
    App.data = {};
  },
  load: () => {
    var req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        let data = JSON.parse(req.responseText);
        if (data.length > 0) {
          App.data = data[0];
        }
        App.render();
      }
    }

    req.open('post', '/Справочники/Организации/list', true);
    req.send(JSON.stringify(App.data));
  },
  data: {}
};

window.addEventListener('load', async function( event ) {
  let [ulr, params] = location.href.split('?');
  if (undefined != params) {
    params = new URLSearchParams(params);
    App.data.id = params.get('id');
    App.load();
  }
  document.querySelectorAll('[binding]').forEach((e) => {
    if ('INPUT' == e.tagName) {
      e.addEventListener('keyup', event => {
        let name = event.srcElement.getAttribute('binding');
        App.data[name] = event.srcElement.value;
      });
    }
  });
})
