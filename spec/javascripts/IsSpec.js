describe("is", function() {
    describe("equalTo", function() {
        it("should handle native values", function() {
            expect(is(1).equalTo(1)).toBe(true)
            expect(is("abc").equalTo("abc")).toBe(true)
        })

        it("should compare functions by reference", function() {
            var f = function() {}
            expect(is(f).equalTo(f)).toBe(true)
            expect(is(f).equalTo(function() {})).toBe(false)
        })

        describe("handling non values", function() {
            it("should treat nulls as equal", function() {
                expect(is(null).equalTo(null)).toBe(true)
            })

            it("should treat undefineds as equal", function() {
                expect(is(undefined).equalTo(undefined)).toBe(true)
            })

            it("should recognise difference between null and undefined", function() {
                var equals;
                equals =  is(null).equalTo(undefined)
                expect(equals).toBe(false)
                equals =  is(undefined).equalTo(null)
                expect(equals).toBe(false)
            })
        })

        describe("comparing objects", function() {
            it("should return true for objects of equal value", function() {
                var equals = is({a:"a"}).equalTo({a:"a"})
                expect(equals).toBe(true)
            })

            it("should return false for objects not of equal value", function() {
                var equals = is({a:"a"}).equalTo({a:"asdf"})
                expect(equals).toBe(false)
                equals = is({b:"a"}).equalTo({a:"a"})
                expect(equals).toBe(false)
            })

            it("should ignore property order", function() {
                var equals = is({a:"a", b:"b"}).equalTo({b:"b", a:"a"})
                expect(equals).toBe(true)
            })
        })

        describe("comparing arrays", function() {

            it("should return true for equal arrays", function() {
                var equals = is([1,2]).equalTo([1,2])
                expect(equals).toBe(true)
            });

            it("should return false for non equal arrays", function() {
                var equals = is([1,2]).equalTo([3,4])
                expect(equals).toBe(false)
            });

            it("should return false for partial equality", function() {
                var equals = is([1,2]).equalTo([1])
                expect(equals).toBe(false)

                equals = is([1]).equalTo([1,2])
                expect(equals).toBe(false)
            });

            it("should handle nested arrays", function() {
                var equals = is([1, [2, 3]]).equalTo([1, [2, 3]])
                expect(equals).toBe(true)
                equals = is([1, [2, 3]]).equalTo([1, [2]])
                expect(equals).toBe(false)
            })
        })
    })

    describe("empty", function() {
        it("should recognize empty strings", function() {
            expect(is("").empty()).toBe(true)
        })
        it("should recognize null objects", function() {
            expect(is(null).empty()).toBe(true)
        })
        it("should recognize undefined objects", function() {
            expect(is(undefined).empty()).toBe(true)
        })
        it("should recognize empty objects", function() {
            expect(is({}).empty()).toBe(true)
        })
        it("should recognize empty arrays", function() {
            expect(is([]).empty()).toBe(true)
        })
        it("should recognize non empties", function() {
            expect(is("abc. its as easy as 123.").empty()).toBe(false)
            expect(is([1]).empty()).toBe(false)
            expect(is({a:"a"}).empty()).toBe(false)
        })
    })

});
