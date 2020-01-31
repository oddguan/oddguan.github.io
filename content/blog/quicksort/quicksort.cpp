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