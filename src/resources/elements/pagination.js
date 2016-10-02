import {bindable, computedFrom} from 'aurelia-framework';

const MAX_PAGES = 9;

/**
 * @exemple
 * <pagination
 *   total.bind="total"
 *   per-page.bind="perPage"
 *   current.bind="current"
 *   navigate.call="paginate($event)"></pagination>
 */
export class Pagination {
  @bindable total = 0;
  @bindable perPage = 0;
  @bindable current = 1;
  @bindable navigate = () => {};
  loading = null;

  @computedFrom('total', 'perPage', 'current')
  get pages() {
    if (!this.perPage) {
      return [];
    }
    const total = this.lastPage - 1;
    const pages = [];
    const current = +this.current;

    let range = Math.floor(MAX_PAGES / 2);
    if (range % 2 === 1) {
      range--;
    }

    let end = Math.min(Math.max(current + range, MAX_PAGES), total + 1);
    let start = Math.min(Math.max(current - range, 1), Math.max(end - MAX_PAGES + 1, 1));

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  @computedFrom('total', 'perPage')
  get lastPage() {
    return Math.ceil(+this.total / +this.perPage);
  }

  navigateTo(e, page) {
    e.stopPropagation();
    if (typeof this.navigate === 'function') {
      const res = this.navigate({
        total: this.total,
        perPage: this.perPage,
        current: this.current,
        navigateTo: page
      });
      if (res instanceof Promise) {
        this.loading = page;
        res
        .finally(() => this.loading = null);
      }
    }
  }
}
