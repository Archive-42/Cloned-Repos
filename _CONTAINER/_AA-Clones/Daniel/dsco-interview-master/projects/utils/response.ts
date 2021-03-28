/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

/**
 * All api requests will return a success: boolean value.
 *
 * This represents a successful response
 */
export interface DsResponse {
  success: true;
}

/**
 * All api requests will return a success: boolean value.
 *
 * This represents an error response
 */
export interface DsError {
  success: false;
  reason: string;
}

export class UnexpectedError implements DsError {
  readonly success = false;
  readonly reason = 'unexpected-error';

  constructor(public message: string) {
  }
}
