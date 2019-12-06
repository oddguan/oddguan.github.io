---
title: "leetcode 105 & 106: Construct Binary Tree from Preorder, Postorder and Inorder Traversal"
description: "两道类似的medium题目。binary tree, bfs, dfs, tree traversal"
date: "2019-08-20 00:20:34"
---

105的题目为：reconstruct the binary tree from *Preorder* and *Inorder* traversal of the tree.

106题目为：reconstruct the binary tree from *Postorder* and *Inorder* traversal of the tree.

两道题基本上是一样的。先来看一下代码实现：

```cpp
// leetcode 105 inorder and preorder
class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int preStart = 0;
        return buildTree(preorder, inorder, preStart, 0, inorder.size());
    } 

private:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder, int& preStart, int inStart, int inEnd) {
        if (preStart >= preorder.size() || inStart >= inEnd)
            return nullptr;
        int val = preorder[preStart];
        TreeNode* node = new TreeNode(val);
        int mid = 0;
        for (int i = inStart; i < inEnd; ++i)
            if (inorder[i] == val) {
                mid = i;
                break;
            }
        ++preStart;
        node->left = buildTree(preorder, inorder, preStart, inStart, mid);
        node->right = buildTree(preorder, inorder, preStart, mid + 1, inEnd);
        return node;
    }
};
```

```cpp
// leetcode 106 inorder and postorder
class Solution {
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        // solve it through recursion
        int postFirst = postorder.size() - 1;
        return buildTree(inorder, postorder, postFirst, 0, inorder.size());
    }
    
private:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder, int& postFirst, int inFirst, int inEnd) {
        if (postFirst < 0 || inFirst >= inEnd) 
            return nullptr;
        int val = postorder[postFirst];
        TreeNode* node = new TreeNode(val);
        int mid = 0;
        for (int i = inFirst; i < inEnd; ++i)
            if (inorder[i] == val) {
                mid = i;
                break;
            }
        --postFirst;
        node->right = buildTree(inorder, postorder, postFirst, mid + 1, inEnd);
        node->left = buildTree(inorder, postorder, postFirst, inFirst, mid);
        return node;
    }
};
```

### 思路

假设我们有preorder和inorder的traversal为如下：
```
preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
```

那么构造出的tree为如下：
```
    3
   / \
  9  20
    /  \
   15   7
```

首先我们知道，preorder数组的第一个元素就是我们最终的root；这两道题我们都假设每一个node的值是不相等的，所以我们知道root的值以后就知道他在preorder中的位置了，如此一来我们就可以以root为中心，将preorder traverse分成左右两部分，分别就是root的两个children的所有node。那我们就可以在recursively对两个children进行构造即可。

## Leetcode #108

一道和上边两道题类似的但是更简单的题目：给定一个sorted array，根据这个array来build一个balanced BST。

### 思路

找到array的中点作为root，递归将左右变为balanced BST即可。

```cpp
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return sortedArrayToBST(nums, 0, nums.size());
    }
    
private:
    TreeNode* sortedArrayToBST(vector<int>& nums, int begin, int end) {
        if (begin >= end)
            return nullptr;
        int mid = (begin + end) / 2;
        TreeNode* node = new TreeNode(nums[mid]);
        node->left = sortedArrayToBST(nums, begin, mid);
        node->right = sortedArrayToBST(nums, mid + 1, end);
        return node;
    }
};
```