var RedPencil = (function() {
  var item1 = {
    name: "Tshirt",          //item name
    original-price: 22,      //item price in $
    current-price: 22,       //item price in $
    rpp: "N",                //under red prencil promotion (Y/N)
    sale: "N",               //on sale (Y/N)
    percent: 0               //percent discounted
  };
  return {
    item1: item1
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
//Need way to calculate price reduction percentage
//Need way to track price stability
//Need way to countdown RPP
