export default (store) => (next) => (action) => {
    console.log('test 中间件被执行了');
    next(action) // 需要传递给下一个中间件,让reducer接收,否则代码卡到这里不会向下执行
};
