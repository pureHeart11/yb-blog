### 主应用配置

1. 删除之前写死的子应用路由

   在 config/routes.ts 路由文件下删除路由

```javascript
{
  name: 'app1',
  icon: 'smile',
  path: '/app1',
  microApp: 'app1',
}
```

2. 删除之前写死的子应用注册配置

```javascript
qiankun: {
    master: {
      // apps: [
      //   {
      //     name: 'app1',
      //     entry: '//localhost:7001',
      //   },
      // ],
    },
}
```

3. 添加子应用路由配置

   在主应用 mock 文件夹新建 config.ts

```javascript
export default {
  '/api/config': {
    apps: [
      {
        name: 'app1',
        entry: '//localhost:7001'
      }
    ],
    routes: [
      {
        name: 'app1',
        path: '/app1'
      }
    ]
  }
};
```

4. 添加子应用容器

   在主应用 src/components 文件夹下新建文件 MicroAppLayout.tsx

```javascript
import { MicroApp } from 'umi';

function MicroAppLayout() {
  return <MicroApp name='app1' />;
}

export default MicroAppLayout;
```

5. 动态装载子应用路由

   在 src/app.tsx 文件下添加

```javascript
// 从接口中获取子应用配置，export 出的 qiankun 变量是一个 promise
export const qiankun = fetch('/api/config')
  .then(res => {
    return res.json();
  })
  .then(({ apps }) => {
    console.log('apps: ', apps);
    return Promise.resolve({
      // 注册子应用信息
      apps,
      // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
      lifeCycles: {
        afterMount: (props: any) => {
          console.log('props: ', props);
        }
      }
      // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
    });
  });

export function patchRoutes({ routes }: any) {
  extraRoutes.forEach((element: Record<string, any>) => {
    routes[1].routes.unshift({
      name: element.name,
      icon: 'smile',
      path: element.path,
      component: dynamic({
        loader: () => import('@/components/MicroAppLayout'),
        loading: LoadingComponent
      })
    });
  });
}

export async function render(oldRender: any) {
  fetch('/api/config')
    .then(res => {
      return res.json();
    })
    .then(resJson => {
      extraRoutes = resJson.routes;
      oldRender();
    });
}
```

### Github

[https://github.com/pureHeart11/micro-web](https://github.com/pureHeart11/micro-web)
