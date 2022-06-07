/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Type } from '@angular/core';
import { DsRequest, DsRequestError, DsRequestResponse } from '@utils/request';
import { DsError, DsResponse } from '@utils/response';

export const mocks: MockedApi[] = [];

// Noop, simply ensures the class is included in the bundle.  The decorators take care of the rest
export function registerMockClass(c: Type<any>): void {

}

export function Mock<T extends DsRequest<any, any, any> = DsRequest<any, any, any>>(
  request: Type<T>,
  disabled?: boolean
): <R extends DsRequestResponse<T> | DsRequestError<T>> (t: any, prop: string, d: TypedPropertyDescriptor<() => R> | TypedPropertyDescriptor<(request: T) => R>) => void {
  return (target: any, propertyKey: string) => {
    mocks.push({callback: target[propertyKey], disabled, request});
  };
}

export interface MockedRequest {
  request: Type<DsRequest<any, any, any>>;
  disabled?: boolean;
  callback: (request: DsRequest<any, any, any>) => DsResponse | DsError;
}

export type MockedApi = MockedRequest;
