import { createStore } from "vuex";

export default createStore({
  state: {
    BGChangeCode: null,
    TableUploadData: [],
    SupportFloat: 0,
    DeviceType: '设备类型',
    LocalDeviceSizeArr: [],
  },
  mutations: {
    mutChangeBG(state, value) {
      state.BGChangeCode = value;
    },
    mutUploadData(state, value) {
      state.TableUploadData = value;
    },
    mutSupportFloat(state, value) {
      state.SupportFloat = value;
    },
    mutDeviceType(state, value) {
      state.DeviceType = value
    },
    MutLocalDeviceSizeArr(state, value) {
      state.LocalDeviceSizeArr = value
    }
  },
  actions: {
    actChangeBG({ commit }, value) {
      commit("mutChangeBG", value);
    },
    actUploadData({ commit }, value) {
      commit("mutUploadData", value);
    },
    actSupportFloat({ commit },value) {
      commit('mutSupportFloat',value)
    },
    actDeviceType({commit}, value) {
      commit('mutDeviceType',value)
    },
    ActLocalDeviceSizeArr({ commit },value) {
      commit('MutLocalDeviceSizeArr',value)
    }
  },
  modules: {},
});
