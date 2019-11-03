const state = {
    id: localStorage.getItem('cityId') || 1,
    nm: localStorage.getItem('cityNm') || '北京'
}
const mutations = {
    CITY_INFO(state, payload){
        state.id = payload.id;
        state.nm = payload.nm;
    }
}
const actions = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}