// 导出中间件的模板代码
export default (store) => (next) => (action) => {
    // 在这里执行自己的逻辑

    // 输出store
    console.log(store);

    // 输出这个action
    console.log(action);

    // <调用>next 方法
    // 目的: 将这个action 传递给 reducer,
    // 并将action 传递给reducer
    next(action);
    
};


// export default function (store) {
//     return function (next) {
//         return function (action) {
//             // 在这里执行自己的逻辑
//         }
//     }
// }
