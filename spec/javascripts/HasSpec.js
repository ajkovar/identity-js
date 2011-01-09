describe("has", function() {
    var o;

    beforeEach(function() {
        o = {
            a: function() {},
            b: function() {}
        }
    });

    describe("getting methods", function() {

        it("should list all methods on an object", function() {
            var methods = has(o).methods()
            expect(methods).toEqual(["a", "b"])
        });

        it("should ignore fields", function() {
            o.b="string"
            var methods = has(o).methods()
            expect(methods).toEqual(["a"])
        });

        it("should find methods that are local to an object", function() {
            var Child = function() {}
            Child.prototype = o;
            var c = new Child()
            c.c=function() {}
            
            var methods = has(c).methods()
            expect(methods).toContain("a")
            expect(methods).toContain("b")
            expect(methods).toContain("c")

            var localMethods = has(c).localMethods()
            expect(localMethods).toContain("c")
            expect(localMethods).not.toContain("a")
            expect(localMethods).not.toContain("b")
        });
    })
    
    describe("getting properties", function() {
        it("should find all properties on an object", function() {
            o.b="string"
            var properties = has(o).properties()
            expect(properties).toEqual(["a", "b"])
        });

        it("should allow searching of properties on an object by regex", function() {
            var properties = has(o).properties(/a/)
            expect(properties).toEqual(["a"])
        });
    })

});
