/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

export interface Book {
  bookId: string;

  title: string;
  subtitle?: string;
  year: number;

  authorId: string;
}
