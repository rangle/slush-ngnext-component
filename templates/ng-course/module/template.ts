import <%= componentName %> from './component';

// declaring the module
angular.module('<%= module %>', [])
  .directive(
    makeSelector(<%= componentName %>),
    makeDirective(<%= componentName %>));
