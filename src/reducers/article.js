const STORE_ARTICLES = 'STORE_ARTICLES';

// action types
//初始数据

const initialState = {
    articles: [],
    page:1  
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