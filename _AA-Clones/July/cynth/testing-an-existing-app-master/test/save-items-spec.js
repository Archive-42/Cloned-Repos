const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    //arrange
    const arr = [
      {title: 'Title 1', category: 'Category 1'},
      {title: 'Title 2', category: 'Category 2'}
    ]
    const newItem = {title: 'Title 3', category: 'Category 3'}
    //act
    const func = saveItems(arr, newItem)
    //assert
    expect(func).to.contain(newItem)
  });

  it('makes sure the result and the original are different', () => {
    //arrange
    const arr = [
      {title: 'Title 1', category: 'Category 1'},
      {title: 'Title 2', category: 'Category 2'}
    ]
    const newItem = {title: 'Title 3', category: 'Category 3'}
    //act
    const func = saveItems(arr, newItem)
    //assert
    expect(func).to.not.equal(arr)
  });
});
