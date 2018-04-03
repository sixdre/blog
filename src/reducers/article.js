const STORE_ARTICLES = 'STORE_ARTICLES';
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_TAGS = 'GET_TAGS';
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
            articles:[...state.articles, ...action.data.articles],
            page: action.data.page
        }
    default:
      return state
  }
}


export default Article