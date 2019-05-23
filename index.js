addItem = () => {
	title = $('#title').val();
	url = $('#url').val();
	favicon = $('#favicon').val();
	const id = 'nav/'+Math.floor(Math.random()*1000000000);
	utools.db.put({
		_id: id,
		data: {
			createTime: Date.now(),
			title: title,
			url: url,
			favicon: favicon
		}
	});
	flushNav();
};

listAllItems = (compare) => {
	compare = compare || ((a, b) => {
		return new Date(a.data.createTime) - new Date(b.data.createTime) ;
	});

	return utools.db.allDocs('nav').sort(compare);
}

filtItems = (kw) => {
	return listAllItems().fitler(item => {
		return item.data.title.indexOf(kw) >= 0;
	});
}

deleteItem = (id) => {
	utools.db.remove(id);
	flushNav();
}

getItem = (id) => {
	return utools.db.get(id);
}

flushNav = () => {
	document.getElementById('items').innerHTML = '';
	listAllItems().forEach(item => {
		let ele = $(`<li id=${item._id}><span href="${item.data.url}">${item.data.title}</span></li>`);
		ele.find('span').css('background', 'url('+item.data.favicon+') no-repeat left center, url(default.png) no-repeat left center');
		ele.find('span').css('background-size', '20px');
		$('#items').append(ele);
	});
}

