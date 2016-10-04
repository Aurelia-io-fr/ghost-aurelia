import {inject} from 'aurelia-framework';
import moment from 'moment';

moment.locale(navigator.language);

@inject(() => moment)
export class DateFormatValueConverter {
  constructor(moment) {
    this.moment = moment;
  }

  toView(date, format) {
    return this.moment(date).format(format);
  }
}
