module.exports = Const;

/**
 * Const Interface
 */
function Const() {}

// 集团id
Const.orgGroup = 1 ;

// 返回状态
Const.status = {
	success : 0,
    error   : 1,
};

// 是否可用 1：可用 0：不可用
Const.buse = {
	yes : 1,
    no 	: 0,
};
module.exports = exports = Const;