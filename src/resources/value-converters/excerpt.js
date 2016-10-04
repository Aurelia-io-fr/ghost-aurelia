export class ExcerptValueConverter {
  toView(str, { length, type }) {
    const div = document.createElement('div');
    div.innerHTML = str.replace(/<img[^>]+>/g, '');
    const text = div.innerText;

    if (type === 'words') {
      const words = text.split(/\s+/);
      return words.splice(0, length).join(' ') + '…';
    } else {
      return text.substr(0, length);
    }
  }
}
