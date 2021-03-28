/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

export type KeysOfType<T, TProp> = keyof Pick<T, {
  [K in keyof T]: T[K] extends TProp ? K : never
}[keyof T]>;

export function keyWith<T, K extends PropertyKey, V>(items: T[], mapper: (item: T) => [K, V]): { [key in K]: V } {
  return items.reduce((dict, item) => {
    const mapped = mapper(item);
    dict[mapped[0]] = mapped[1];
    return dict;
  }, {} as { [key in K]: V });
}

export function keyBy<T, K extends KeysOfType<T, PropertyKey>, R extends Extract<T[K], PropertyKey>>(
  items: T[],
  keyName: K
): Record<R, T> {
  return keyWith(items, item => [item[keyName] as R, item]);
}
