/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Author } from '@models/author';
import { DsRequest } from '@utils/request';
import { DsError, DsResponse } from '@utils/response';

export interface AuthorSearchResponse extends DsResponse {
  authors: Author[];
}

export interface AuthorSearchStringQuery {
  query: string,
}

export type AuthorSearchRequestBody = AuthorSearchStringQuery | AuthorSearchIdQuery;

export interface AuthorSearchIdQuery {
  authorIds: string[];
}
export interface AuthorSearchFailure extends DsError {
  reason: 'invalid-search';
  message: string;
}

// TODO: Change this from a GET request to a POST request, allowing to search by either a query or specific author ids.
/**
 * This is a class that represents a single physical instance of an author search.
 *
 * Because it's a GET, it has a null body.
 * Its successful response type is AuthorSearchResponse.
 * Its failure response type is AuthorSearchFailure.
 */
export class AuthorSearchRequest extends DsRequest<AuthorSearchRequestBody, AuthorSearchResponse, AuthorSearchFailure> {
  constructor(public body: AuthorSearchRequestBody) {
    super('POST', `/authors`, body);
  }
}
