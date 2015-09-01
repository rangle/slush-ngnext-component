import <%= componentName %> from './component';

// declaring the module
angular.module('<%= moduleName %>', [])
  .directive(
    makeSelector(<%= componentName %>),
    makeDirective(<%= componentName %>));
