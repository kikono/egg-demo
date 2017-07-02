'use strict';
module.exports = app =>{

	const auth = app.middlewares.auth();

	app.post('/index', auth, 'user.list');
	app.post('/carStock/index', auth, 'carStock.index');
	app.post('/carStock/create', auth, 'carStock.create');

	// message 管理
	app.post('/message/index', auth, 'message.index');
	app.post('/message/update', auth, 'message.update');
	app.post('/message/create', auth, 'message.create');
	app.post('/message/delete', auth, 'message.delete');

	// 员工管理
	app.post('/employee/list', auth, 'employee.list');
	app.post('/employee/count', auth, 'employee.count');
	app.post('/employee/create', auth, 'employee.create');
	app.post('/employee/bulkCreate', auth, 'employee.bulkCreate');
	app.post('/employee/update', auth, 'employee.update');
	app.post('/employee/view', auth, 'employee.view');

	app.post('/userLog/find', auth, 'userLog.find');
	app.get('/userLog/list', auth, 'userLog.find');


	app.post('/:controller/:method', auth, 'proxy.common');
	app.post('/mock/:controller/:method', auth, 'mock.index');

}