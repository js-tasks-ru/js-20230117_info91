export default class SortableList {
  element = {};
  elementCoords = {};
  placeholder = {};
  dragging = {};
  draggingShift = 0;
  draggingHeight = 0;

  SHIFT_FROM_MOUSE = 5;
  controller = new AbortController();

  constructor({ items }) {
    this.items = items;
    this.render();
  }

  render() {
    const placeholderWrap = document.createElement("div");
    placeholderWrap.innerHTML =
      "<li class='sortable-list__item sortable-list__placeholder'></li>";
    this.placeholder = placeholderWrap.firstElementChild;

    const wrap = document.createElement("div");
    wrap.innerHTML = "<ul class='sortable-list'></ul>";
    this.element = wrap.firstElementChild;

    this.items.forEach((item) => {
      item.classList.add("sortable-list__item");
      this.element.append(item);
    });
    // this.element.append(this.placeholder);

    this.initListeners();

    return this.element;
  }

  initListeners() {
    this.element.addEventListener("pointerdown", this.pointerDownHandler, {
      signal: this.controller.signal,
    });
  }
  pointerDownHandler = (event) => {
    console.log(event.target);
    this.dragging = event.target.closest(".sortable-list__item");
    this.elementCoords = this.element.getBoundingClientRect();
    this.draggingShift =
      event.clientY - this.dragging.getBoundingClientRect().top;

    document.addEventListener("pointerup", this.pointerUpHandler, {
      signal: this.controller.signal,
    });
    document.addEventListener("pointermove", this.pointerMoveHandler, {
      signal: this.controller.signal,
    });

    this.startDragging(this.dragging);
  };

  pointerMoveHandler = (event) => {
    console.log(event.target);
    if (
      this.elementCoords.top < event.clientY - this.draggingShift &&
      this.elementCoords.bottom >
        event.clientY + this.draggingHeight - this.draggingShift
    ) {
      this.dragging.style.top = `${event.clientY - this.draggingShift}px`;
    }
  };

  pointerUpHandler = () => {
    this.stopDragging(this.dragging);
    document.removeEventListener("pointerup", this.pointerUpHandler, {
      signal: this.controller.signal,
    });
    document.removeEventListener("pointermove", this.pointerMoveHandler, {
      signal: this.controller.signal,
    });
  };

  stopDragging(item) {
    this.placeholder.replaceWith(item);
    item.style = "";
    item.classList.remove("sortable-list__item_dragging");
  }

  startDragging(item) {
    item.before(this.placeholder);

    const coords = this.placeholder.getBoundingClientRect();

    item.classList.add("sortable-list__item_dragging");
    this.draggingHeight = coords.height;
    item.style.width = `${coords.width}px`;
    item.style.height = `${coords.height}px`;
    item.style.top = `${coords.top + this.SHIFT_FROM_MOUSE}px`;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    this.remove();
    this.element = null;
    this.controller.abort();
  }
}
