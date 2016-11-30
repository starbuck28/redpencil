describe("Red Pencil Promotions", function() {
  it("should be defined", function () {
    expect(RedPencil.item1).toBeDefined();
  });
  it("should be able to determine a sale price when a percentage discount is applied", function() {
    var price = RedPencil.getNewPrice(RedPencil.item1, 15);
    expect(price).toEqual(18.7);
  });
});
