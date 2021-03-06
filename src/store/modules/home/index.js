import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = {
  getTracksLoading: null,
  tracks: [],
  getTracksFail: null,
  activeGenre: null,
  lastPage: null,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
