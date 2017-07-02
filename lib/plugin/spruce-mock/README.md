# spruce-mock
    可以在指定mock目录下创建mock 规则文件，并利用egg 的loadToApp的形式加载到app，通过“app.mock.文件名.mock规则名”的形式访问。
## 如何使用
- mock 指定配置路径，通过config配置实现

   ```
    exports.spruceMock = {
        dir: './mock', 
    }
   ```

- 添加mock文件

   ```
    // 添加 /mock/message.js
    module.exports = {
        find : {
            request : {
                "token" : "@WORD",
                "sender_name": "@WORD",
                "content|0-1": "@EMAIL",
            },
            response : {
                // 数量可以使用function 获取
                "count": function(){return this.list.length},
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'list|1-10': [{
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    '_id|+1': 1,
                    "sender_name": "@WORD",
                    "content": "@WORD",
                    "create_user|1-100": 100,
                    "create_date": "@date('yyyy-MM-dd HH:mm:ss')",
                    "update_user|+1": 1,
                    "update_date": "@now('yyyy-MM-dd HH:mm:ss')",               
                }]
            },
        }
    }
   ```

- 使用mock

   ```
    var mockInfo = app.mock['message'];//或app.mock.message
    var output = Mock.mock(mockInfo['find'].response);   
   ```   

- mock controller 使用
    1. 现已完成app/controller/mock.js的实现以及router.js 中的配置

        ```
        app.post('/mock/:controller/:method', auth, 'mock.index');

        ```
        因此通过在mock目录下添加mock文件就可以通过/controller名称/方法名 的规则来访问mock接口。例如定义mock/message.js文件，就可以通过message/find 访问接口。代码如下：

        ```
                // find 为服务名称
                // request 为输入参数的定义
                // response 为输出结果的定义
                module.exports = {
                    find : {
                        request : {
                            "token" : "@WORD",
                            "sender_name": "@WORD",
                            "content|0-1": "@EMAIL",
                        },
                        response : {
                            // 数量可以使用function 获取
                            "count": function(){return this.list.length},
                            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                            'list|1-10': [{
                                // 属性 id 是一个自增数，起始值为 1，每次增 1
                                '_id|+1': 1,
                                "sender_name": "@WORD",
                                "content": "@WORD",
                                "create_user|1-100": 100,
                                "create_date": "@date('yyyy-MM-dd HH:mm:ss')",
                                "update_user|+1": 1,
                                "update_date": "@now('yyyy-MM-dd HH:mm:ss')",               
                            }]
                        },
                    },
                }
        ```

    2. 然后便可通过 http://localhost:3000/mock/message/find 直接访问，响应结果就是response定义的规则；注意request为请求参数；           