import environment from '../environment';

export class Disqus {
  _instances = {};

  constructor() {
    this.getInstance('embed');
  }

  async getInstance(type) {
    if (!this._instances[type]) {
      this._instances[type] = new Promise((resolve, reject) => {
        if (this._instances[type]) {
          resolve(this._instance[type]);
        } else {
          const d = document;
          const s = d.createElement('script');
          s.src = `//${environment.disqus}.disqus.com/${type}.js`;
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
          s.onload = () => {
            switch (type) {
            case 'embed':
              this._instances[type] = window.DISQUS;
              break;
            case 'count':
              this._instances[type] = window.DISQUSWIDGETS;
              break;
            default:
              reject(new Error('Wrong type'));
            }
            resolve(this._instances[type]);
          };
        }
      });
    }
    return this._instances[type];
  }

  async reset() {
    const disqus = await this.getInstance('embed');
    disqus.reset({
      reload: true
    });
  }

  async count() {
    const disqus = await this.getInstance('count');
    disqus.getCount({ reset: true });
  }
}
