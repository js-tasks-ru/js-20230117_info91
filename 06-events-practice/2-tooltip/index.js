class Tooltip {
  static element = null;
  static MOUSE_INDENT = 5; // отступ в пикселях от указателя мыши, добавляет плавность и видимость текста

  constructor() {
    return Tooltip;
  }

  static render(text, parent = document.body) {
    Tooltip.element.textContent = text;
    parent.append(Tooltip.element);
  }

  static initialize() {
    Tooltip.element = document.createElement("div");
    Tooltip.element.className = "tooltip";
    document.addEventListener("pointerover", Tooltip.over);
    document.addEventListener("pointerout", Tooltip.out);
  }

  static move = (event) => {
    Tooltip.element.style.left = `${event.clientX + Tooltip.MOUSE_INDENT}px`;
    Tooltip.element.style.top = `${event.clientY + Tooltip.MOUSE_INDENT}px`;
  };

  static over = (event) => {
    const parent = event.target;
    if (parent.dataset.tooltip) {
      Tooltip.render(parent.dataset.tooltip, parent);
      parent.addEventListener("mousemove", Tooltip.move);
    }
  };
  static out = (event) => {
    const parent = event.target;
    if (parent.dataset.tooltip) {
      parent.removeEventListener("mousemove", Tooltip.move);
      Tooltip.remove();
    }
  };

  static remove() {
    if (Tooltip.element) {
      Tooltip.element.remove();
    }
  }
  static destroy() {
    Tooltip.remove();
    document.removeEventListener("pointerover", Tooltip.over);
    document.removeEventListener("pointerout", Tooltip.out);
    Tooltip.element = null;
  }
}

export default Tooltip;
