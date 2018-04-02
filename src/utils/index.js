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

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (callback) => {
	if (getScrollTop() + getClientHeight() + 50 > getScrollHeight()) { 
		callback()
	} 
	//获取滚动条当前的位置 
	function getScrollTop() {
		var scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		}
		else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}

	//获取当前可是范围的高度 
	function getClientHeight() {
		var clientHeight = 0;
		if (document.body.clientHeight && document.documentElement.clientHeight) {
			clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
		}
		else {
			clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
		}
		return clientHeight;
	}

	//获取文档完整的高度 
	function getScrollHeight() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	} 

	
}
