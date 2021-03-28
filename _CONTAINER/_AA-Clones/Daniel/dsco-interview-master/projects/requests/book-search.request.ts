/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Book } from '@models/book';
import { DsRequest } from '@utils/request';
import { DsError, DsResponse } from '@utils/response';

export interface BookSearchStringQuery {
  query: string;
}

export interface BookSearchIdQuery {
  bookIds: string[];
}

export type BookSearchRequestBody = BookSearchStringQuery | BookSearchIdQuery;

export interface BookSearchResponse extends DsResponse {
  books: Book[];
}

export interface BookSearchFailure extends DsError {
  reason: 'invalid-search';
  message: string;
}

/**
 * This is a class that represents a single physical instance of a book search.
 *
 * The request body type is BookSearchRequestBody.
 * Its successful response type is BookSearchResponse.
 * Its failure response type is BookSearchFailure.
 */
export class BookSearchRequest extends DsRequest<BookSearchRequestBody, BookSearchResponse, BookSearchFailure> {
  constructor(public body: BookSearchRequestBody) {
    super('POST', `/books`, body);
  }
}
