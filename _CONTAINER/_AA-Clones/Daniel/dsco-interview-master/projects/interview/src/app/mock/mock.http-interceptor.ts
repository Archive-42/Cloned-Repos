/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { randomInt } from '@utils/random';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { DscoHttpRequest } from '../shared/http.service';
import { AuthorsMocks } from './authors.mocks';
import { BooksMocks } from './books.mocks';
import { mocks, registerMockClass } from './mock';

registerMockClass(BooksMocks);
registerMockClass(AuthorsMocks)

export class MockHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req instanceof DscoHttpRequest) {
      const mock = mocks.find(m => !m.disabled && req.dsRequest instanceof m.request);

      if (mock) {
        const responseBody = JSON.stringify(mock.callback(req.dsRequest));

        const response = new HttpResponse({
          body: JSON.parse(responseBody),
          status: 200
        });

        // Bytes / (num bytes per megabit) / (6 megabits per second) * (1 second) + random time for latency;
        const RESPONSE_TIME = responseBody.length / 125000 / 6 * 1000 + randomInt(500, 1500);
        return timer(RESPONSE_TIME).pipe(mapTo(response));
      }
    }

    return next.handle(req);
  }

}
