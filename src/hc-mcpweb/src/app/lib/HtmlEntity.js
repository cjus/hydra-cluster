export default class HtmlEntity {
  encode(text) {
    return text.replace(new RegExp('&', 'g'), '&amp;');
  }

  decode(text) {
    return text.replace(new RegExp('&amp;', 'g'), '&');
  }
}
