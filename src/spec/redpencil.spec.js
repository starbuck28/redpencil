describe("Red Pencil Promotions", function() {
  it("should be defined", function () {
    expect(RedPencil.item1).toBeDefined();
  });
  it("should be able to determine a sale price when a percentage discount is applied", function() {
    RedPencil.getNewPrice(RedPencil.item1, 15);
    expect(RedPencil.item1.currentprice).toEqual(17);
    });
  it("should be able to calculate a new price when item price is increased by a percentage", function() {
      RedPencil.getNewPrice(RedPencil.item1, -10);
      expect(RedPencil.item1.currentprice).toEqual(18.7);
  });
  it("should be able to calculate the total percentage difference between the original price and current price of item", function() {
    RedPencil.item1.currentprice = 20;
    RedPencil.getTotalPercentOff(RedPencil.item1);
    expect(RedPencil.item1.percent).toEqual(0);
    RedPencil.item1.currentprice = 15;
    RedPencil.getTotalPercentOff(RedPencil.item1);
    expect(RedPencil.item1.percent).toEqual(25);
  });
  it("should be able to modify item sale key value pair based on item percent value", function() {
    RedPencil.item1.percent = 25;
    RedPencil.startOrStopSale(RedPencil.item1);
    expect(RedPencil.item1.sale).toEqual('Y');
    RedPencil.item1.percent = 0;
    RedPencil.startOrStopSale(RedPencil.item1);
    expect(RedPencil.item1.sale).toEqual('N');
  });
  it("should be able to determine if an item is on sale between 5 and 30%", function() {
    RedPencil.item1.percent = 0;
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('N');
    RedPencil.item1.percent = 5;
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('Y');
    RedPencil.item1.percent = 45;
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('N');
  });
});

/*Source: https://jasmine.github.io/2.0/introduction.html*/
describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("causes a timeout to be called synchronously", function() {

    function priceStable () {
      RedPencil.item1.daysStable += 1;
      timerCallback();
      var st = setTimeout(priceStable, 86400000);
    }

    expect(timerCallback).not.toHaveBeenCalled();

    priceStable();

    expect(RedPencil.item1.daysStable).toEqual(0);
    expect(timerCallback).toHaveBeenCalled();
    expect(timerCallback.calls.count()).toEqual(1);
    
    /*jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();*/




  });
});
