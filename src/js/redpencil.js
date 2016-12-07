var RedPencil = (function() {

  //Sample item for sale
  var item1 = {
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
    lastpricechange: "none",
    //Resets # of days price is stable
    resetDaysStable: function() {
      item1.daysStable = -1;
    },
    resetDaysRPP: function() {
      item1.daysRPP = -1;
    },
    //A counter that increases the number of days an item's price is stable every 24h
    priceStablilityCounter: function() {
      item1.daysStable += 1;
      //Recursive method
      item1.st = setTimeout(item1.priceStablilityCounter, 86400000);
      },
    daysRPPCounter: function() {
      if(item1.daysRPP === 30) {
        item1.resetRPPCounter();
        item1.resetDaysRPP();
      }
      item1.daysRPP += 1;
      //Recursive method
      item1.st2 = setTimeout(item1.daysRPPCounter, 86400000);
    },
    //Stops priceStablilityCounter
    resetDayCounter: function() {
      clearTimeout(item1.st);
    },
    resetRPPCounter: function() {
      clearTimeout(item1.st2);
    }
  };

function Item(name, originalprice, currentprice, rpp, sale, percent, daysStable, daysRPP, st, st2, lastpricechange) {
  this.name = name;          //item name
  this.originalprice = originalprice;      //item price in $
  this.currentprice = currentprice;       //item price in $
  this.rpp = rpp;                //under red prencil promotion (Y/N)
  this.sale = sale;               //on sale (Y/N)
  this.percent = percent;
  this.daysStable = daysStable;
  this.daysRPP = daysRPP;
  this.st = st;
  this.st2 = st2;
  this.lastpricechange = lastpricechange;
}

Item.prototype.resetDaysStable = function() {
  this.daysStable = -1;
}

Item.prototype.resetDaysRPP = function() {
  this.daysRPP = -1;
}

Item.prototype.priceStablilityCounter = function() {
  this.daysStable += 1;
  //Recursive method
  this.st = setTimeout(this.priceStablilityCounter, 86400000);
  }

Item.prototype.daysRPPCounter = function() {
  if(this.daysRPP === 30) {
    this.resetRPPCounter();
    this.resetDaysRPP();
  }
  this.daysRPP += 1;
  //Recursive method
  this.st2 = setTimeout(this.daysRPPCounter, 86400000);
}

Item.prototype.resetDayCounter = function() {
  clearTimeout(this.st);
}

Item.prototype.resetRPPCounter = function() {
  clearTimeout(this.st2);
}



var item2 = new Item("Tshirt", 20, 20, "N", "N", 0, -1, -1, 0, 0, "none");
  //Checks to see if item meets RPP parameters
  function isItARedPencilPromotion(item) {
    if(item.rpp === "N") {
      //If item's price has been stable x 30d and percent of is between 5 & 30%
      if(item.daysStable >= 30 && item.percent >= 5 && item.percent <= 30) {
          //Item qualifies for RPP
          item.rpp = "Y";
          //Start RPP counter
          item.daysRPPCounter();
        } else {
          //Item does not qualify for RPP
          item.rpp = "N";
        }
        //If an item is already under a RPP
      } else if(item.rpp === "Y") {
        //If the item's new total percent off is still within 5 and 30%
        if(item.percent >= 5 && item.percent <= 30 && item.lastpricechange !== "up") {
          //Item qualifies to continue as a RPP
          item.rpp = "Y";
        } else {
          //Otherwise the item stops being a RPP
          item.rpp = "N";
          //RPP counter is stopped and reset
          item.resetRPPCounter();
          item.resetDaysRPP();
        }
      }
  }


  //Calculates item's new current price based on percent off value
  function getNewPrice(item, percent) {
      item.currentprice = item.originalprice - (item.originalprice * percent * 0.01);
      //Track whether price change is up or down
      this.percentUpOrDown(item, percent);
      //Update item's total percent off
      item.percent = percent;
      //Checks to see if item is on sale
      this.startOrStopSale(item);
      //Checks to see if it qualifies for RPP
      this.isItARedPencilPromotion(item);
      //Resets daysStable
      item.resetDayCounter();
      item.resetDaysStable();
      //Starts Day counter
      item.priceStablilityCounter();
  }

  //Calculates total percent off original price
  function getTotalPercentOff(item) {
    item.percent = (item.originalprice - item.currentprice) / (item.originalprice * 0.01)
  }

  //Updates sale state (Y or N) based on item's percent off value
  function startOrStopSale(item) {
    if (item.percent > 0) {
      item.sale = 'Y';
    } else {
      item.sale = 'N';
    }
  }

  function stopSale(item) {
    item.percent = 0;
    item.sale = 'N';
    item.resetDayCounter();
    item.resetDaysStable();
    item.priceStablilityCounter();
    item.resetRPPCounter();
    item.resetDaysRPP();
    item1.currentprice = item1.originalprice;
  }

  function percentUpOrDown(item, percent) {
    if(item.percent < percent) {
        item.lastpricechange = "down";
    } else if(item.percent > percent) {
      item.lastpricechange = "up";
    }
  }

  return {
    item1: item1,
    getNewPrice: getNewPrice,
    getTotalPercentOff: getTotalPercentOff,
    startOrStopSale: startOrStopSale,
    isItARedPencilPromotion: isItARedPencilPromotion,
    stopSale: stopSale,
    percentUpOrDown: percentUpOrDown,
    Item: Item
  };
})();

    //Need to refactor code to DRY!!
