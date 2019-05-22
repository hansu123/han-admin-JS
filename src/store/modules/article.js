import articleModel from "../../api/article";
import { SET_ARTICLE } from "../mutation_type"
import qs from "qs"
const admintor = {
  namespaced: true,
  state: {
    articleList: [],
  },
  getters: {
    getArticleList(state) {
      return state.articleList;
    }
  },
  mutations: {
    [SET_ARTICLE](state, d) {
      state.articleList = d;
    }
  },
  actions: {
    async getList({ commit }, params) {

      let d = await articleModel.GetList(params);
      commit(SET_ARTICLE, d.data);

    },
    async delArticle({ commit }, id) {

      let d = await articleModel.DelArticle(id)
      console.log(d)
      commit(SET_ARTICLE, d.data);

    },
  }
}

export default admintor;