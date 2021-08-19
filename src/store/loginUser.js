import * as userApi from "@/api/user"

export default {
  namespaced: true,    //开启命名空间
  state: {
    loading: false,
    user: null
  },
  getters: {
    status(state) {
      if (state.loading) {
        return "loading";
      } else if (state.user) {
        return "login";
      } else {
        return "unlogin";
      }
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async login(ctx, payload) {
      ctx.commit("setLoading", true);
      const resp = await userApi.login(payload.loginId, payload.loginPwd, payload.identity);
      ctx.commit("setUser", resp);
      ctx.commit("setLoading", false);
      return resp;
    },
    async whoAmI(ctx) {
      ctx.commit("setLoading", true);
      try {
        const resp = await userApi.whoAmI();
        ctx.commit("setUser", resp);
        ctx.commit("setLoading", false);
      } catch (err) {
        ctx.commit("setUser", null);
      }
    },
    loginOut(ctx) {
      userApi.loginOut();
      ctx.commit("setUser", null);
    },
  }
}