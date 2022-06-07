import { Author } from '@models/author';
import { AuthorSearchStringQuery } from '@requests/author-search.request'
import { keyBy } from '@utils/object-utils'
import { AuthorsActions, AuthorSearchAction, AuthorSearchSuccessAction } from './authors.actions'

export interface AuthorsState {
    authors : { [AuthorId: string]: Author }

    searchString: string;
    searching: boolean;
}

const defaultState: AuthorsState = {
    authors: {},
    searching: false,
    searchString: ''
}


export function authorsReducer(state: AuthorsState | undefined, action: AuthorsActions): AuthorsState {
    if (!state) {
        return defaultState
    }

    switch (action.type) {
        case AuthorSearchAction.type:
            const body = action.request.body as AuthorSearchStringQuery
            return {...state, searching: true, searchString: body.query};
        case AuthorSearchSuccessAction.type:
            return {
                ...state,
                searching: false,
                authors: keyBy(action.authors, 'authorId')
            }
        default:
            return state
    }

}
