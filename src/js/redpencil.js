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
      if(item.daysStable >= 30 && item.percent >= 5 && item.percent <= 30) {
          item.rpp = "Y";
        } else {
          item.rpp = "N";
        }
      } else if(item.rpp === "Y") {
        if(item.percent >= 5 && item.percent <= 30) {
          item.rpp = "Y";
        } else {
          item.rpp = "N";
        }
      }
  }


  //Calculates item's new current price based on percent off value
  function getNewPrice(item, percent) {
      item.currentprice -= item.currentprice * percent * 0.01;
      //Calculates total percent off
      this.getTotalPercentOff(item);
      //Checks to see if it qualifies for RPP
      this.isItARedPencilPromotion(item);
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

  return {
    item1: item1,
    getNewPrice: getNewPrice,
    getTotalPercentOff: getTotalPercentOff,
    startOrStopSale: startOrStopSale,
    isItARedPencilPromotion: isItARedPencilPromotion
  };
})();

//Old Price
//New Price

//Red Pencil Promotion:
  //Triggered automatically when item price is reduced by 5-30%, price has been stable for 30 days, has not had RPP for those 30 days
  //Price is set to be reduced for 30 days
  //Can continue if price is further reduced to max of 30%, but time is not prolonged
  //Ends if
    //Price increased
    //Price reduced more than 30%
    //RPP has lasted > 30 days

//Need way to keep track of items
  //Item object with
    //Item name
    //Item original price
    //Item new price
    //Percent off the price
    //RPP or no
    //RPP start date (can be N/A)
    //RPP stop date (can be N/A)
    //Days price stable

//Need way to reduce item price
//Need way to increase item price
//Need way to calculate/store new price
//Need way to track price stability
//Need way to countdown RPP
