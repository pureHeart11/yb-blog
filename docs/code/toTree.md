### 数组转数结构

```javascript
const arr = [
  {
    id: 2,
    name: '部门B',
    parentId: 0
  },
  {
    id: 3,
    name: '部门C',
    parentId: 1
  },
  {
    id: 1,
    name: '部门A',
    parentId: 2
  },
  {
    id: 4,
    name: '部门D',
    parentId: 1
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3
  },
  {
    id: 7,
    name: '部门G',
    parentId: 2
  },
  {
    id: 8,
    name: '部门H',
    parentId: 4
  }
];

function toTree(input) {
  // 构建一个以 id 为键的映射表
  const map = {};
  input.forEach(item => {
    map[item.id] = item;
    item.children = [];
  });

  // 将子节点添加到对应的父节点上
  const root = {};
  input.forEach(item => {
    const parentId = item.parentId;
    if (parentId) {
      const parent = map[parentId];
      if (parent) {
        parent.children.push(item);
      }
    } else {
      Object.assign(root, item);
    }
  });

  return root;
}

console.log(toTree(arr));
```
