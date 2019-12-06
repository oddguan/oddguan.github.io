---
title: "Best Time to Buy and Sell Stock III"
description: "hard leetcode problem"
date: 2019-10-09 13:21:00
---

## Problem Statement

Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

Example 1:
```
Input: [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
             Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
```
Example 2:
```
Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
```
Example 3:
```
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

## Idea
We know how to calculate the maximum profit if only one trasaction is allowed:
Iterate through the array, record both the min price and the max profit possible. If current price minus min price is greater than the current max profit, update the max profit. If current price is less than min price, update the min price.

```cpp
class Solution {
public:
    int maxProfitOneBuy(vector<int> prices) {
        int buyMin = INT_MAX, result = 0;
        for (int price : prices) {
            buyMin = min(buyMin, price);
            result = max(result, price - buyMin);
        }
        return result;
    }
};
```

Then how do we generalize this approach so that we maximize the profit of doing two transactions?

### Two transactions
Suppose we are looking at a specific price in the prices array, and the price is \$300, and suppose at this point the profit of doing one transaction is \$100, which we can calculate from the algorithm above. We can imagine that this \$100 is given to us for free, and the current price of doing the second trasaction would be \$300 - \$100 = \$200. Now, we actually redefined the problem as again a one-trasaction problem. If we know the max profit of doing only one trasactions at a certain price point, then the price at this point of doing the second trasaction is the actual price minus the profit that we made from doing the first transaction. The final result would be to maximize the second buying profit.

```cpp
class Solution {
public:
    int maxProfit(vector<int> prices) {
        int oneBuy = INT_MAX, twoBuy = INT_MAX;
        int oneBuyOneSell = 0, twoBuyTwoSell = 0;
        for (int price : prices) {
            oneBuy = min(oneBuy, price);
            oneBuyOneSell = max(oneBuyOneSell, price - oneBuy);
            twoBuy = min(twoBuy, price - oneBuyOneSell);
            twoBuyTwoSell = max(twoBuyTwoSell, price - twoBuy);
        }
        return twoBuyTwoSell;
    }
};
```
### Complexity Analysis
Runtime: $O(N)$

Space: $O(1)$

