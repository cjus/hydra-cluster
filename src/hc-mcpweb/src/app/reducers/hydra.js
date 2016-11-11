import Immutable from 'immutable';
import {
  GET_HYDRA_SERVICES_STATUS_SUCCESS,
  GET_HYDRA_SERVICES_STATUS_FAILURE,
  GET_HYDRA_COMMAND_STATUS_SUCCESS
} from 'actions/hydra';

const initialState = Immutable.Map({
});

export default function hydraReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HYDRA_SERVICES_STATUS_SUCCESS:
      return state.set('services', action.data);
    case GET_HYDRA_SERVICES_STATUS_FAILURE:
      return state.set('services', {
        result: [{
          error: 'Unable to connect to Hydra server'
        }]
      });
    case GET_HYDRA_COMMAND_STATUS_SUCCESS:
      return state.set('command', action.data);
    default:
      return state;
  }
}
