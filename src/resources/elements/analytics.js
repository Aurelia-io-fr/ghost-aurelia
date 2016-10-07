import {inject} from 'aurelia-property-injection';
import {EventAggregator} from 'aurelia-event-aggregator';

export class AnalyticsCustomElement {
  @inject(EventAggregator) ea;
  attached() {
    this._listener = this.ea.subscribe('router:navigation:success', response => {
      window.ga && window.ga('send', 'pageview');
    });
  }

  detached() {
    this._listener.dispose();
  }
}
