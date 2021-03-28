/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

/**
 * This file extracts data from the Books state, so the UI can respond to changes to that data.
 */

const booksState = createFeatureSelector<BooksState>('books');

export const selectBooksMap = createSelector(booksState, state => state.books);
export const selectAllBooks = createSelector(selectBooksMap, map => Object.values(map));

export const selectBooksSearchStr = createSelector(booksState, state => state.searchString);
export const selectBooksSearching = createSelector(booksState, state => state.searching);
