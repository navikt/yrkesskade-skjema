import Cookies from 'js-cookie';
import backupTexts from"../assets/texts/backupTexts.json";

export default function getTexts(text, ...args) {
  const language = Cookies.get('decorator-language') || 'nb';
  const allTexts = backupTexts;
  const thisText = allTexts[language.toUpperCase()][text];
  return thisText;

}
