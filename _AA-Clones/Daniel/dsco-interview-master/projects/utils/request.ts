/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { DsError, DsResponse } from './response';

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * This is a base class that represents an api request
 * It is used for Mocking as well as sharing API definitions with a backend.
 *
 * It has three generic types:
 * B: The expected request body type (null or undefined if the request is a GET)
 * R: The successful response type
 * E: The failed error response type
 */
export abstract class DsRequest<B, R extends DsResponse, E extends DsError> {
  public readonly path: string;
  public readonly host: string;
  public readonly method: ApiMethod;
  public headers: Record<string, string> = {};
  public body: B;
  /**
   * These three fields are kludges that help typescript infer the B, R, and E types based off class instances.
   * They don't exist in runtime.  DON'T DELETE!
   */
  protected __B!: B;
  protected __R!: R;
  protected __E!: E;

  protected constructor(method: ApiMethod, path: string, body: B, host = 'localhost:3000') {
    this.path = path;
    this.host = host;
    this.method = method;
    this.body = body;
  }

  public get url(): string {
    return `https://${this.host}${this.path}`;
  }
}

export type DsRequestBody<A extends DsRequest<any, any, any>> = A extends DsRequest<infer B, any, any> ? B : never;

export type DsRequestResponse<A extends DsRequest<any, any, any>> = A extends DsRequest<any, infer R, any> ? R : never;

export type DsRequestError<A extends DsRequest<any, any, any>> = A extends DsRequest<any, any, infer E> ? E : never;
