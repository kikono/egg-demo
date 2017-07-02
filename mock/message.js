module.exports = {
	index : {
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
	create : {
		request : {
			"token" : "@WORD",
			"sender_name": "@WORD",
			"content|0-1": "@EMAIL",
		},
		response : {
			'list|1-10': [{
		    // 属性 id 是一个自增数，起始值为 1，每次增 1
		    	'_id|+1': 1,
		        "sender_name": "@WORD",
				"content": "@WORD",
				"create_date": "@date('yyyy-MM-dd')",
		    }]
		},
	},

}