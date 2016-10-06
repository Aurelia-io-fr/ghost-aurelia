import {inject, bindable} from 'aurelia-framework';
import {Disqus} from '../disqus';

@inject(Disqus)
export class CommentsCustomElement {
  @bindable post;

  constructor(disqus) {
    this.disqus = disqus;
  }

  attached() {
    this.disqus.reset();
  }

  postChanged() {
    this.disqus.reset();
  }
}
