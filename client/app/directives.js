app.directive("jsCompile", function($compile) {
  return {
    scope: {
        template: '=template',
    },
    link: function(scope, element) {
      console.log("template");
      console.log(scope);
      //console.log(data);
      //console.log(template);
      var template = scope.template;
      console.log(template);
      //template = "<b>should be bold</b>";
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);
    }
  };
});
