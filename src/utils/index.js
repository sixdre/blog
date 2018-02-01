/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
import moment from 'moment';
moment.locale('zh-cn');

export const time = (value) => {
    return moment(value).format('YYYY-MM-DD');
};