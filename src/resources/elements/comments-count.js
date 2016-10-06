import {inject, bindable} from 'aurelia-framework';
import {Disqus} from '../disqus';

@inject(Disqus)
export class CommentsCount {
  @bindable url;
  constructor(disqus) {
    this.disqus = disqus;
  }

  attached() {
    this.disqus.count();
  }
}
