import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store'
import { AuthorSearchRequest } from '@requests/author-search.request'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthorSearchAction } from './store/authors.actions'
import { selectAllAuthors, selectAuthorsSearching, selectAuthorsSearchStr } from './store/authors.selectors';
@Component({
  selector: 'ds-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsComponent implements OnInit {
  searchStr$ = this.store.select(selectAuthorsSearchStr)
  searching$ = this.store.select(selectAuthorsSearching)

  authors$ = this.store.select(selectAllAuthors)
  numAuthors$ = this.authors$.pipe(map(authors => authors.length))

  noAuthorsFound$ = combineLatest(this.searchStr$, this.searching$, this.numAuthors$).pipe(
    map(([searchStr, searching, numAuthors]) => {
      return !!searchStr && !searching && !numAuthors;
    })
  )

  constructor(private store: Store<any>) { }


  ngOnInit(): void {
  }

  search(text: string): void {
    this.store.dispatch(new AuthorSearchAction(new AuthorSearchRequest({query: text})))
  }

}
