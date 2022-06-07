/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomItem<T>(array: ArrayLike<T>): T {
  return getRandomItems(array, 1)[0];
}

export function getRandomItems<T>(array: ArrayLike<T>, num: number): T[] {
  if (array.length < num) {
    return Array.from(array);
  }

  const usedIndexes: number[] = [];
  const result: T[] = [];
  for (let i = 0; i < num; i++) {
    let random = randomInt(0, array.length - 1);
    while (usedIndexes.includes(random)) {
      random = randomInt(0, array.length - 1);
    }
    usedIndexes.push(random);
    result.push(array[random]);
  }
  return result;
}
