// 1.初始化数据
var hash = init(),
	keys = hash['keys'],
	sites = hash['sites'],
	main = document.querySelector('#main'),
	searchInput = main.querySelector('#search-input'),
	searchChoice = main.querySelector('.search-choice'),
	searchBtn = main.querySelector('.search-button'),
	searchCover = main.querySelector('.search-cover'),
	searchSelector = main.querySelector('.search-select-box'),
	searchItem = searchSelector.querySelectorAll('.search-item'),
	hasFocus = false

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
		'3': '360.com',
		'q': 'qq.com', 
		'w': 'weibo.com', 
		't': 'taobao.com', 
		'i': 'iqiyi.com', 
		'a': 'acfun.cn', 
		's': 'segmentfault.com',
		'd': 'douban.com',
		'h': 'huaban.com',
		'j': 'www.jd.com',
		'z': 'zhihu.com',
		'b': 'bilibili.com',
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

function createButton(id,domain){
	var button = document.createElement('button');
	button.textContent = '编辑';
	button.id = id;

	button.onclick = function(e){
		e.stopPropagation();

		var btnId = e['target']['id'];
		// console.log(btnId);
		var img2 = this.previousSibling.childNodes[0];
		var dialogText = prompt('请输入一个网址',domain);
		if(dialogText === null || dialogText === 'null'){
			return false
		}
		sites[btnId] = dialogText;
		img2.src = 'http://'+dialogText+'/favicon.ico';
		img2.onerror = function(e){
			e.target.src = 'https://cdn.zhoushuo.vip/keyboard-keyico.png'
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

	if(domain && domain !== 'null'){
		img.src = 'http://'+domain+'/favicon.ico';
	}else{
		img.src = 'https://cdn.zhoushuo.vip/keyboard-keyicon.png';
	}

	img.onerror = function(e){
		e.target.src = 'https://cdn.zhoushuo.vip/keyboard-keyicon.png';
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
			var button = createButton(row[j],sites[row[j]]);
			var imgBox = createImg(sites[row[j]]);

			kbd.textContent = row[j];
			kbd.className = 'key';
			kbd.appendChild(imgBox);
			kbd.appendChild(button);
			div.appendChild(kbd);
		}
	}
}

searchInput.onfocus = function(){
	hasFocus = true;
	document.querySelector('.search-input-out').classList.add('active')
}

searchInput.onblur = function(){
	hasFocus = false;
	document.querySelector('.search-input-out').classList.remove('active')
}

function listenToUser(sites){
	var buttons = main.querySelectorAll('#keyboard .key');

	document.onkeypress = function(e){
		var key= e['key'];
		if(document.getElementById(key)){
			document.getElementById(key).parentNode.classList.add('active');
		}
		if(hasFocus === false){
			var website = sites[key];
			if(website) window.open('http://'+website,'_blank')
		}

		if(e.keyCode === 13 && hasFocus === true) search()
	}
	document.onkeyup = function(e){
		var key= e['key'];
		if(document.getElementById(key)){
			document.getElementById(key).parentNode.classList.remove('active');
		}
	}

	for(let i = 0; i < buttons.length; i++){
		buttons[i].onclick = function(){
			console.log(this);
			var key = this.getElementsByTagName("button")[0].id;
			var website = sites[key];
			if(website) window.open('http://'+website,'_blank')
		}
	}
}

/*------------------search--------------------*/

searchChoice.addEventListener('click',showSearch)
searchCover.addEventListener('click',hideSearch)
searchBtn.addEventListener('click', search)


var searchUrls = {
	baidu: 'http://www.baidu.com/s?wd=',
	google: 'http://www.google.com.hk/search?&q=',
	bing: 'https://cn.bing.com/search?q=123',
	360: 'https://www.so.com/s?&q=',
	sougou: 'https://www.sogou.com/web?query='
}

var searchEngine = ['baidu', 'google', 'bing', '360', 'sougou'];

var searchUrl = searchUrls[searchEngine[0]];

for(var i=0;i<searchItem.length;i++){
	searchItem[i].index = i;
	searchItem[i].addEventListener('click',function(e){
		hideSearch();
		searchChoice.querySelector('img').src = 'images/'+searchEngine[this.index]+'.png';
		searchUrl = searchUrls[searchEngine[this.index]];
	})
}


function showSearch(){
	searchCover.classList.add('active');
	searchSelector.classList.add('active')
}

function hideSearch(){
	searchCover.classList.remove('active');
	searchSelector.classList.remove('active')
}

function search(){
	var inputValue = searchInput.value.replace(/(^\s*)|(\s*$)/g, "");
	if(inputValue) window.open(searchUrl+inputValue,'_blank')
}

