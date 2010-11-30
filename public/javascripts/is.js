(function() {

  var is = function(param) {
    return new Wrapper(param)
  }

  var Wrapper = function(o) {
    this.o = o;
  }

  Wrapper.prototype = {
    equalTo: function(other) {
      var obj=this.o;

      if(obj===other) {
        return true
      }

      // handle undefined vs null craziness
      if(obj === undefined || other === undefined
         || obj == null || other == null) {
        return false
      }

      if(obj.constructor === Array) {
        return arrayEquals(obj, other)
      } 
      if(obj.constructor === Object) {
        return objectEquals(obj, other)
      } 
      return false
    }
  }

  var arrayEquals = function(a1, a2) {
    if(a1.length!==a2.length) {
      return false
    }

    for(var i=0, length=a2.length;i<length;i++) {
        if(!is(a1[i]).equalTo(a2[i])) {
          return false
        }
    }
    return true
  }

  var objectEquals = function(o1, o2) {
    for(var i in o1) {
      if(!is(o1[i]).equalTo(o2[i])) {
        return false
      }
    }
    for(var i in o2) {
      if(!is(o2[i]).equalTo(o1[i])) {
        return false
      }
    }
    return true
  }

  window.is=is

} ())
