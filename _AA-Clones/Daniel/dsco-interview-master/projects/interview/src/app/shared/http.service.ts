/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSearchRequest } from '@requests/book-search.request';
import { DsRequest, DsRequestBody, DsRequestError, DsRequestResponse } from '@utils/request';
import { DsError, DsResponse, UnexpectedError } from '@utils/response';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Err, Ok, Result } from 'ts-results';

export class DscoHttpRequest<T extends DsRequest<any, any, any>> extends HttpRequest<DsRequestBody<T>> {
  constructor(public dsRequest: T) {
    super(dsRequest.method, dsRequest.url, dsRequest.body, {
      headers: new HttpHeaders(dsRequest.headers)
    });
  }

  clone(update?: any): HttpRequest<DsRequestBody<T>> {
    const result = new DscoHttpRequest(this.dsRequest);
    const cloned = super.clone(update);
    return Object.assign(result, cloned);
  }
}

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {

  }

  /**
   * A custom request function capable of sending DsRequest objects.
   *
   * Returns an Ok Result if successful, otherwise an Err result with the failure response.  An http failure returns an Err<UnexpectedError>.
   *
   * @see DsRequest
   * @see BookSearchRequest
   * @see Result
   */
  request<T extends DsRequest<any, DsResponse, DsError>>(request: T): Observable<Result<DsRequestResponse<T>, DsRequestError<T> | UnexpectedError>> {
    return this.httpClient.request(new DscoHttpRequest(request)).pipe(
      filter((event): event is HttpResponse<DsRequestResponse<T> | DsRequestError<T>> => event instanceof HttpResponse),
      map(event => {
        const response: DsRequestResponse<T> | DsRequestError<T> = event.body!;

        if (response.success) {
          return new Ok(response);
        } else {
          return new Err(response);
        }
      }),
      // If there's an error, return a failed result of an unexpected error
      catchError(e => of(new Err(new UnexpectedError(JSON.stringify(e)))))
    );
  }
}
