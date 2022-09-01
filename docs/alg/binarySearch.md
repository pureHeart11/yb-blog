### 二分查找

```javascript
let arr = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];

function BinarySearch(array, element) {
  let minIndex = 0;
  let maxIndex = array.length - 1;
  let testElement;

  while (minIndex <= maxIndex) {
    const middleIndex = Math.floor((minIndex + maxIndex) / 2);
    testElement = array[middleIndex];

    if (testElement < element) {
      minIndex = middleIndex + 1;
    } else if (testElement > element) {
      maxIndex = middleIndex - 1;
    } else {
      return middleIndex;
    }
  }

  return -1;
}

// 测试
console.log(BinarySearch(arr, 17));
```
