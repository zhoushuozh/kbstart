var keys={
	'0':{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p'},
	'1':{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l'},
	'2':{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m'}
}

var site={
	'q': 'qq.com', 
	'w': 'weibo.com', 
	'e': 'ele.me', 
	'r': 'renren.com', 
	't': 'taobao.com', 
	'y': 'youtube.com', 
	'u': 'uc.com', 
	'i': 'iqiyi.com', 
	'o': 'opera.com', 
	'a': 'acfun.cn', 
	's': 'segmentfault.com',
	'd': 'douban.com',
	'g': 'github.com',
	'h': 'huaban.com',
	'j': 'jd.com',
	'z': 'zhihu.com',
	'x': 'xiedaimala.com',
	'c': 'codepen.io',
	'v': 'v2ex.com', 
	'b': 'baidu.com',
	'n': 'nodejs.org',
	'm': 'imooc.com'
}

function createKeyboard() {
	var keyLen = Object.keys(keys).length;

	for(var i=0; i<keyLen; i++){
		// 创建三个div
		var div = document.createElement('div');
		div.className = 'row';
		main.appendChild(div);

		// 创建kbd
		var row = keys[i];
		var rowLen = Object.keys(keys[i]).length;
		for(var j=0;j<rowLen;j++){
			var kbd = document.createElement('kbd');
			var span = document.createElement('span');
			span.textContent = row[j];
			kbd.appendChild(span);
			kbd.className = 'key';
			div.appendChild(kbd);
		}
	}
}

createKeyboard();

document.onkeypress = function(e){
	var key= e['key'];
	var website = site[key];
	window.open('http://'+website,'_blank');
}