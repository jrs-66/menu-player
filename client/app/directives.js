app.directive("jsCompile", function($compile) {
  return {
    scope: {
        template: '=',
    },
    link: function(scope, element) {
      var template = scope.template;
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);
    }
  };
});
