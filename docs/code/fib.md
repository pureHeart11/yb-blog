方法 1

```javascript
function fib(n) {
  if (n === 0) {
    return 0;
  }

  if (n === 1 || n === 2) {
    return 1;
  }
  return fib(n - 2) + fib(n - 1);
}
```

方法 2

```javascript
function fib2(n) {
  if (typeof fib2[n] !== 'undefined') {
    return fib2[n];
  }

  if (n === 0) {
    return 0;
  }

  if (n === 1 || n === 2) {
    return 1;
  }

  const res = fib2(n - 2) + fib2(n - 1);

  fib2[n] = res;

  return res;
}
```

方法 3

```javascript
// 使用动态规划，将复杂的问题拆分，也就是：`F(N) = F(N - 1) + F(N - 2)`，用数组将已经计算过的值存起来
// **`BigInt`** 是一种内置对象，它提供了一种方法来表示大于 `2^53 - 1` 的整数
function fib(n) {
  // 使用dp数组，将之前计算的结果存起来，防止栈溢出
  if (n < 2) return 1;
  let dp = [1n, 1n];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 测试
const t1 = Date.now();
console.log(fib(40));
console.log(Date.now() - t1);
```
