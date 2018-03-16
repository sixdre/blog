/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
import moment from 'moment';
moment.locale('zh-cn');

export const time = (value,format='YYYY-MM-DD') => {
    return moment(value).format(format);
};
export const fromNow = (time, formatString,onlyDate) => {
	var stamp = new Date().getTime() - new Date(time).getTime();
	//超过30天，返回具体日期
	if(stamp > 1000 * 60 * 60 * 24 * 30) {
		stamp = new Date(time).toLocaleString();
		onlyDate && (stamp = stamp.replace(/\s[\S]+$/g, ''));
		return stamp;
	}
	//30天以内，返回“多久前”
	if(stamp >= 1000 * 60 * 60 * 24) {
		return((stamp / 1000 / 60 / 60 / 24) | 0) + '天前';
	} else if(stamp >= 1000 * 60 * 60) {
		return((stamp / 1000 / 60 / 60) | 0) + '小时前';
	} else if(stamp >= 1000 * 60 * 3) { 
		return((stamp / 1000 / 60) | 0) + '分钟前';
	} else if(stamp < 0) {
		return '未来';
	} else {						//3分钟以内为：刚刚
		return '刚刚';
	}
};
