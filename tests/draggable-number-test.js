var should = chai.should();

describe("Draggable-number", function() {
  var input = document.createElement("input");

  describe("DraggableNumberElement.getLargestDelta", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      this.el = new DraggableNumber.Element(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should return 0 if there is no difference", function() {
      var pos = {x: 142, y: 2145};
      var result = this.el.getLargestDelta(pos, pos);
      result.should.equal(0);
    });

    it("Should return the largest delta (y)", function() {
      var posA = {x: 100, y: 200};
      var posB = {x: 142, y: 243};
      var result = this.el.getLargestDelta(posB, posA);
      result.should.equal(43);
    });

    it("Should return the largest delta (x)", function() {
      var posA = {x: 100, y: 200};
      var posB = {x: 145, y: 244};
      var result = this.el.getLargestDelta(posB, posA);
      result.should.equal(45);
    });

    it("Should return the largest delta even if the difference is negative", function() {
      var posA = {x: 100, y: -200};
      var posB = {x: 142, y: -243};
      var result = this.el.getLargestDelta(posB, posA);
      result.should.equal(-43);
    });
  });

  describe("DraggableNumberElement.getNumberOffset", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      this.el = new DraggableNumber.Element(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should return 1 if delta is positive and there is no modifier", function() {
      var result = this.el.getNumberOffset(1, DraggableNumber.MODIFIER_NONE);
      result.should.equal(1);
    });

    it("Should return -1 if delta is negative and there is no modifier", function() {
      var result = this.el.getNumberOffset(-21, DraggableNumber.MODIFIER_NONE);
      result.should.equal(-1);
    });

    it("Should return 10 if delta is positive and there is a large modifier", function() {
      var result = this.el.getNumberOffset(17, DraggableNumber.MODIFIER_LARGE);
      result.should.equal(10);
    });

    it("Should return -10 if delta is negative and there is a large modifier", function() {
      var result = this.el.getNumberOffset(-1, DraggableNumber.MODIFIER_LARGE);
      result.should.equal(-10);
    });

    it("Should return 0.1 if delta is positive and there is a small modifier", function() {
      var result = this.el.getNumberOffset(19, DraggableNumber.MODIFIER_SMALL);
      result.should.equal(0.1);
    });

    it("Should return -0.1 if delta is negative and there is a small modifier", function() {
      var result = this.el.getNumberOffset(-142, DraggableNumber.MODIFIER_SMALL);
      result.should.equal(-0.1);
    });
  });

  describe("DraggableNumberElement.onInputBlur", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.value = 10;
      this.el = new DraggableNumber.Element(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should update the value based on the input and convert it to float", function() {
      input.value = "42";
      this.el.onInputBlur(null);
      this.el.value.should.equal(42);
    });
  });

  describe("DraggableNumberElement.updateNumber", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.value = 32;
      this.el = new DraggableNumber.Element(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should update the value", function() {
      this.el.updateNumber(10);
      this.el.value.should.equal(42);
    });

    it("Should update the input.value", function() {
      this.el.updateNumber(12);
      this.el.input.value.should.equal('44');
    });

    it("Should update the span.innerHTML", function() {
      this.el.updateNumber(8);
      this.el.span.innerHTML.should.equal('40');
    });
  });

  describe("DraggableNumberElement.hasMovedEnough", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      this.el = new DraggableNumber.Element(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should return false if difference between 2 mouse positions is less than 10", function() {
      var result = this.el.hasMovedEnough({x: 0, y: 42}, {x: 2, y: 43});
      result.should.equal(false);
    });

    it("Should return true if difference between 2 mouse positions is larger or equal to 10", function() {
      var result = this.el.hasMovedEnough({x: 0, y: 42}, {x: 0, y: 52});
      result.should.equal(true);
    });

    it("Should return true if difference between 2 mouse positions is larger or equal to 10 even if difference is negative", function() {
      var result = this.el.hasMovedEnough({x: 0, y: 42}, {x: 0, y: 30});
      result.should.equal(true);
    });
  });

});
