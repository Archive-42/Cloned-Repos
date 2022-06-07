const { expect } = require('chai');
const { saveCategories } = require('../save-categories');
describe("saveCategories()", () => {
  it('adds the new category to the list', () => {
    // Arrange
    const categories = ['One', 'Two', 'Three'];
    const newCategory = 'New Category';

    // Act
    // Call the saveCategories function with the categories
    // and newCategory values and store the result in a
    // variable named "result"
    const result = saveCategories(categories, newCategory)
    // Assert
    expect(result).to.include(newCategory);
  });

  it('sorts the list', () => {
    // Arrange
    const categories = ['Cat 3', 'Cat1'];
    const newCategory = 'Cat 2';

    // Act
    const result = saveCategories(categories, newCategory);

    // Assert
    // Use the "eql" method to compare "member-wise equality"
    // of two arrays instead of the "equal" method.
    // If the array in result is sorted, what should you
    // compare to?
    expect(categories).to.eql(result);
  });

  it('makes sure the result and the original are different', () => {
    // Arrange
    // Declare any categories and newCategory values here.
    const categories = ['Blondie', 'Brownie'];
    const newCategory = 'DarkChocolate';
    // Act
    const result = saveCategories(categories, newCategory);

    // Assert
    expect(result).to.not.equal(categories);
  });
});
