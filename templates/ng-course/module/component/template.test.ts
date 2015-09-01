import {<%= componentName %>} from '.\<%= componentName %>';
import {expect} from 'chai';

export function main() {
  describe('<%= componentName %>',() => {
    it('should exist',() => {
      expect(<%= componentName %>).to.be.a('function');
    });

    it('should fail',() => {
      expect(<%= componentName %>).to.be.a('Object');
    });

  });
}
