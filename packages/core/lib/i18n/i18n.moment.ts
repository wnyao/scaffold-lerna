import moment from 'moment';
import 'moment/locale/zh-cn';

/** moment locale */
export const initMomentLocal = (language: string) => {
  if (language === 'en_US') {
    moment.updateLocale('en', {});
    return;
  }

  moment.updateLocale('zh', {
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    weekdaysMin: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  });
};
