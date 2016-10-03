import {inject, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
/**
 * @exemple
 * <main-loader></main-loader>
 */
export class MainLoaderCustomElement {
  @observable current = 0;

  constructor(element, ea) {
    this.element = element;
    this.ea = ea;
  }

  currentChanged(newVal) {
    this.progress.style.width = `${newVal}%`;
  }

  attached() {
    this._processing = this.ea.subscribe('router:navigation:processing', () => this._start());
    this._canceling = this.ea.subscribe('router:navigation:canceled', () => this._cancel());
    this._successing = this.ea.subscribe('router:navigation:success', () => this._success());
  }

  detached() {
    this._processing.dispose();
    this._canceling.dispose();
    this._successing.dispose();
  }

  _start() {
    clearInterval(this._poll);
    this.current = 1;
    this._show();
    this._poll = setInterval(() => this._increment(), 1);
  }

  _increment(v) {
    this.current = Math.min((this.current || 1) * 1.01, 100);
  }

  _cancel() {
    clearInterval(this._poll);
    this.current = 0;
    setTimeout(() => this._hide(), 500);
  }

  _success() {
    clearInterval(this._poll);
    this.current = 100;

    setTimeout(() => this._hide(), 500);
  }

  _show() {
    this.element.classList.add('visible');
  }

  _hide() {
    this.element.classList.remove('visible');
  }
}
