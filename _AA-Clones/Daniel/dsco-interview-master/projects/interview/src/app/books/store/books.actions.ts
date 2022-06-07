/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Book } from '@models/book';
import { Action } from '@ngrx/store';
import { BookSearchFailure, BookSearchRequest } from '@requests/book-search.request';
import { UnexpectedError } from '@utils/response';

export class BookSearchAction implements Action {
  static readonly type = '[Books] Search';
  readonly type = BookSearchAction.type;

  constructor(public request: BookSearchRequest) {
  }
}

export class BookSearchSuccessAction implements Action {
  static readonly type = '[Books] Search Success';
  readonly type = BookSearchSuccessAction.type;

  constructor(public books: Book[]) {
  }
}

export class BookSearchFailAction implements Action {
  static readonly type = '[Books] Search Fail';
  readonly type = BookSearchFailAction.type;

  constructor(public error: UnexpectedError | BookSearchFailure) {
  }
}

/**
 * These are the three actions that can happen on the books page:
 * • The user can search for a book
 * • That book search can succeed
 * • That book search can fail
 */
export type BooksActions = BookSearchAction | BookSearchSuccessAction | BookSearchFailAction;
