#include <iostream>
#include <stack>
#include <queue>
#include <deque>
#include <vector>

using namespace std;

int main() {
    // vector<int> v1{1, 2, 3};
    // stack<int, vector<int>> s1(v1);
    // while (!s1.empty()) {
    //     cout << s1.top() << endl;
    //     s1.pop();
    // }

    vector<int> v1{1,2,3};
    queue<int> q1(deque<int>(v1.begin(), v1.end()));
    while (!q1.empty()) {
        cout << q1.front() << endl;
        q1.pop();
    }
    return 0;
}