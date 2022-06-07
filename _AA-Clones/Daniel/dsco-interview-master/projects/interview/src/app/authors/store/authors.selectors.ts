import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthorsState } from './authors.reducer'

const authorsState = createFeatureSelector<AuthorsState>('authors');

export const selectAuthorsMap = createSelector(authorsState, state => state.authors)
export const selectAllAuthors = createSelector(selectAuthorsMap, map => Object.values(map))
export const selectAuthorsSearchStr = createSelector(authorsState, state => state.searchString)
export const selectAuthorsSearching = createSelector(authorsState, state => state.searching)
