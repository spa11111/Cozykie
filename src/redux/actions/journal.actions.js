import {
  JOURNAL_LOADED,
  ADD_JOURNAL_ENTRY,
  UPDATE_JOURNAL_ENTRY,
  DELETE_JOURNAL_ENTRY,
} from "../actionTypes";

export const journalLoaded = (entries) => ({
  type: JOURNAL_LOADED,
  payload: entries,
});

export const addJournalEntry = (entry) => ({
  type: ADD_JOURNAL_ENTRY,
  payload: entry,
});

export const updateJournalEntryAction = (entry) => ({
  type: UPDATE_JOURNAL_ENTRY,
  payload: entry,
});

export const deleteJournalEntryAction = (id) => ({
  type: DELETE_JOURNAL_ENTRY,
  payload: id,
});