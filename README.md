# karmaui-next

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### 设计思路

#### 当组件中有脱离文档流的元素时

- 脱离文档流的元素默认插入到与相关元素同级的位置
- 该组件留有参数 to，传入 body，则插入到 body 下
- 对于脱离文档流的元素，如果有较多的此类元素，则存在层级问题
  - 对于层级问题的设计，采用一个递增计数器统一管理：出现一个 z-index 自动加 1
  - 此时，后出现的元素的层级永远比之前出现的层级要高
