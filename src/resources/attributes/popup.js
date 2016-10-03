import {inject} from 'aurelia-framework';

@inject(Element)
export class PopupCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  attached() {
    this.element.addEventListener('click', this._listener = e => {
      e.preventDefault();
      window.open(this.element.getAttribute('href'));
    });
  }

  detached() {
    this.element.removeEventListener('click', this._listener);
  }
}
