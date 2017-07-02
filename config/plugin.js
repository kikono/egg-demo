const path = require('path');
module.exports = {
	static : true ,
	validate : {
		package: 'egg-validate',
	},
	// mongoose : {
	//   	enable: true,
	//   	package: 'egg-mongoose',
	// },

	// // 自定义的mysql插件基于 egg-mysql 、 ali-rds
	// mysql : {
	//   enable: true,
	//   path: path.join(__dirname, '../lib/plugin/spruce-mysql'),
	// },
  	sequelize: {
    	enable: true,
    	path: path.join(__dirname, '../lib/plugin/spruce-sequelize'),
  	},
	spruceCache: {
	  	enable: true,
	  	path: path.join(__dirname, '../lib/plugin/spruce-cache'),
	},
	spruceMock: {
	  	enable: true,
	  	path: path.join(__dirname, '../lib/plugin/spruce-mock'),
	},
	mongoose: {
	  	enable: true,
	  	path: path.join(__dirname, '../lib/plugin/spruce-mongoose'),
	},
	redis : {
		enable: true,
  		package: 'egg-redis',
	},

}
