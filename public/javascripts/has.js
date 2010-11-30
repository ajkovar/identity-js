(function() {

  function has(o) {
    return new Wrapper(o)
  }

  function Wrapper(o) {
    this.object = o
  }

  Wrapper.prototype = {
    properties: function(regex) {
      var properties = [];
      for(var i in this.object) {
        if(!regex || regex.test(i)) {
          properties.push(i)
        }
      }
      return properties
    },
    methods: function(regex) {
      var properties = this.properties(regex), methods = [];
      for(var i=0, length=properties.length;i<length;i++) {
        var prop = properties[i];
        if(this.object[prop].constructor===Function) {
          methods.push(prop)
        }
      }
      return methods
    },
    localMethods: function(regex) {
      var methods = this.methods(regex), localMethods = [];
      for(var i=0, length=methods.length;i<length;i++) {
        var method=methods[i];
        if(this.object.hasOwnProperty(method)) {
          localMethods.push(method)
        }
      }
      return localMethods
    }
  }

  window.has=has

} ())
