export default class DoubleSlider {
  element = null;
  subElements = {};
  static MAX_PERCENT = 100;
  static MIN_PERCENT = 0;
  constructor({
    minVal = 0,
    maxVal = 100,
    left = 0,
    right = 0,
    currency = (data) => `$${data}`,
  } = {}) {
    this._left = left;
    this._right = right;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.range = maxVal - minVal;
    this.currency = currency;

    this.render();
  }

  render() {
    const wrap = document.createElement("div");
    wrap.innerHTML = this.getTemplate();
    this.element = wrap.firstElementChild;
    for (const item of this.element.querySelectorAll(
      'span[class^="range-slider"]'
    )) {
      this.subElements[
        item.className.replace("range-slider__", "").replace("thumb-", "")
      ] = item;
    }
    console.log(this.subElements);
  }

  getTemplate() {
    return `  <div class="range-slider">
    <span>${this.currency(this.minVal)}</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress" style="left: ${this.left}%; right: ${
      this.right
    }%"></span>
      <span class="range-slider__thumb-left" style="left: ${this.left}%"></span>
      <span class="range-slider__thumb-right" style="right: ${
        this.right
      }%"></span>
    </div>
    <span>${this.currency(this.maxVal)}</span>
  </div>`;
  }

  getFromValue() {
    return this.minVal + (this.range * this.left) / 100;
  }
  getToValue() {
    return this.minVal + (this.range * this.right) / 100;
  }

  get left() {
    return this._left;
  }
  get right() {
    return this._right;
  }
  set left(val) {
    if (this._right > val && this._left >= this.MIN_PERCENT) {
      this._left = val;
    }
  }
  set right(val) {
    if (this._left < val && this._right <= this.MAX_PERCENT) {
      this._right = val;
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
