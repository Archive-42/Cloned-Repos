const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');
const handlebars = require("handlebars");
const helpers = require("handlebars-helpers");
helpers.math({ handlebars });

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
    <div>
      <ul>
        {{#each categories}}
          <li>{{ this }}</li>
        {{/each}}
      </ul>
    </div>
  `;

    it("should return no <li>s for no categories", () => {
      let arr = [];
      let func = mergeCategories(template, arr, 'li');

      expect(func).to.contain('<div>');
      expect(func).to.contain('</div>');
      expect(func).to.contain('<ul>');
      expect(func).to.contain('</ul>');
      expect(func).to.not.contain('<li>');
      expect(func).to.not.contain('</li>');
      expect(func).to.not.contain('<!-- Content here -->');
    });

    it("should return a single <li> for one category", () => {
      let arr = ['']
      let func = mergeCategories(template, arr, 'li');

      expect(func).to.contain('<div>');
      expect(func).to.contain('</div>');
      expect(func).to.contain('<ul>');
      expect(func).to.contain('</ul>');
      expect(func).to.contain(`<li>${arr[0]}</li>`);
      expect(func).to.not.contain('<!-- Content here -->');
    });

    it("should return an <li> for each category", () => {
      let arr = ['Blondie', 'Brownie', 'DarkChocolate'];
      let func = mergeCategories(template, arr, 'li');

      expect(func).to.contain('<div>');
      expect(func).to.contain('</div>');
      expect(func).to.contain('<ul>');
      expect(func).to.contain('</ul>');
      expect(func).to.contain(`<li>${arr[0]}</li>`);
      expect(func).to.contain(`<li>${arr[1]}</li>`);
      expect(func).to.contain(`<li>${arr[2]}</li>`);


      expect(func).to.not.contain('<!-- Content here -->');
    });
  });

  context("using <option> tags", () => {
    const template = `
    <div>
      <select>
        {{#each categories}}
          <option>{{ this }}</option>
        {{/each}}
      </select>
    </div>
  `;

    it("should return no <option>s for no categories", () => {
      //arrange
      let arr = [];


      //act
      const func = mergeCategories(template, arr, 'option')

      //assert
      expect(func).to.contain('<div>');
      expect(func).to.contain('</div>');
      expect(func).to.contain('<select>');
      expect(func).to.contain('</select>');
      expect(func).to.not.contain('<option>');
      expect(func).to.not.contain('</option>');
      expect(func).to.not.contain('<!-- Content here -->');


    });

    it("should return a single <option> for one category", () => {
      //arrange
      let arr = ['Brownie'];
      //act
      const func = mergeCategories(template, arr, 'option')
      //assert
      expect(func).to.contain('<div>');
      expect(func).to.contain('</div>');
      expect(func).to.contain('<select>');
      expect(func).to.contain('</select>');
      expect(func).to.contain(`<option>${arr[0]}</option>`);
      expect(func).to.not.contain('<!-- Content here -->');
    });

    it("should return an <option> for each category", () => {
     //arrange
     let arr = ['Brownie', 'DarkChocolate'];
     //act
     const func = mergeCategories(template, arr, 'option')
     //assert
     expect(func).to.contain('<div>');
     expect(func).to.contain('</div>');
     expect(func).to.contain('<select>');
     expect(func).to.contain('</select>');
     expect(func).to.contain(`<option>${arr[0]}</option>`);
     expect(func).to.not.contain('<!-- Content here -->');
    });
  });
});
