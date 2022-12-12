import { DateTime } from './luxon.js';

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