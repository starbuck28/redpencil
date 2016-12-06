# redpencil
Red Pencil Code Kata (Source: https://stefanroock.wordpress.com/2011/03/04/red-pencil-code-kata/)

We provide a shopping portal, where dealers can offer their goods (similar to Amazon market place). We want to support red pencil promotions for reduced prices. During the red pencil promotion the old price is crossed out in red and the new reduced price is written next to it.

To avoid misuse of red pencil promotions the red pencil promotions are activated and deactivated automatically.

The scope of the Code Kata is the implementations of the rules for activation and end of red pencil promotions.

A red pencil promotion starts due to a price reduction. The price has to be reduced by at least 5% but at most be 30% and the previous price had to be stable for at least 30 days.

A red pencil promotion lasts 30 days as the maximum length.

If the price is further reduced during the red pencil promotion the promotion will not be prolonged by that reduction.

If the price is increased during the red pencil promotion the promotion will be ended immediately.

If the price if reduced during the red pencil promotion so that the overall reduction is more than 30% with regard to the original price, the promotion is ended immediately.

After a red pencil promotion is ended additional red pencil promotions may follow – as long as the start condition is valid: the price was stable for 30 days and these 30 days don’t intersect with a previous red pencil promotion.
