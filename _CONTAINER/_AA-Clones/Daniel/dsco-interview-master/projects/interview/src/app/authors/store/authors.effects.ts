import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { elseMap, resultMap } from 'ts-results/rxjs-operators';
import { HttpService } from '../../shared/http.service';
import { AuthorSearchAction, AuthorSearchFailAction, AuthorSearchSuccessAction } from './authors.actions';

@Injectable()
export class AuthorsEffects {
  @Effect()
  authorSearch$: Observable<AuthorSearchSuccessAction | AuthorSearchFailAction> = this.actions$.pipe(
    ofType<AuthorSearchAction>(AuthorSearchAction.type),
    debounceTime(300),
    switchMap(action => this.httpService.request(action.request)),
    resultMap(resp => new AuthorSearchSuccessAction(resp.authors)),
    elseMap(err => new AuthorSearchFailAction(err))
  );
  @Effect({dispatch: false})
  authorSearchFail$ = this.actions$.pipe(
    ofType<AuthorSearchFailAction>(AuthorSearchFailAction.type),
    tap(() => alert('Failed to search for authors.')) // This is a placeholder for real error handling.  No need to change it
  );

  constructor(private actions$: Actions, private httpService: HttpService) {
  }
}
