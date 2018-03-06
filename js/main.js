var keys={
	'0':{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p'},
	'1':{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l'},
	'2':{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m'}
}

var site={
	'q': 'qq.com', 
	'w': 'weibo.com', 
	'e': 'www.ele.me', 
	't': 'taobao.com', 
	'y': 'youtube.com', 
	'u': 'uc.cn', 
	'i': 'iqiyi.com', 
	'o': 'opera.com', 
	'a': 'acfun.cn', 
	's': 'segmentfault.com',
	'd': 'douban.com',
	'g': 'github.com',
	'h': 'huaban.com',
	'j': 'www.jd.com',
	'z': 'zhihu.com',
	'x': 'xiedaimala.com',
	'c': 'codepen.io',
	'v': 'v2ex.com', 
	'b': 'baidu.com',
	'n': 'nodejs.org',
	'm': 'imooc.com'
}

var siteInLocalStorage = JSON.parse(localStorage.getItem('website'));

if(siteInLocalStorage){
	site = siteInLocalStorage;
}

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
		var imgBox = document.createElement('div');
		var button = document.createElement('button');
		var img = document.createElement('img');

		if(site[row[j]]){
			img.src = 'http://'+site[row[j]]+'/favicon.ico';
		}else{
			img.src = 'http://p4ceeqep9.bkt.clouddn.com/favicon.png';
		}

		img.onerror = function(e){
			e.target.src = 'http://p4ceeqep9.bkt.clouddn.com/favicon.png';
		}

		button.textContent = '编辑';
		button.id = row[j];

		button.onclick = function(e){
			var btnId = e['target']['id'];
			// console.log(btnId);
			var img2 = this.previousSibling.childNodes;
			var dialogText = prompt('请输入一个网址');
			
			site[btnId] = dialogText;
			img2.src = 'http://'+dialogText+'/favicon.ico';
			img2.onerror = function(e){
				e.target.src = 'http://p4ceeqep9.bkt.clouddn.com/favicon.png'
			}
			localStorage.setItem('website',JSON.stringify(site));
		}

		kbd.textContent = row[j];
		kbd.className = 'key';
		imgBox.className = 'img-box';
		imgBox.appendChild(img);
		kbd.appendChild(imgBox);
		kbd.appendChild(button);
		div.appendChild(kbd);
	}
}


document.onkeypress = function(e){
	var key= e['key'];
	var website = site[key];
	if(website){
		window.open('http://'+website,'_blank');
	}
}

