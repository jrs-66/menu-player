app.directive("jsCompile", function($compile) {
  return {
    scope: {
        template: '=template',
    },
    link: function(scope, element) {
      console.log("template");
      console.log(scope.template);
      var template = scope.template;
      template = "<b>should be bold</b>";
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);
    }
  };
});
