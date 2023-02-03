
import locales from './../locales/en.json';
// Uncomment for use app to fr
//import locales from './../locales/fr.json';

module.exports = function (field) {
  return locales[field] != null ? locales[field] : field;
}