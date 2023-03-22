export class Component {
  constructor(selector) {
    this.$el = document.querySelector(selector)
  }

  removeEl(el) {
    if (el) el.parentNode.removeChild(el)
  }
}
