/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { BookSearchRequest, BookSearchStringQuery } from '@requests/book-search.request';
import { DsRequestResponse } from '@utils/request';
import { generateMockBooksAndAuthors } from './db/author.db';
import { getMockBooks } from './db/book.db';
import { Mock } from './mock';

generateMockBooksAndAuthors();

/**
 * Note: Mocks don't become active until they are registered in mock.http-interceptor.ts
 * registerMockClass(BooksMocks);
 */
export class BooksMocks {
  @Mock(BookSearchRequest)
  mockBookSearchRequest(request: BookSearchRequest): DsRequestResponse<BookSearchRequest> {
    // TODO: Don't assume the request is always a string query
    const body = request.body as BookSearchStringQuery;

    const query = body.query.toLowerCase();
    const books = getMockBooks().filter(book => book.title.toLowerCase().includes(query) || book.subtitle?.toLowerCase()?.includes(query));

    return {
      success: true,
      books
    };
  }
}
