app.directive("jsCompile", function($compile) {
  return {
    scope: {
        template: '=',
    },
    link: function(scope, element) {
      console.log("template");
      console.log(scope.template);
      var template = scope.template;
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);
    }
  };
});
