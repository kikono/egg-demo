
module.exports = app => {
	let list = (!app.config.smartCache)? []:app.config.smartCache ;
	let cacheList ;
	if(list.length>0){
		cacheList = {};
		for(key in list){
			cacheList[list[key]] = new Cache();
		}
	}else{
		cacheList = new Cache();
	}
	console.info('cache list:'+JSON.stringify(cacheList));
  	app.smartCache =cacheList;
};

class Cache{
	constructor(){
		this.cache = {};
	}
	get(name){
		return this.cache[name];
	}
	set(name, value){
		this.cache[name] = value;
	}
}

// module.exports = Cache;