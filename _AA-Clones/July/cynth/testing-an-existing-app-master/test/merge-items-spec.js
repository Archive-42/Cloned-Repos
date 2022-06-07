const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
const handlebars = require("handlebars");
const helpers = require("handlebars-helpers");
helpers.math({ handlebars });

describe("The mergeItems function", () => {
  const template = `
  <table>
    <tbody>
      {{#each items}}
        <tr>
          <td>{{ add @index 1 }}</td>
          <td>{{ title }}</td>
          <td>{{ category }}</td>
          <td>
            {{#if isComplete}}
            {{else}}
              <form method="POST" action="/items/{{ add @index 1 }}">
                <button class="pure-button">Complete</button>
              </form>
            {{/if}}
          </td>
        </tr>
      {{/each}}
    </tbody>
  </table>
`;
  it("should return no <tr>s and no <td>s for no items", () => {
    //arrange
    let arr = [];
    //act
    let func = mergeItems(template, arr);
    //assert
      expect(func).to.contain('<table>');
      expect(func).to.contain('</table>');
      expect(func).to.contain('<tbody>');
      expect(func).to.contain('</tbody>');
      expect(func).to.not.contain('<tr>');
      expect(func).to.not.contain('</tr>');
      expect(func).to.not.contain('<td>');
      expect(func).to.not.contain('</td>');
      expect(func).to.not.contain('<!-- Content here -->');

  });

  it("should return a single <tr>, four <td>s, and a <form> for one uncompleted item", () => {
    //arrange
    const items = [
      { title: 'Title 1', category: 'Category 1' },
    ];
    //act
    let func = mergeItems(template, items)
    //assert
    expect(func).to.contain('<table>');
    expect(func).to.contain('</table>');
    expect(func).to.contain('<tbody>');
    expect(func).to.contain('</tbody>');
    expect(func).to.contain('<tr>');
    expect(func).to.contain('</tr>');
    expect(func).to.contain(`<td>Title 1</td>`);
    expect(func).to.contain(`<td>Category 1</td>`);
    expect(func).to.contain('<form method="POST" action="/items/1">');
    expect(func).to.not.contain('<!-- Content here -->');

  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    //arrange
    const items = [
      { title: 'Title 1', category: 'Category 1', isComplete: true },
    ];
    //act
    let func = mergeItems(template, items)
    //assert
    expect(func).to.contain('<table>');
    expect(func).to.contain('</table>');
    expect(func).to.contain('<tbody>');
    expect(func).to.contain('</tbody>');
    expect(func).to.contain('<tr>');
    expect(func).to.contain('</tr>');
    expect(func).to.contain(`<td>Title 1</td>`);
    expect(func).to.contain(`<td>Category 1</td>`);
    expect(func).to.not.contain('<form method="POST" action="/items/1">');
    expect(func).to.not.contain('<!-- Content here -->');
  });

  it("should return three <tr>s for three items", () => {
    //arrange
    const items = [
      { title: 'Title 1', category: 'Category 1', isComplete: true },
      { title: 'Title 2', category: 'Category 2', isComplete: true },
      { title: 'Title 3', category: 'Category 3', isComplete: true },
    ];
    //act
    let func = mergeItems(template, items);
    //assert
    expect(func).to.contain('<table>');
    expect(func).to.contain('</table>');
    expect(func).to.contain('<tbody>');
    expect(func).to.contain('</tbody>');
    expect(func).to.contain('<tr>');
    expect(func).to.contain('</tr>');
    expect(func).to.contain(`<td>Title 1</td>`);
    expect(func).to.contain(`<td>Category 1</td>`);
    expect(func).to.contain(`<td>Title 3</td>`);
    expect(func).to.contain(`<td>Category 3</td>`);
    expect(func).to.contain(`<td>Title 2</td>`);
    expect(func).to.contain(`<td>Category 2</td>`);
    expect(func).to.not.contain('<form method="POST" action="/items/1">');
    expect(func).to.not.contain('<!-- Content here -->');
  });
});
