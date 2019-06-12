---
title: "复习专用"
date: 2019-05-31 07:52:02
description: "面试之前复习专用post。"
---

> 这是一篇我用来自己复习用的post。总结了一些面试之前需要复习的点，旨在帮助自己在面试之前能refresh一些概念以及算法。

# Binary Search
左闭右开的二分搜索算法，\[a,b)。两道相关题目在[这里](https://oddguan.io/leetcode33/)。
```cpp
int binary_search(vector<int>& nums, int target) {
    int left = 0, right = nums.size();
    while (left < right) {
        int mid = left + (right - left) / 2; /* prevent overflow */
        if (nums[mid] == target) 
            return mid;
        if (nums[mid] > target) 
            right = mid;
        else
            left = mid + 1;
    }
    return -1;
}
```

# dfs and bfs

dfs注意base case。一般情况下dfs return void，但是不排除可将dfs方法generalize的情况。可以使dfs return bool，或者一些有用的信息，这样就不用再写一个helper function了。

## generalized dfs
```cpp
void dfs(/* ... */) {
    if (/* base case */) {
        /* do something here */
        return;
    }

    /* do something else here, maybe a loop */
    result.push_back();
    dfs(/* ... */);
    result.pop_back();
}
```