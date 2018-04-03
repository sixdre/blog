import {
    STORE_ARTICLES,
    UPDATE_PV
} from '../actions/articleActions'
// action types
//初始数据

const initialState = {
    articles: [],
    page: 1,
    categories: [],
    tags:[]
}

const Article = (state = initialState, action) => {
    switch (action.type) {
        case STORE_ARTICLES:
            return {
                ...state,
                articles: [...state.articles, ...action.data.articles],
                page: action.data.page
            }
        case UPDATE_PV:
            return {
                ...state,
                articles: state.articles.map(item => {
                    if (item._id === action.id) {
                        item.nums.pv+=1
                    }
                    return item;
                }),
            }    
    default:
      return state
  }
}


export default Article