export default store =>next => action =>{
    // 1.当前这个中间件函数不关心你想执行什么样的异步操作,  只关心你是不是异步操作

    // 2. 如果是异步操作,  触发action, 传递为一个函数

    // 3. 如果是同步操作,传递action 对象

    // 4. 异步操作写在你传递进来的函数

    // 5. 当前这个中间件函数在调用你传递的函数时候,  将dispatch 传递过去

    // 6. 在函数中,通过dispatch 派发action --->reducer保存数据

    // 让action自己决定什么时候,进行dispatch 数据
    if(typeof action === 'function'){
        return action(store.dispatch)
    }

    next(action)



    // if(action.type==='increment'||action.type==='decrement'){
    //     setTimeout(()=>{
    //         next(action)// 延迟两秒后生效
    //     },2000)
    // }
}