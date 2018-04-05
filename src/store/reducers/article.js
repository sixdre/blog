import {
    STORE_ARTICLES,
    UPDATE_PV,
    SAVE_CATEGORIES,
    SAVE_TAGS
} from '../actions/articleActions'
// action types
//初始数据

const initialState = {
    articles: [],
    page: 1,
    categories: [],
    tags: []
}

const Article = (state = initialState, action) => {
    switch (action.type) {
        case STORE_ARTICLES:
            return {
                ...state,
                articles: [...state.articles, ...action.data.articles],
                page: action.data.page
            }
        case SAVE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            }
        case SAVE_TAGS:
            return {
                ...state,
                tags: [...action.tags],
            }
        case UPDATE_PV:
            return {
                ...state,
                articles: state.articles.map(item => {
                    if (item._id === action.id) {
                        item.pv_num += 1
                    }
                    return item;
                }),
            }
        default:
            return state
    }
}


export default Article