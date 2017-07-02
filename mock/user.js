module.exports = {
	find : {
		request : {
			sender_name : {"cn|1-5": "汉字"},
			content : {"email": "@EMAIL"},
		},
		response : {
		    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
		    'list|1-10': [{
		        // 属性 id 是一个自增数，起始值为 1，每次增 1
		        'id|+1': 1
		    }]
		},
	},
	create : {
		request : {

		},
		response : {
			"data|1-10": [ {
	        "id|+1": 1,
	        "grade1|1-100": 1,
	        "grade2|90-100": 1,
	        "float1|.1-10": 10,
	        "float2|1-100.1-10": 1,
	        "float3|999.1-10": 1,
	        "float4|.3-10": 123.123,
	        "star|1-5": "★",
	        "cn|1-5": "汉字",
	        "repeat|10": "A",
	        "published|1": false,
	        "email": "@EMAIL",
	        "date": "@DATE",
	        "time": "@TIME",
	        "datetime": "@DATETIME",
	        "method|1": ["GET", "POST", "HEAD", "DELETE"],
	        "size": "@AD_SIZE",
	        "img1": "@IMG(200x200)",
	        "img2": "@IMG",
	        "img3": "@IMG(@size)",
	        "img4": "@IMG(@AD_SIZE)",
	        "dummyimage": {
	            "size": "@AD_SIZE",
	            "background": "@COLOR",
	            "foreground": "@COLOR",
	            "format|1": ["png", "gif", "jpg"],
	            "text": "@WORD",
	            "url": "http://dummyimage.com/@size/@background/@foreground.@format&text=@text"
	        },
	        "param": "abc=123",
	        "url1": "@img3?@param",
	        "url2": "@img4?@ID&id=@id"
	    	} ]
		},
	},

}