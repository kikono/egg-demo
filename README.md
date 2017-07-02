# cooked-egg-demo

 基于[cooked-egg](http://repo.4sstar.cn/spruce-think/cooked-egg)的demo示例

## 实例参考
- controller定义：[controller](app/controller)
    + controller 访问 [message.js](app/controller/message.js)  [employee.js](app/controller/employee.js) 
    + 分页使用 
- service 定义：[service](app/service)
    + mongo 操作示例 [message.js](app/service/message.js)
    + mysql 操作示例 [employee.js](app/service/employee.js)
- mysql 服务：
    + model 定义：
        + world库  [company.js](app/domain/world/company.js)
        + company库  [employee.js](app/domain/company/employee.js)
- mongo 服务
    + schema 定义:[mongoose](app/domain/mongo/message.js)
- 单元测试：
    + 测试[controller](test/controller/message.test.js)
    + 测试[service](test/service/message.test.js)
- 路由配置：[route](app/domain/mongo/message.js)
- 通过mock实现前后端分离：
    + [mock](./mock)规则配置
    + mock 使用：[MockController](lib/plugin/spruce-mock/README.md)
    






