var RedPencil = (function() {
  var st;

  var item1 = {
    name: "Tshirt",          //item name
    originalprice: 20,      //item price in $
    currentprice: 20,       //item price in $
    rpp: "N",                //under red prencil promotion (Y/N)
    sale: "N",               //on sale (Y/N)
    percent: 0,
    daysStable: -1,
    st: 0,
    resetDaysStable: function() {
      this.daysStable = -1;
    },
    priceStablilityCounter: function() {
      this.daysStable += 1;
      //Recursive countdown
      this.st = setTimeout(priceStablilityCounter, 86400000);
      },
    resetDayCounter: function() {
      clearTimeout(this.st);
    }
  };

  function getNewPrice(item, percent) {
    item.currentprice -= item.currentprice * percent * 0.01;
  }

  function getTotalPercentOff(item) {
    item.percent = (item.originalprice - item.currentprice) / (item.originalprice * 0.01)
  }

  function startOrStopSale(item) {
    if (item.percent > 0) {
      item.sale = 'Y';
    } else {
      item.sale = 'N';
    }
  }

  function isItARedPencilPromotion(item) {
    if (item.percent >= 5 && item.percent <= 30) {
      item.rpp = "Y";
    } else {
      item.rpp = "N";
    }
  }
  
  return {
    st: st,
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
