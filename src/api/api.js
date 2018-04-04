import axios from 'axios'
import $storage from '../services/storage'
import Auth from '../services/auth'
axios.defaults.timeout = 30000

let baseURL;

if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://47.94.206.86:7893'
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

//登录
export const login = (username, password) => { return axios.post('/api/login', { username: username, password: password }) }
//注册
export const regist = (username, email, password) => { return axios.post('/api/regist', { username, email, password }) }
//获取登录用户信息
export const getUserInfo = () => { return axios.get('/api/userInfo') }
//获取类型和标签
export const getCateAndTag = () => { return axios.get('/api/catetag') }
//发表文章
export const createArticle = (data) => { return axios.post('/api/articles', { article: data }) }
//更新文章
export const updateArticle = (id, data) => { return axios.put('/api/articles/' + id, { article: data }) }
//创建草稿
export const createDraft = (data) => { return axios.post('/api/draft', { article: data }) }
//获取草稿
export const getDraft = () => { return axios.get('/api/me/drafts') }
//获取文章列表
export const getArticleList = (params) => { return axios.get('/api/articles', { params }) }
//获取文章详情
export const getArticleDetail = (id) => { return axios.get('/api/articles/' + id + '/front') }
//文章点赞
export const toggleLike = (id) => { return axios.put('/api/articles/' + id + '/likes') }
//文章收藏
export const toggleCollect = (id) => { return axios.put('/api/articles/' + id + '/collect') }
//发表评论
export const submitComment = (article_id, data) => { return axios.post('/api/articles/' + article_id + '/comments', data) }
//获取评论
export const getComments = (article_id, params) => { return axios.get('/api/articles/' + article_id + '/comments', { params: params }) }
//评论点赞
export const addCommentLike = (cId) => { return axios.post('/api/comments/' + cId + '/like') }
//创建用户
export const createUser = (data) => { return axios.post('/api/users', data) }

