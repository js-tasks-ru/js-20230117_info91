export default class DoubleSlider {
  element = null;
  subElements = {};
  clickTarget = {};
  values = [];
  static MAX_PERCENT = 100;
  static MIN_PERCENT = 0;

  constructor({
    minVal = 0,
    maxVal = 100,
    step = 1,
    left = 10,
    right = 90,

    currencyTemptate = (data) => `$${data}`,
  } = {}) {
    this._left = left;
    this._right = right;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.step = step;
    this.currencyTemptate = currencyTemptate;

    this.render();
    this.init();
  }

  render() {
    this.range = this.maxVal - this.minVal;
    this.updateValues();

    const wrap = document.createElement("div");
    wrap.innerHTML = this.getTemplate();
    this.element = wrap.firstElementChild;
    for (const item of this.element.querySelectorAll(
      '[class^="range-slider"]'
    )) {
      this.subElements[
        item.className.replace("range-slider__", "").replace("thumb-", "")
      ] = item;
    }
    let i = 0;
    for (const item of this.element.querySelectorAll("span")) {
      if (!item.className) {
        this.subElements[i++] = item;
      }
    }
    console.log(this.subElements);
  }

  update() {
    console.log("update", this.left, this.right, this.subElements.right);
    this.updateValues();

    this.subElements.left.style.left = this.left + "%";
    this.subElements.right.style.right = `${
      DoubleSlider.MAX_PERCENT - this.right
    }%`;
    this.subElements.progress.style.left = this.left + "%";
    this.subElements.progress.style.right = `${
      DoubleSlider.MAX_PERCENT - this.right
    }%`;

    this.values.forEach((val, index) => {
      this.subElements[index].textContent = this.currencyTemptate(val);
    });
    // this.subElements.
  }

  move = (event) => {
    console.log(
      event.clientX,
      this.pixelToPersent(event.clientX - this.baseCoords.x)
    );

    if (this.clickTarget === this.subElements.right) {
      this.right = this.pixelToPersent(event.clientX - this.baseCoords.x);
    }
    if (this.clickTarget === this.subElements.left) {
      this.left = this.pixelToPersent(event.clientX - this.baseCoords.x);
    }
    this.update();
  };

  pixelToPersent(pixel) {
    return (pixel / this.mousePersentStep).toFixed(this.step);
  }

  pointerDown = (event) => {
    this.baseCoords = this.subElements.inner.getBoundingClientRect();
    this.mousePersentStep = this.baseCoords.width / 100;

    console.log(this.mousePersentStep, this.baseCoords.width, this.baseCoords);
    this.clickTarget = event.target.closest("span");

    document.addEventListener("mousemove", this.move);

    document.addEventListener("pointerup", () => {
      this.clickObj = {};
      document.removeEventListener("mousemove", this.move);
    });
  };

  init() {
    this.subElements.left.addEventListener("pointerdown", this.pointerDown);
    this.subElements.right.addEventListener("pointerdown", this.pointerDown);
  }

  updateValues() {
    this.values = [this.getFromValue(), this.getToValue()];
  }
  getFromValue() {
    return (this.minVal + (this.range * this.left) / 100).toFixed(this.step);
  }
  getToValue() {
    return (this.minVal + (this.range * this.right) / 100).toFixed(this.step);
  }

  get left() {
    return this._left;
  }
  get right() {
    return this._right;
  }
  set left(val) {
    if (this._right > val && val >= DoubleSlider.MIN_PERCENT) {
      this._left = val;
    }
  }
  set right(val) {
    if (this._left < val && val <= DoubleSlider.MAX_PERCENT) {
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
  getTemplate() {
    console.dir(this);
    return `  <div class="range-slider">
    <span>${this.currencyTemptate(this.values[0])}</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress"style="left: ${this.left}%; right:${
      DoubleSlider.MAX_PERCENT - this.right
    }%"></span>
      <span class="range-slider__thumb-left" style="left: ${this.left}%"></span>
      <span class="range-slider__thumb-right" style="right:${
        DoubleSlider.MAX_PERCENT - this.right
      }%"></span>
    </div>
    <span>${this.currencyTemptate(this.values[1])}</span>
  </div>`;
  }
}
