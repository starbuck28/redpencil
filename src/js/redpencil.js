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
        if(item.percent >= 5 && item.percent <= 30) {
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
    percentUpOrDown: percentUpOrDown
  };
})();

//Red Pencil Promotion:
  //Triggered automatically when item price is reduced by 5-30%, price has been stable for 30 days, has not had RPP for those 30 days
  //Price is set to be reduced for 30 days
  //Can continue if price is further reduced to max of 30%, but time is not prolonged
  //Ends if
    //Price increased
    //Price reduced more than 30%
    //RPP has lasted > 30 days

//Issues to address:
    //Need way to record whether price has been last increased or decreased in order to provide to isItARedPencilPromotion function for eval
    //Need to change getNewPrice function so instead of adding cumulative percent it changes total percent off each time and adjusts values accordingly
    //Need to refactor code to DRY!!
