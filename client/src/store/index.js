import { createStore } from 'vuex'
import axios from 'axios';
import router from '../router';

export default createStore({
  state: {
    novels: [],
    singleNovel: {},
    user: {},
    registerError: '',
    loginError: '',
    isLoggedIn: localStorage.getItem('isLoggedIn') || false
  },
  getters: {
    novels: state => state.novels,
    singleNovel: state => state.singleNovel,
    user: state => state.user,
    registerError: state => state.registerError,
    loginError: state => state.loginError,
    isLoggedIn: state => state.isLoggedIn
  },
  mutations: {
    get_novels_error(state) {
      state.novels = [];
    },
    get_novels(state, newNovels) {
      state.novels = newNovels;
    },
    get_single_novel_error(state) {
      state.singleNovel = {};
    },
    get_single_novel(state, singleNovel) {
      state.singleNovel = singleNovel;
    },
    new_novel(state, newNovel) {
      state.novels.push(newNovel);
    },
    update_novel(state, novelData) {
      state.singleNovel = novelData;
    },
    delete_novel(state, id) {
      state.novels.filter(novel => novel.id !== id);
    },
    register_error(state, message) {
      state.registerError = message;
    },
    login_error(state, message) {
      state.loginError = message;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    async getNovels({commit}) {
      const res = await axios.get('http://localhost:3000/novels', {withCredentials: true});
      const data = res.data;
      if(data.authError === true) {
        return router.push('/');
      }
      if(data.error === true) {
        return commit('get_novels_error')
      }
      commit('get_novels', data);
    },
    async getSingleNovel({commit}, id) {
      const res = await axios.get(`http://localhost:3000/novel/${id}`, {withCredentials: true});
      const data = res.data;
      if(data.authError === true) {
        return router.push('/');
      }
      if(data.error === true) {
        return commit('get_single_novel_error');
      }
      commit('get_single_novel', data[0]);
    },
    async postNewNovel({commit}, newNovelData) {
      const res = await axios.post('http://localhost:3000/new-novel', newNovelData, {withCredentials: true});
      const data = res.data;
      if(data.authError === true) {
        return router.push('/login');
      }
      commit('new_novel', data.newNovel);
    },
    async editNovel({commit}, {updatedNovelData, id}) {
      const res = await axios.put(`http://localhost:3000/edit/${id}`, updatedNovelData, {withCredentials: true});
      if(res.data.authError === true) {
        return router.push('/login');
      }
      commit('update_novel', res.data.updNovel);
    },
    async deleteNovel({commit}, id) {
      const res = await axios.delete(`http://localhost:3000/delete/${id}`, {withCredentials: true});
      console.log(res);
      if(res.data.authError === true) {
        return router.push('/login');
      }
      commit('delete_novel', id);
    },
    async registerUser({commit}, newUserData) {
      const res = await axios.post('http://localhost:3000/user/register', newUserData, {withCredentials: true});
      if(res.data.error === true) {
        commit('register_error', res.data.msg);
      }
    },
    async loginUser({commit}, userData) {
      const res = await axios.post('http://localhost:3000/user/login', userData, {withCredentials: true});
      if(res.data.error === true) {
        return commit('login_error', res.data.msg);
      }
      commit('login');
      localStorage.setItem('isLoggedIn', true);
    },
    async logoutUser({commit}) {
      const res = await axios.get('http://localhost:3000/user/logout', {withCredentials: true});
      if(res.data.authError === true) {
        return router.push('/');
      }
      commit('logout');
      localStorage.removeItem('isLoggedIn');
    }
  },
  modules: {
  }
});
