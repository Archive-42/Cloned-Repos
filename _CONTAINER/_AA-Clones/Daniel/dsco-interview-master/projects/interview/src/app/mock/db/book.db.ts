/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Book } from '@models/book';
import { getRandomItem, randomInt } from '@utils/random';

/**
 * This file represents a mock database for books.
 *
 * The books are automatically generated when authors are generated.
 */

const mockBooks: Book[] = [];

export function getMockBooks(): Book[] {
  return mockBooks;
}

/**
 * Generates a book and adds it to the mock book list
 */
export function generateRandomMockBook(authorId: string): Book {
  const result: Book = {
    bookId: randomInt(0, 1000000).toString(10),
    title: generateBookTitle(),
    subtitle: randomInt(1, 3) === 1 ? generateBookTitle() : undefined,
    year: randomInt(1900, 2020),
    authorId
  };

  mockBooks.push(result);

  return result;
}

function generateBookTitle(): string {
  switch (randomInt(1, 6)) {
    case 1:
      return `The ${getRandomItem(adjectives)} ${getRandomItem(nouns)}`;
    case 2:
      return `To ${getRandomItem(verbs)} ${getRandomItem(nouns)}`;
    case 3:
      return `${getRandomItem(nouns)}, ${getRandomItem(nouns)}, and One ${getRandomItem(adjectives)} ${getRandomItem(nouns)}`;
    case 4:
      return `${getRandomItem(verbs)}, ${getRandomItem(verbs)}, ${getRandomItem(verbs)}`;
    case 5:
      return `A Story About Finding Your ${getRandomItem(adjectives)} ${getRandomItem(nouns)}`;
    case 6:
      return `Once in a ${getRandomItem(adjectives)} ${getRandomItem(nouns)}`;
    default:
      throw new Error('Unexpected number');
  }
}

const nouns = [
  'Man', 'Woman', 'Mountain', 'State', 'Ocean', 'Country', 'Building', 'Cat', 'Airline',
  'House', 'Ocean', 'Bird', 'Photograph', 'Banana', 'Eye', 'Light', 'Sun', 'Dog', 'Suitcase', 'Flower',
  'Milk', 'Rice', 'Snow', 'Rain', 'Water', 'Food', 'Music', 'Luggage', 'Love', 'Wealth', 'Happiness',
  'Pride', 'Fear', 'Religion', 'Belief', 'History', 'Communication'
];

const adjectives = [
  'Ashy', 'Black', 'Blue', 'Gray', 'Green', 'Icy', 'Lemon', 'Mango', 'Orange', 'Purple', 'Red', 'Salmon', 'White', 'Yellow',
  'Alive', 'Better', 'Careful', 'Clever', 'Dead', 'Easy', 'Famous', 'Gifted', 'Hallowed', 'Helpful', 'Important', 'Inexpensive',
  'Mealy', 'Mushy', 'Odd', 'Poor', 'Powerful', 'Rich', 'Shy', 'Tender', 'Unimportant', 'Uninterested', 'Vast', 'Wrong',
  'Aggressive', 'Agreeable', 'Ambitious', 'Brave', 'Calm', 'Delightful', 'Eager', 'Faithful', 'Gentle', 'Happy', 'Jolly', 'Kind',
  'Lively', 'Nice', 'Obedient', 'Polite', 'Proud', 'Silly', 'Thankful', 'Victorious', 'Witty', 'Wonderful', 'Zealous',
  'Attractive', 'Bald', 'Beautiful', 'Chubby', 'Clean', 'Dazzling', 'Drab', 'Elegant', 'Fancy', 'Fit', 'Flabby', 'Glamorous',
  'Gorgeous', 'Handsome', 'Long', 'Magnificent', 'Muscular', 'Plain', 'Plump', 'Quaint', 'Scruffy', 'Shapely', 'Short', 'Skinny',
  'Stocky', 'Ugly', 'Unkempt', 'Unsightly'
];

const verbs = [
  'Be', 'Beat', 'Become', 'Begin', 'Bend', 'Bet', 'Bid', 'Bite', 'Blow', 'Break', 'Bring',
  'Build', 'Burn', 'Buy', 'Catch', 'Choose', 'Come', 'Cost', 'Cut', 'Dig', 'Dive', 'Do',
  'Draw', 'Dream', 'Drive', 'Drink', 'Eat', 'Fall', 'Feel', 'Fight', 'Find', 'Fly', 'Forget',
  'Forgive', 'Freeze', 'Get', 'Give', 'Go', 'Grow', 'Hang', 'Have', 'Hear', 'Hide', 'Hit', 'Hold',
  'Hurt', 'Keep', 'Know', 'Lay', 'Lead', 'Leave', 'Lend', 'Let', 'Lie', 'Lose', 'Make', 'Mean', 'Meet',
  'Pay', 'Put', 'Read', 'Ride', 'Ring', 'Rise', 'Run', 'Say', 'See', 'Sell', 'Send', 'Show', 'Shut', 'Sing',
  'Sit', 'Sleep', 'Speak', 'Spend', 'Stand', 'Swim', 'Take', 'Teach', 'Tear', 'Tell', 'Think', 'Throw', 'Understand', 'Wake', 'Wear', 'Win', 'Write'
];
