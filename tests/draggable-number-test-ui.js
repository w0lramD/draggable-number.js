var should = chai.should();

describe("Draggable-number (UI)", function() {
  var input = document.createElement("input");

  describe("DraggableNumberElement._onInputBlur", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.value = 10;
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should update the value based on the input and convert it to float", function() {
      input.value = "42";
      this.el._onInputBlur(null);
      this.el.get().should.equal(42);
    });
  });

  describe("DraggableNumberElement._onMouseDown", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should set isDragging to false", function() {
      this.el._isDragging = true;
      this.el._onMouseDown({clientX: 10, clientY: 42});
      this.el._isDragging.should.equal(false);
    });

    it("Should save mouse position in lastMousePosition", function() {
      var position = {clientX: 10, clientY: 42};
      this.el._onMouseDown(position);
      this.el._lastMousePosition.should.deep.equal({x: position.clientX, y: position.clientY});
    });
  });

  describe("DraggableNumberElement._onMouseUp", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.style.display = '';
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should set isDragging to false", function() {
      this.el._isDragging = true;
      this.el._onMouseUp(null);
      this.el._isDragging.should.equal(false);
    });

    it("Should display the input if there is no drag", function() {
      this.el._isDragging = false;
      this.el._onMouseUp(null);
      this.el._input.style.display.should.equal('');
      this.el._span.style.display.should.equal('none');
    });

    it("Should remove the body prevent selection", function() {
      document.body.style['user-select'] = 'none';
      this.el._onMouseUp(null);

      document.body.style['user-select'].should.equal('all');
    });
  });

  describe("DraggableNumberElement._onInputKeyDown", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.style.display = '';
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should blur the element if enter key is pressed", function() {
      this.el._input.style.display = 'block';
      this.el._input.focus();
      document.activeElement.should.equal(this.el._input);
      // Simulate enter key.
      this.el._onInputKeyDown({charCode: 13});
      document.activeElement.should.not.equal(this.el._input);
      //this.el.input.style.display.should.equal('none');
    });
  });

  describe("DraggableNumberElement input value change", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.value = 42;
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should update the component value on input.onchange", function() {
      input.value = 10;
      input.onchange();
      this.el.get().should.equal(10);
    });
  });

  describe("DraggableNumberElement.showSpan", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.style.display = '';
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should show the span element", function() {
      this.el._span.style.display = 'none';
      this.el._showSpan();
      this.el._span.style.display.should.equal('');
    });

    it("Should hide the input element", function() {
      this.el._input.style.display = 'block';
      this.el._showSpan();
      this.el._input.style.display.should.equal('none');
    });
  });

  describe("DraggableNumberElement.showInput", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.style.display = '';
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should show the input element", function() {
      this.el._showInput();
      this.el._input.style.display.should.equal('');
    });

    it("Should hide the span element", function() {
      this.el._span.style.display = 'block';
      this.el._showInput();
      this.el._span.style.display.should.equal('none');
    });
  });

  describe("DraggableNumberElement.preventSelection", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      document.body.style['user-select'] = '';
      this.el = new DraggableNumber(input);
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.style['user-select'] = '';
      document.body.removeChild(input);
    });

    it("Should prevent selection by default", function() {
      this.el._preventSelection();
      document.body.style['user-select'].should.equal('none');
    });

    it("Should remove preventSelection when passed false", function() {
      document.body.style['user-select'] = 'none';
      this.el._preventSelection(false);
      document.body.style['user-select'].should.equal('all');
    });
  });

  describe("DraggableNumberElement._onMouseMove", function() {
    beforeEach(function() {
      document.body.appendChild(input);
      input.value = 10;
      this.el = new DraggableNumber(input);
      this.el._lastMousePosition = {x: 0, y: 0}
    });

    afterEach(function() {
      this.el.destroy();
      delete this.el;
      document.body.removeChild(input);
    });

    it("Should not modify value if mouse position is less than dragThreshold (10).", function() {
      this.el._onMouseMove({clientX: 1, clientY: 0});
      this.el.get().should.equal(10);
    });

    it("Should increment value by 1 if there is no modifier key.", function() {
      this.el._onMouseMove({clientX: 20, clientY: 0});
      this.el.get().should.equal(11);
    });

    it("Should increment value by 10 if shift key is pressed.", function() {
      this.el._onMouseMove({clientX: 20, clientY: 0, shiftKey: true});
      this.el.get().should.equal(20);
    });

    it("Should increment value by 0.1 if ctrl key is pressed.", function() {
      this.el._onMouseMove({clientX: 20, clientY: 0, ctrlKey: true});
      this.el.get().should.equal(10.1);
    });

    it("Should save new mouse position if difference is bigger than dragThreshold.", function() {
      this.el._onMouseMove({clientX: 20, clientY: 0});
      this.el._lastMousePosition.x.should.equal(20);
    });

    it("Should not save new mouse position if difference is smaller than dragThreshold.", function() {
      this.el._onMouseMove({clientX: 9, clientY: 0});
      this.el._lastMousePosition.x.should.equal(0);
    });
  });
});
