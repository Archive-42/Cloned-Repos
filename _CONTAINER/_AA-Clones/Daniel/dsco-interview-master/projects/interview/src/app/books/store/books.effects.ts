/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { elseMap, resultMap } from 'ts-results/rxjs-operators';
import { HttpService } from '../../shared/http.service';
import { BookSearchAction, BookSearchFailAction, BookSearchSuccessAction } from './books.actions';

@Injectable()
export class BooksEffects {
  @Effect()
  bookSearch$: Observable<BookSearchSuccessAction | BookSearchFailAction> = this.actions$.pipe(
    ofType<BookSearchAction>(BookSearchAction.type),
    debounceTime(300),
    switchMap(action => this.httpService.request(action.request)),
    resultMap(resp => new BookSearchSuccessAction(resp.books)),
    elseMap(err => new BookSearchFailAction(err))
  );
  @Effect({dispatch: false})
  bookSearchFail$ = this.actions$.pipe(
    ofType<BookSearchFailAction>(BookSearchFailAction.type),
    tap(() => alert('Failed to search for books.')) // This is a placeholder for real error handling.  No need to change it
  );

  constructor(private actions$: Actions, private httpService: HttpService) {
  }
}
