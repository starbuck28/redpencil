describe("Red Pencil Promotions", function() {
  it("should be defined", function () {
    expect(RedPencil.item1).toBeDefined();
  });
  it("should be able to tell if an item is on sale or not", function() {
    RedPencil.item1.percent = 0;
    RedPencil.startOrStopSale(RedPencil.item1);
    expect(RedPencil.item1.sale).toEqual('N');
    RedPencil.item1.percent = 10;
    RedPencil.startOrStopSale(RedPencil.item1);
    expect(RedPencil.item1.sale).toEqual('Y');
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
  it("should be able to determine if an item initially qualifies for a RPP and if it continues to qualify as an RPP", function() {
    RedPencil.item1.percent = 0;
    RedPencil.item1.daysStable = 0;
    RedPencil.item1.rpp = 'N';
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('N');

    RedPencil.item1.percent = 5;
    RedPencil.item1.daysStable = 40;
    RedPencil.item1.rpp = 'N';
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('Y');

    RedPencil.item1.percent = 45;
    RedPencil.item1.daysStable = 40;
    RedPencil.item1.rpp = 'N';
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('N');

    RedPencil.item1.percent = 0;
    RedPencil.item1.daysStable = 0;
    RedPencil.item1.rpp = 'Y';
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('N');

    RedPencil.item1.percent = 20;
    RedPencil.item1.daysStable = 0;
    RedPencil.item1.rpp = 'Y';
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('Y');

    RedPencil.item1.percent = 40;
    RedPencil.item1.daysStable = 45;
    RedPencil.item1.rpp = 'Y';
    RedPencil.isItARedPencilPromotion(RedPencil.item1);
    expect(RedPencil.item1.rpp).toEqual('N');
  });

  it("should be able to reset an item's number of days with a stable price to default value", function() {
    RedPencil.item1.resetDaysStable();
    expect(RedPencil.item1.daysStable).toEqual(-1);
  });
  it("should be able to reset an item's number of days under a RPP to default value", function() {
    RedPencil.item1.resetDaysRPP();
    expect(RedPencil.item1.daysStable).toEqual(-1);
  });
  it("when a percent discount is applied, a new price is calculated, it should automatically check if it is a red pencil promotion", function() {
    RedPencil.item1.originalprice = 20;
    RedPencil.item1.currentprice = 20;
    RedPencil.item1.percent = 0;
    RedPencil.item1.daysStable = 35;
    RedPencil.item1.rpp = 'N';
    RedPencil.getNewPrice(RedPencil.item1, 2);
    expect(RedPencil.item1.rpp).toEqual("N");

    RedPencil.item1.originalprice = 20;
    RedPencil.item1.currentprice = 20;
    RedPencil.item1.percent = 0;
    RedPencil.item1.daysStable = 35;
    RedPencil.item1.rpp = 'N';
    RedPencil.getNewPrice(RedPencil.item1, 20);
    expect(RedPencil.item1.currentprice).toEqual(16);
    expect(RedPencil.item1.percent).toEqual(20);
    expect(RedPencil.item1.rpp).toEqual("Y");

    RedPencil.item1.originalprice = 20;
    RedPencil.item1.currentprice = 20;
    RedPencil.item1.percent = 0;
    RedPencil.item1.daysStable = 20;
    RedPencil.item1.rpp = 'N';
    RedPencil.getNewPrice(RedPencil.item1, 20);
    expect(RedPencil.item1.currentprice).toEqual(16);
    expect(RedPencil.item1.percent).toEqual(20);
    expect(RedPencil.item1.rpp).toEqual("N");

    RedPencil.getNewPrice(RedPencil.item1, 20);
    expect(RedPencil.item1.currentprice).toEqual(12.8);
    expect(RedPencil.item1.percent).toEqual(35.99999999999999);
    expect(RedPencil.item1.rpp).toEqual("N");

    RedPencil.item1.originalprice = 20;
    RedPencil.item1.currentprice = 16;
    RedPencil.item1.percent = 20;
    RedPencil.item1.daysStable = 20;
    RedPencil.item1.rpp = 'Y';
    RedPencil.getNewPrice(RedPencil.item1, 5);
    expect(RedPencil.item1.currentprice).toEqual(15.2);
    expect(RedPencil.item1.percent).toEqual(24.000000000000004);
    expect(RedPencil.item1.rpp).toEqual("Y");

    RedPencil.item1.originalprice = 20;
    RedPencil.item1.currentprice = 16;
    RedPencil.item1.percent = 20;
    RedPencil.item1.daysStable = 20;
    RedPencil.item1.rpp = 'Y';
    RedPencil.getNewPrice(RedPencil.item1, 20);
    expect(RedPencil.item1.currentprice).toEqual(12.8);
    expect(RedPencil.item1.percent).toEqual(35.99999999999999);
    expect(RedPencil.item1.rpp).toEqual("N");
  });

  it("when a percent discount is applied, the number of days an item's price is stable is reset and priceStablilityCounter is started", function() {
    RedPencil.item1.daysStable = 5;
    RedPencil.getNewPrice(RedPencil.item1, 20);
    expect(RedPencil.item1.daysStable).toEqual(0);
  });
  it("should be able to stop a sale, reset days price is stable, and stop a RPP", function() {
    RedPencil.item1.percent = 20;
    RedPencil.item1.sale = 'Y';
    RedPencil.item1.daysStable = 15;
    RedPencil.item1.daysRPP = 15;
    RedPencil.stopSale(RedPencil.item1);
    expect(RedPencil.item1.percent).toEqual(0);
    expect(RedPencil.item1.sale).toEqual('N');
    expect(RedPencil.item1.daysStable).toEqual(0);
    expect(RedPencil.item1.daysRPP).toEqual(-1);
  });

});

/*Source: https://jasmine.github.io/2.0/introduction.html*/
describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;
  var timerCallback2;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    timerCallback2 = jasmine.createSpy("timerCallback2");
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("should be able to count days an item's price is stable and be able to stop the counter/be able to track days under RPP and be able to stop counter", function() {

    var sampleItem = {
      name: "Tshirt",          //item name
      originalprice: 20,      //item price in $
      currentprice: 20,       //item price in $
      rpp: "N",                //under red prencil promotion (Y/N)
      sale: "N",               //on sale (Y/N)
      percent: 0,
      daysStable: -1,
      daysRPP: -1,
      st: 0,
      st2: 0,
      resetDaysStable: function() {
        sampleItem.daysStable = -1;
      },
      priceStablilityCounter: function() {
        sampleItem.daysStable += 1;
        timerCallback();
        //Recursive countdown
        sampleItem.st = setTimeout(sampleItem.priceStablilityCounter, 86400000);
        },
      daysRPPCounter: function() {
        sampleItem.daysRPP += 1;
        timerCallback2();
        //Recursive method
        sampleItem.st2 = setTimeout(sampleItem.daysRPPCounter, 86400000);
        },
      resetDayCounter: function() {
        clearTimeout(sampleItem.st);
      },
      resetRPPCounter: function() {
        clearTimeout(sampleItem.st2);
      }
    };

    expect(timerCallback).not.toHaveBeenCalled();
    expect(timerCallback2).not.toHaveBeenCalled();

    sampleItem.priceStablilityCounter();
    sampleItem.daysRPPCounter();

    expect(sampleItem.daysStable).toEqual(0);
    expect(timerCallback).toHaveBeenCalled();
    expect(timerCallback.calls.count()).toEqual(1);
    expect(sampleItem.daysRPP).toEqual(0);
    expect(timerCallback2).toHaveBeenCalled();
    expect(timerCallback2.calls.count()).toEqual(1);

    jasmine.clock().tick(86400000);  //Advances clock 86400000 miliseconds
    expect(timerCallback.calls.count()).toEqual(2);
    expect(sampleItem.daysStable).toEqual(1);
    expect(sampleItem.daysRPP).toEqual(1);
    expect(timerCallback2.calls.count()).toEqual(2);

    jasmine.clock().tick(1);  ////Advances clock another 1 milisecond
    expect(timerCallback.calls.count()).toEqual(2);
    expect(sampleItem.daysStable).toEqual(1);
    expect(sampleItem.daysRPP).toEqual(1);
    expect(timerCallback2.calls.count()).toEqual(2);

    jasmine.clock().tick(86399998);  ////Advances clock another 86399998 miliseconds
    expect(timerCallback.calls.count()).toEqual(2);
    expect(sampleItem.daysStable).toEqual(1);
    expect(sampleItem.daysRPP).toEqual(1);
    expect(timerCallback2.calls.count()).toEqual(2);

    jasmine.clock().tick(1);  ////Advances clock another 1 milisecond (for a total of 86400001 miliseconds)
    expect(timerCallback.calls.count()).toEqual(3);
    expect(sampleItem.daysStable).toEqual(2);
    expect(sampleItem.daysRPP).toEqual(2);
    expect(timerCallback2.calls.count()).toEqual(3);

    jasmine.clock().tick(86400000);
    expect(timerCallback.calls.count()).toEqual(4);
    expect(sampleItem.daysStable).toEqual(3);
    expect(sampleItem.daysRPP).toEqual(3);
    expect(timerCallback2.calls.count()).toEqual(4);

    sampleItem.resetDayCounter();
    sampleItem.resetRPPCounter();

    expect(timerCallback.calls.count()).toEqual(4);
    expect(sampleItem.daysStable).toEqual(3);
    expect(sampleItem.daysRPP).toEqual(3);

    jasmine.clock().tick(100000000);
    expect(timerCallback.calls.count()).toEqual(4);
    expect(sampleItem.daysStable).toEqual(3);
    expect(sampleItem.daysRPP).toEqual(3);
  });

  it("should be able to recognize that a RPP should end, stop corresponding timer, and reset daysRPP value", function() {
    var sampleItem = {
      name: "Tshirt",          //item name
      originalprice: 20,      //item price in $
      currentprice: 20,       //item price in $
      rpp: "N",                //under red prencil promotion (Y/N)
      sale: "N",               //on sale (Y/N)
      percent: 0,
      daysStable: -1,
      daysRPP: -1,
      st: 0,
      st2: 0,
      resetDaysStable: function() {
        sampleItem.daysStable = -1;
      },
      resetDaysRPP: function() {
        sampleItem.daysRPP = -1;
      },
      priceStablilityCounter: function() {
        sampleItem.daysStable += 1;
        timerCallback();
        //Recursive countdown
        sampleItem.st = setTimeout(sampleItem.priceStablilityCounter, 86400000);
        },
      daysRPPCounter: function() {
        if(sampleItem.daysRPP === 30) {
          sampleItem.resetRPPCounter();
          sampleItem.resetDaysRPP();
        } else {
        sampleItem.daysRPP += 1;
        timerCallback2();
        //Recursive method
        sampleItem.st2 = setTimeout(sampleItem.daysRPPCounter, 86400000);
      }
        },
      resetDayCounter: function() {
        clearTimeout(sampleItem.st);
      },
      resetRPPCounter: function() {
        clearTimeout(sampleItem.st2);
      }
    };

    expect(timerCallback2).not.toHaveBeenCalled();

    sampleItem.daysRPPCounter();

    expect(sampleItem.daysRPP).toEqual(0);
    expect(timerCallback2).toHaveBeenCalled();
    expect(timerCallback2.calls.count()).toEqual(1);

    jasmine.clock().tick(86400000);  //Advances clock another 86400000 miliseconds

    expect(sampleItem.daysRPP).toEqual(1);
    expect(timerCallback2.calls.count()).toEqual(2);

    jasmine.clock().tick(2592000000);  //Advances clock miliseconds to total of 31 days total (including previous clicks)

    expect(sampleItem.daysRPP).toEqual(-1);
  });

  it("when an item's percent off is changed, it should calculate item's current price, calculate total percent off, trigger check to see if it qualifies for a RPP, stop days stable timer, reset days stable, and start priceStablilityCounter", function() {
    var sampleItem = {
      name: "Tshirt",          //item name
      originalprice: 20,      //item price in $
      currentprice: 20,       //item price in $
      rpp: "N",                //under red prencil promotion (Y/N)
      sale: "N",               //on sale (Y/N)
      percent: 0,
      daysStable: 30,
      daysRPP: -1,
      st: 0,
      st2: 0,
      resetDaysStable: function() {
        sampleItem.daysStable = -1;
      },
      resetDaysRPP: function() {
        sampleItem.daysRPP = -1;
      },
      priceStablilityCounter: function() {
        sampleItem.daysStable += 1;
        timerCallback();
        //Recursive countdown
        sampleItem.st = setTimeout(sampleItem.priceStablilityCounter, 86400000);
        },
      daysRPPCounter: function() {
        if(sampleItem.daysRPP === 30) {
          sampleItem.resetRPPCounter();
          sampleItem.resetDaysRPP();
        } else {
        sampleItem.daysRPP += 1;
        timerCallback2();
        //Recursive method
        sampleItem.st2 = setTimeout(sampleItem.daysRPPCounter, 86400000);
      }
        },
      resetDayCounter: function() {
        clearTimeout(sampleItem.st);
      },
      resetRPPCounter: function() {
        clearTimeout(sampleItem.st2);
      }
    };

    RedPencil.getNewPrice(sampleItem, 20);
    expect(sampleItem.currentprice).toEqual(16);
    expect(sampleItem.percent).toEqual(20);
    expect(sampleItem.sale).toEqual('Y');
    expect(sampleItem.rpp).toEqual('Y');
    expect(sampleItem.daysStable).toEqual(0);
    expect(sampleItem.daysRPP).toEqual(0);

    jasmine.clock().tick(1296000000);  //Advance clock 15 days

    expect(sampleItem.currentprice).toEqual(16);
    expect(sampleItem.percent).toEqual(20);
    expect(sampleItem.sale).toEqual('Y');
    expect(sampleItem.rpp).toEqual('Y');
    expect(sampleItem.daysStable).toEqual(15);
    expect(sampleItem.daysRPP).toEqual(15);

    RedPencil.getNewPrice(sampleItem, 25);

    expect(sampleItem.currentprice).toEqual(12);
    expect(sampleItem.percent).toEqual(40);
    expect(sampleItem.sale).toEqual('Y');
    expect(sampleItem.rpp).toEqual('N');
    expect(sampleItem.daysStable).toEqual(0);
    expect(sampleItem.daysRPP).toEqual(-1);

  });

});
