---
title: "LeetCode 143: Reorder List"
date: 2019-09-19 14:25:05
description: "Linked List question, reverse linked list, stack, pointers"
---

### 题目描述
Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:
> Given 1->2->3->4, reorder it to 1->4->2->3.

Example 2:
> Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

### 解题思路
第一点想到的是先找到中点，将后半段推上一个stack，然后依次将前半段和后半段从stack上pop下来连在一起即可。可以用一个runner找到中点。同样的思路我们也可以不用runner，直接将整体list推上stack，然后只将一半pop下来即可。我最初的implementation是后者：

```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head)
            return;
        ListNode* current = head;
        stack<ListNode*> s;
        while (current) {
            s.push(current);
            current = current->next;
        }
        current = head;
        int n = s.size();
        int mid = n / 2;
        for (int i = 0; i < mid; ++i) {
            ListNode* next = current->next;
            current->next = s.top();
            s.pop();
            current->next->next = next;
            current = next;
        }
        current->next = nullptr;
    }
}; 
```

runtime 76%，memory 23%。很明显我们在空间复杂度上有优化空间。

