import environment from '../environment';

export class Disqus {
  constructor() {
    this.getInstance();
  }

  async getInstance(type) {
    return new Promise(resolve => {
      if (this._instance) {
        resolve(this._instance);
      } else {
        const d = document;
        const s = d.createElement('script');
        s.src = `//${environment.disqus}.disqus.com/${type}.js`;
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        s.onload = () => {
          this._instance = window.DISQUS;
          resolve(this._instance);
        };
      }
    });
  }

  async reset() {
    const disqus = await this.getInstance('embed');
    disqus.reset({
      reload: true
    });
  }

  async count() {
    await this.getInstance('count');
    DISQUSWIDGETS.getCount({ reset: true });
  }
}
