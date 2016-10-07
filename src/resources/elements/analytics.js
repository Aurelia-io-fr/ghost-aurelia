import {inject, noView} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@noView
@inject(EventAggregator)
export class AnalyticsCustomElement {
  constructor(ea) {
    this.ea = ea;
  }

  attached() {
    this._listener = this.ea.subscribe('router:navigation:success', response => {
      window.ga && window.ga('send', 'pageview');
    });
  }

  detached() {
    this._listener.dispose();
  }
}
