import axios from 'axios'
import $storage from '../services/storage'
import Auth from '../services/auth'
axios.defaults.timeout = 30000

let baseURL;

if (process.env.NODE_ENV==='production'){
    baseURL = 'http://47.93.52.132:7893'
} else {
    baseURL = 'http://localhost:7893';
}

axios.defaults.baseURL = baseURL;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = $storage.user.getToken();
		if (token) {
			config.headers['x-access-token'] = token
		}
		return config
	},
	err => {
		return Promise.reject(err)
	}
)
axios.interceptors.response.use(
	response => {
		return response
	},
    error => {
        if (error.response) {
			switch (error.response.status) {
				case 401:
					// 401 清除token信息并跳转到登录页面
					Auth.logout()
					alert('请重新登录');
					break;
				case 403:
					alert('抱歉，您没有权限访问,请与系统管理员联系!')
					break;
				default:
					alert('请求失败，服务器错误!')
					break;
			}
		}
		return Promise.reject(error)
	}
)

export default {
    /**
     * 登录
     */
    login(username, password) {
        return axios.post('/api/login', { username: username, password: password });
    },
    //注册
    regist(username, email,password) {
        return axios.post('/api/regist', { username: username,email:email, password: password });
    },
    //获取登录用户信息
    getUserInfo() {
        return axios.get('/api/userInfo');
    },
    //获取文章列表
    getArticleList(params) {
         return axios.get('/api/articles',{params});
    },
     //获取文章详情
    getArticleDetail(id) {
         return axios.get('/api/articles/'+id,{params:{pv:1}});
    },
    //文章点赞
    toggleLike(id) {
        return axios.put('/api/articles/'+id+'/likes');
    },
    //文章收藏
    toggleCollect(id) {
        return axios.put('/api/articles/'+id+'/collect');
    },
    //获取分类列表
    getCategoryList(params) {
        return axios.get('/api/categories',{params:params});
    },
    //发表评论
    submitComment(article_id,data) {
         return axios.post('/api/articles/'+article_id+'/comments',data);
    },
    //获取评论
    getComments(article_id,params) {
         return axios.get('/api/articles/'+article_id+'/comments',{params:params});
    },
    //评论点赞
    addCommentLike(cId) {
         return axios.post('/api/comments/'+cId+'/like');
    },
    //获取标签列表
    getTagList(params) {
        return axios.get('/api/tags',{params:params});
    },
    //创建用户
    createUser(data) {
        return axios.post('/api/users', data);
    },


}