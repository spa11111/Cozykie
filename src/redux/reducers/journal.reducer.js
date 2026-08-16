import {
  JOURNAL_LOADED,
  ADD_JOURNAL_ENTRY,
  UPDATE_JOURNAL_ENTRY,
  DELETE_JOURNAL_ENTRY,
} from "../actionTypes";

const initialState = {
  entries: [],
};

const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOURNAL_LOADED:
      return { ...state, entries: action.payload };

    case ADD_JOURNAL_ENTRY:
      return { ...state, entries: [action.payload, ...state.entries] };

    case UPDATE_JOURNAL_ENTRY:
  return {
    ...state,
    entries: state.entries.map((entry) =>
      entry.id === action.payload.id ? action.payload : entry
    ),
  };

    case DELETE_JOURNAL_ENTRY:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.id !== action.payload),
      };

    default:
      return state;
  }
};

export default journalReducer;