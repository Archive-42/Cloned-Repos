/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookSearchRequest } from '@requests/book-search.request';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookSearchAction } from './store/books.actions';
import { selectAllBooks, selectBooksSearching, selectBooksSearchStr } from './store/books.selectors';

@Component({
  selector: 'ds-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  searchStr$ = this.store.select(selectBooksSearchStr);
  searching$ = this.store.select(selectBooksSearching);

  books$ = this.store.select(selectAllBooks);
  numBooks$ = this.books$.pipe(map(books => books.length));

  noBooksFound$ = combineLatest(this.searchStr$, this.searching$, this.numBooks$).pipe(
    map(([searchStr, searching, numBooks]) => {
      return !!searchStr && !searching && !numBooks;
    })
  );

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
  }

  search(text: string): void {
    this.store.dispatch(new BookSearchAction(new BookSearchRequest({query: text})));
  }
}
