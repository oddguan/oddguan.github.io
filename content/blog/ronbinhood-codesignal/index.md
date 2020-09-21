---
title: Robinhood Web Engineer (New Grad) Coding Interview
date: 2020-09-21 19:42:05
description: Robinhood Onsite面经
---

以下为 Web Engineer Coding 轮在 CodeSignal 平台上的面经：

给一些 feature 的字符串，要求是根据给定的 numberOfRows 返回一个字符串数组，用分隔符分开且不能超过最长 width limit。需要注意的是，如果某一个 feature 在一行放不下，应该把它放在下一行里，规则是尽量 maintain 给定数组的顺序。解决完前两个 test case 以后需要解决剩下的 5 个，要求是如果某一个字符串所有的行数都放不下，那就将其放进当前最短的行里。最后 followup：输入数据量太大怎么办

```
featuredCollections:
["E-Commerce",
 "100 Most Popular",
 "Retail",
 "Consumer Products",
 "Internet",
 "Entertainment",
 "Media",
 "Apparel"]
screenWidthCharacters: 30
numberOfRows: 4
separator: " / "
Expected Output:
["E-Commerce / 100 Most Popular",
 "Retail / Consumer Products",
 "Internet / Entertainment",
 "Media / Apparel"]


featuredCollections:
["E-Commerce",
 "100 Most Popular Stocks",
 "Retail",
 "Consumer Products",
 "Internet",
 "Entertainment",
 "Media",
 "Apparel"]
screenWidthCharacters: 30
numberOfRows: 4
separator: " / "
Expected Output:
["E-Commerce / Retail / Internet",
 "100 Most Popular Stocks",
 "Consumer Products / Media",
 "Entertainment / Apparel"]
```

以下为 JavaScript 的实现，仅供参考：

```javascript
function rhCollectionPillLayout(
  featuredCollections,
  screenWidthCharacters,
  numberOfRows,
  separator
) {
  const result = Array.from({ length: numberOfRows }, () => "");
  for (const feature of featuredCollections) {
    let used = false;
    for (let i = 0; i < numberOfRows; i++) {
      if (result[i] === "" && screenWidthCharacters >= feature.length) {
        result[i] = feature;
        used = true;
        break;
      } else if (
        screenWidthCharacters -
          feature.length -
          separator.length -
          result[i].length >=
        0
      ) {
        result[i] += separator + feature;
        used = true;
        break;
      }
    }
    if (!used) {
      let idx = 0;
      let shortest = result[0].length;
      for (let j = 1; j < numberOfRows; j++) {
        if (shortest > result[j].length) {
          shortest = result[j].length;
          idx = j;
        }
      }
      if (result[idx] === "") {
        result[idx] = feature;
      } else {
        result[idx] += separator + feature;
      }
    }
  }
  return result;
}
```
