import axios from 'axios'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://localhost:7893';
// http request 拦截器
axios.interceptors.request.use(
	config => {
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
		return Promise.reject(error)
	}
)

export default {
    /**
     * 登录
     */
    login(username, password) {
        return axios.post('/api/admin_login', { username: username, password: password });
    },
    //获取登录用户信息
    getUserInfo() {
        return axios.get('/api/userInfo');
    },
    //获取文章列表
    getArticleList(params) {
         return axios.get('/api/articles',{params});
    },
     //获取文章列表
    getArticleDetail(id) {
         return axios.get('/api/articles/'+id);
    },
    //获取分类列表
    getCategoryList() {
        return axios.get('/api/categories');
    },
    //获取标签列表
    getTagList() {
        return axios.get('/api/tags');
    },
    //创建用户
    createUser(data) {
        return axios.post('/api/users', data);
    },


}