import {inject} from 'aurelia-framework';
import {Labs} from '../api/labs';
import {Blog} from '../api/blog';

@inject(Labs, Blog)
export class Subscribe {
  constructor(labs, blog) {
    this.labs = labs;
    this.blog = blog;
  }
}
