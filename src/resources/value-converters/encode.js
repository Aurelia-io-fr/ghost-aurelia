export class EncodeValueConverter {
  toView(str) {
    return encodeURIComponent(str);
  }
}
