/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Book } from '@models/book';
import { BookSearchStringQuery } from '@requests/book-search.request';
import { keyBy } from '@utils/object-utils';
import { BooksActions, BookSearchAction, BookSearchSuccessAction } from './books.actions';

/**
 * This is the state that's required for the Books page.
 */
export interface BooksState {
  // Holds the books that have been returned by the search
  books: { [bookId: string]: Book };

  // The current search string
  searchString: string;

  // true if the user is actively searching for a book
  searching: boolean;
}

const defaultState: BooksState = {
  books: {},
  searching: false,
  searchString: ''
};

/**
 * This function is responsible for updating the current BooksState any time an action in BooksActions occurs.
 * @see BooksActions
 */
export function booksReducer(state: BooksState | undefined, action: BooksActions): BooksState {
  if (!state) {
    return defaultState;
  }

  switch (action.type) {
    case BookSearchAction.type:
      // TODO: Is it safe to assume this will always be a string query?
      const body = action.request.body as BookSearchStringQuery;
      return {...state, searching: true, searchString: body.query};
    case BookSearchSuccessAction.type:
      return {
        ...state,
        searching: false,
        books: keyBy(action.books, 'bookId')
      };
    default:
      return state;
  }
}
