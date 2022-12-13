### 两数之和

```javascript
let nums = [2, 7, 11, 15];
let target = 9;

// 双循环
const twoSum = (nums, target) => {
  for (let i = 0, len = nums.length; i < len; i++) {
    // 因为同一元素不允许重复出现，所以从i的下一位开始遍历
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

// 一次循环，使用hashMap记录
const twoSum2 = (nums, target) => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
};

// 测试
console.log(twoSum(nums, 22));
```
