import Vue from 'vue';
import Vuex from 'vuex';
import {
  setCookie,
  removeCookie,
  getCookie,
} from '@/utils/userCookies';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    collapsed: false,
    user: getCookie(),
    routes: [],
  },
  mutations: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    toggleInfo(state, data) {
      state.user = data;
    },
    clearInfo(state) {
      state.user = {
        appkey: '',
        email: '',
        role: '',
        username: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.routes = routes;
    },
  },
  actions: {
    toggleCollapsed(context) {
      context.commit('toggleCollapsed');
    },
    toggleInfo(context, data) {
      context.commit('toggleInfo', data);
      setCookie(data);
    },
    clearInfo(context) {
      context.commit('clearInfo');
      removeCookie();
    },
    changeMenuRoutes(context, routes) {
      context.commit('changeMenuRoutes', routes);
    },
  },
  modules: {},
});
