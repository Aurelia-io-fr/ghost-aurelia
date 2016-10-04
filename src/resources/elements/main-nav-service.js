import {inject} from 'aurelia-framework';

const NAV_CLOSED = 'nav-closed';
const NAV_OPENED = 'nav-opened';

@inject(document.body.classList)
export class MainNavService {
  constructor(bodyClassList) {
    this.bodyClassList = bodyClassList;
  }

  toggle() {
    if (this.bodyClassList.contains(NAV_OPENED)) {
      this.close();
    } else {
      this.open();
    }
  }

  close() {
    this.bodyClassList.remove(NAV_OPENED);
    this.bodyClassList.add(NAV_CLOSED);
  }

  open() {
    this.bodyClassList.add(NAV_OPENED);
    this.bodyClassList.remove(NAV_CLOSED);
  }
}
