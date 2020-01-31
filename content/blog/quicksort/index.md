---
title: "Implementation of quick sort and partial sort in C++"
date: "2019-12-06 01:19:48"
description: "快排和快选的C++实现"
---

做了很多道题都用到了quick select的概念。例如215:Kth Largest Element in an Array。
快排和快选都用到了`partition`的概念，即iteratively将array根据其中的一个pivot分割成两部分，使得前半部分小于pivot而后半部分大于pivot。两个算法唯一的区别在于，quick sort在每次partition结束后需要recursively对array的两个部分都要进行继续quick sort，而quick select只需要根据结束后pivot的位置来断定继续想做recursively sort还是向右recursively sort即可。因此，我们假设input array的长度为N，quick select的index为K，则quick sort的amortized runtime为$O(NlogN)$,而quick select的runtime为$O(NlogK)$。

写一下快排(quick sort)和快选(quick select)在C++中的实现：

```cpp
#include <vector>
#include <iostream>

using namespace std;

void quickSort(vector<int>& nums);
int quickSelect(vector<int>& nums, int k);
void quickSortRecurse(vector<int>& nums, int l, int r);
int partition(vector<int>& nums, int l, int r);

/* 快排 */
void quickSort(vector<int>& nums) {
    quickSortRecurse(nums, 0, nums.size() - 1);
}

/* 快选 */
int quickSelect(vector<int>& nums, int k) {
    int l = 0, r = nums.size() - 1, result;
    while (true) {
        int p = partition(nums, l, r);
        if (p == k) {
            result = nums[k];
            break;
        }
        if (p < k)
            l = p + 1;
        else
            r = p - 1;
    }
    return result;
}

/* helpers */
void quickSortRecurse(vector<int>& nums, int l, int r) {
    if (l < r) {
        int p = partition(nums, l, r);
        quickSortRecurse(nums, l, p - 1);
        quickSortRecurse(nums, p + 1, r);
    }
}

int partition(vector<int>& nums, int l, int r) {
    int pivot = nums[r];
    int i = l - 1;
    for (int j = l; j <= r - 1; ++j)
        if (nums[j] < pivot)
            swap(nums[++i], nums[j]);
    swap(nums[i + 1], nums[r]);
    return i + 1;
}

int main() {
    vector<int> v{4,6,4,3,2,4,6,45,5};
    vector<int> v2(v.begin(), v.end());
    quickSort(v);
    for (int e : v) {
        cout << e << " ";
    }
    cout << endl;
    cout << quickSelect(v2, 0) << endl;
    return 0;
}
```
