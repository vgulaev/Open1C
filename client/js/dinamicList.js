class dinamicList {
  constructor(dom) {
    this.dom = dom;
    this.postUrl = dom.getAttribute('src');
    this.innerRow = dom.querySelector('tbody').innerHTML;
    this.prepareTemplate();
    this.body = dom.querySelector('tbody');
    this.body.innerHTML = '';
    this.request('');
  }

  prepareTemplate() {
    this.params = {};
    this.pieces = [];
    this.innerRow.split('{{element.').forEach((e, i) => {
      let val = e.split('}}');
      this.pieces.push(val[0]);
      if (2 == val.length) {
        this.params[val[0]] = this.pieces.length - 1;
        this.pieces.push(val[1]);
      }
    });
    this.keys = Object.keys(this.params);
  }

  addEventListener() {
    document.querySelectorAll('.dynamicListRow').forEach(e => {
      e.addEventListener('click', event => {
        window.location.href = `/Справочники/Организации/item?id=${e.querySelector('#id').innerHTML}`;
      });
    });
  }

  render() {
    let innerHTML = '';
    this.data.forEach((e) => {
      this.keys.forEach((k) => {
        this.pieces[this.params[k]] = e[k];
      });
      innerHTML += this.pieces.join('');
    });
    this.body.innerHTML = innerHTML;
    this.addEventListener();
  }

  request(q) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        this.data = JSON.parse(req.responseText);
        this.render();
      }
    }

    req.open("post", this.postUrl, true);
    req.send(JSON.stringify(q));
  }
}
