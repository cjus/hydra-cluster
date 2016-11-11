import Immutable from 'immutable';
import { DELETE_ENTITY } from 'actions/data';

const initialState = Immutable.Map({});

export default function entitiesReducer(state = initialState, action) {
  if (action.entities !== undefined) {
    return state.mergeDeep(action.entities);
  }
  switch (action.type) {
    case DELETE_ENTITY:
      return state.deleteIn([action.entityType, action.entityId]);
      break;
    default:
      return state;
  }
}
