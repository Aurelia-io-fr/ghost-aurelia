export class AbsoluteUrlValueConverter {
  toView(str) {
    return `${window.location.origin}${str}`;
  }
}
