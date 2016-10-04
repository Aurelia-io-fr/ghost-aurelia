import {inject} from 'aurelia-framework';
import {MainNavService} from './main-nav-service';

@inject(MainNavService)
export class MainNav {
  constructor(mainNavService) {
    this.mainNavService = mainNavService;
  }
  close() {
    this.mainNavService.close();
  }
}

