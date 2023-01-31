export default class NotificationMessage {
  static executed = false;
  _element = null;

  constructor(msg = "", { duration = 2000, type = "success" } = {}) {
    this.render();
  }

  get element() {
    return this._element;
  }
  set element(e) {
    this._element = e;
  }

  render() {
    this.element = document.createElement("div");
    this.element.innerHTML = `
      <div class="notification success" style="--value:20s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">Hello world</div>
        </div>
      </div>
    `;

    this.element = this.element.firstElementChild;
    console.log(this.element);
  }

  show() {}

  remove() {}

  destroy() {}
}

// git pull upstream master
