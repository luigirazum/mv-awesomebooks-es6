// -- This is the AbDate module for AbDate class    -- //
// - it uses DateTime from luxon library             - //
import { DateTime } from './luxon.js';

// - with AbDate class, we create a custom DateTime     - //
// - object to show the DateTime in a format like:      - //
// - Month day(st|nd|rd) year(4digit), hh:mm:ss (am|pm) - //
class AbDate {
  constructor() {
    this.now = DateTime.now();
  }

  getOrdinalDay = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  display = () => {
    const nowMonth = this.now.toFormat('LLLL');
    const nowYear = this.now.toFormat('yyyy');
    const nowDay = parseInt(this.now.toFormat('dd'), 10);

    const nowDate = `${nowMonth} ${this.getOrdinalDay(nowDay)} ${nowYear}`;
    const nowTime = this.now.toLocaleString(DateTime.TIME_WITH_SECONDS).toLocaleLowerCase();
    return `${nowDate}, ${nowTime}`;
  }
}

export { AbDate as default };