import { createStore } from 'vuex'

export default createStore({
  state: {
    userid: 'ddd', // 示例全局变量
  },
  getters: {
  },
  mutations: {
    setUserId(state, newUserId) {
      state.userid = newUserId;
    },
  },
  actions: {
    updateUserId(context, newUserId) {
      context.commit('setUserId', newUserId);
    },
  },
  modules: {
  }
})

