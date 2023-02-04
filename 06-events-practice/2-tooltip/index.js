class Tooltip {
  element = null;
  MOUSE_INDENT = 5; // отступ в пикселях от указателя мыши

  move = (event) => {
    this.element.style.left = event.clientX + this.MOUSE_INDENT + "px";
    this.element.style.top = event.clientY + this.MOUSE_INDENT + "px";
  };

  over = (event) => {
    const parent = event.target;
    if (parent.dataset.tooltip && this.element) {
      this.element.textContent = parent.dataset.tooltip;
      parent.append(this.element);

      parent.addEventListener("mousemove", this.move);
    }
  };
  out = (event) => {
    const parent = event.target;
    if (parent.dataset.tooltip) {
      parent.removeEventListener("mousemove", this.move);
      this.remove();
    }
  };

  render() {
    this.element = document.createElement("div");
    this.element.className = "tooltip";
  }

  initialize() {
    this.render();
    document.addEventListener("mouseover", this.over);
    document.addEventListener("mouseout", this.out);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    this.remove();
    document.removeEventListener("mouseover", this.over);
    document.removeEventListener("mouseout", this.out);
    this.element = null;
  }
}

export default Tooltip;
