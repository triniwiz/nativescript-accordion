var Accordion = require("nativescript-accordion").Accordion;
var accordion = new Accordion();

describe("greet function", function() {
    it("exists", function() {
        expect(accordion.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(accordion.greet()).toEqual("Hello, NS");
    });
});