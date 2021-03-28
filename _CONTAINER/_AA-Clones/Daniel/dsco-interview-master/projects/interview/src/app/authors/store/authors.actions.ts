import { Author } from '@models/author'
import { Action } from '@ngrx/store'
import { AuthorSearchFailure, AuthorSearchRequest } from '@requests/author-search.request'
import { UnexpectedError } from '@utils/response'

export class AuthorSearchAction implements Action {
    static readonly type = '[Authors] Search'
    readonly type = AuthorSearchAction.type;

    constructor(public request: AuthorSearchRequest){}
}

export class AuthorSearchSuccessAction implements Action {
    static readonly type = '[Authors] Search Success'
    readonly type = AuthorSearchSuccessAction.type

    constructor(public authors: Author[]){}
}

export class AuthorSearchFailAction implements Action {
    static readonly type = '[Authors] Search Fail'
    readonly type = AuthorSearchFailAction.type

    constructor(public error: UnexpectedError | AuthorSearchFailure) {}
}

export type AuthorsActions = AuthorSearchAction | AuthorSearchSuccessAction | AuthorSearchFailAction;
