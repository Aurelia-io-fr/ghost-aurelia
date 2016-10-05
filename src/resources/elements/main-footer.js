import {inject} from 'aurelia-framework';
import {Blog} from '../../api/blog';

@inject(Blog)
export class MainFooter {
  now = new Date();

  constructor(blog) {
    this.blog = blog;
  }
}
