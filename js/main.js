// 1.初始化数据
var hash = init()
var keys = hash['keys']
var sites = hash['sites']

// 2.生成键盘 遍历 keys，生成 kbd 标签
generateKeyboard(keys,sites)

// 3.监听用户事件
listenToUser(sites)

function init(){
	var keys={
		'0':{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p'},
		'1':{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l'},
		'2':{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m'}
	}

	var sites={
		'q': 'qq.com', 
		'w': 'weibo.com', 
		'e': 'www.ele.me', 
		't': 'taobao.com', 
		'y': 'youtube.com', 
		'u': 'uc.cn', 
		'i': 'iqiyi.com', 
		'a': 'acfun.cn', 
		's': 'segmentfault.com',
		'd': 'douban.com',
		'h': 'huaban.com',
		'j': 'www.jd.com',
		'z': 'zhihu.com',
		'm': 'imooc.com'
	}

	var siteInLocalStorage = JSON.parse(localStorage.getItem('website'));

	if(siteInLocalStorage){
		sites = siteInLocalStorage;
	}

	return {
		"keys":keys,
		"sites":sites
	}
}

function createButton(id){
	var button = document.createElement('button');
	button.textContent = '编辑';
	button.id = id;

	button.onclick = function(e){

		var btnId = e['target']['id'];
		// console.log(btnId);
		var img2 = this.previousSibling.childNodes[0];
		var dialogText = prompt('请输入一个网址');

		sites[btnId] = dialogText;
		img2.src = 'http://'+dialogText+'/favicon.ico';
		img2.onerror = function(e){
			e.target.src = 'http://p4ceeqep9.bkt.clouddn.com/favicon.png'
		}
		localStorage.setItem('website',JSON.stringify(sites));
	}
	return button
}

function createImg(domain){
	var imgBox = document.createElement('div');
	var img = document.createElement('img');

	imgBox.className = 'img-box';
	imgBox.appendChild(img);

	if(domain){
		img.src = 'http://'+domain+'/favicon.ico';
	}else{
		img.src = 'http://p4ceeqep9.bkt.clouddn.com/favicon.png';
	}

	img.onerror = function(e){
		e.target.src = 'http://p4ceeqep9.bkt.clouddn.com/favicon.png';
	}

	return imgBox
}

function generateKeyboard(keys,sites){
	var keyLen = Object.keys(keys).length;

	for(var i=0; i<keyLen; i++){
		// 创建三个div
		var div = document.createElement('div');
		div.className = 'row';
		keyboard.appendChild(div);

		// 创建kbd
		var row = keys[i];
		var rowLen = Object.keys(keys[i]).length;
		for(var j=0;j<rowLen;j++){
			var kbd = document.createElement('kbd');
			var button = createButton(row[j]);
			var imgBox = createImg(sites[row[j]]);

			kbd.textContent = row[j];
			kbd.className = 'key';
			kbd.appendChild(imgBox);
			kbd.appendChild(button);
			div.appendChild(kbd);
		}
	}
}

function listenToUser(sites){
	document.onkeypress = function(e){
		var key= e['key'];
		var website = sites[key];
		if(website){
			window.open('http://'+website,'_blank');
		}
	}
}


