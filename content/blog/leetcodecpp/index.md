---
title: "Leetcode C++ solutions"
description: "This is just a blog post that I keep records of my C++ leetcode solutions"
date: "2019-08-17 09:34:27"
---

## 5 Longest Palindromic Substring
```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int l = s.size();
        if (l < 2)
            return s;
        int start = 0, end = 0;
        for (int i = 0; i < s.size(); ++i) {
            int len1 = extendPalindrome(s, i, i);
            int len2 = extendPalindrome(s, i, i + 1);
            int len = max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substr(start, end + 1 - start);
    }
    
private:
    int extendPalindrome(string s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s[L] == s[R]) {
            L--;
            R++;
        }
        return R - L - 1;
    }
};
```

### Key takeaway

* `std::string.substr` takes two arguments, the first one being the beginning index
of the substring, and the second one being the **length** of the substring, not the ending index.