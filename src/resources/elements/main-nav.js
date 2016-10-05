import {inject} from 'aurelia-framework';
import {MainNavService} from './main-nav-service';
import {Blog} from '../../api/blog';
import {Labs} from '../../api/labs';

@inject(MainNavService, Blog, Labs)
export class MainNav {
  constructor(mainNavService, blog, labs) {
    this.mainNavService = mainNavService;
    this.blog = blog;
    this.labs = labs;
  }
  close() {
    this.mainNavService.close();
  }
}

