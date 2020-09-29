module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true, // stage是0的情况下，默认就可以嵌套
      },
    },
    // 自定义变量
    //   'postcss-custom-properties': {
    //     importFrom: [
    //       'src/assets/style/var.css'// 变量文件
    //     ]
    //   }
  },
};
