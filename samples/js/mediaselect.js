var MediaSelect = function(o){
	var opts = $.extend({}, $.fn.mediaSelect.defaults, o);
	//DOM 要素
	//this.listBase = $('#todoList');

	

	//typeof(this.targetEle.toTextArea) != 'undefined' 

	if (typeof(opts.editorObj.toTextArea) == 'function') {
		this.targetEle = opts.editorObj;
	} else {
		this.targetEle = $(opts.editorObj);
	}



	//this.jsonUrl = '/admin/media.json';
	this.ele = $('#mediaModal');


	this.ele.empty();



	//this.mediaTable = null;
	//取得したjsonデータ
	this.mediaJson = null;
	
	this.pager = null;

	//オーバーレイレイヤー
	$('body').append('<div id="overlay"></div>');
	this.overlay = $('#overlay');
	
	this.setup();
}


MediaSelect.prototype = {
	setup: function() {
		this.baseMake();
		this.closeModal();
		this.pagerClick();
		this.insertClick();
	},
	
	baseMake: function() {
		

		this.overlay
			.show()
			.css({'height': $(document).outerHeight(true)+'px'});
		this.ele
		.show()	
		.append('<div class="modal-header">'+
			'<a class="close" data-dismiss="modal">×</a>'+
			'<h3>画像一覧</h3>'+
		  '</div>'+
		  '<div class="modal-body"></div>'+
		  '<div id="pagenation" class="pagination"></div>'+
		  '<div class="modal-footer">'+
			'<a class="btn" id="close-modal">閉じる</a>'+
		  '</div>');
	
		var posX = $(window).width() / 2 - this.ele.outerWidth() / 2;
		this.ele.css({'left': posX+'px'});
		
		//メディアコンテンツを読み込み
		this.loadContents('media.html');
	},
	
	loadContents : function(url) {
		url = $.escapeHTML(url);
		$('.modal-body')
			//.empty()
			.load(url + ' #media-list');	
	},
	
	pagerClick : function() {
		var that = this;
		$('div.pagination a').live('click', function(e) {
			e.preventDefault();
			//console.log($(this).attr('href'));
			that.loadContents($(this).attr('href'));
		});
	},
	
	//閉じるボタン
	closeModal: function() {
		var that = this;
		
		$('a.close, a#close-modal').live('click', function() {
		//this.overlay.live('click', function() {
			that.ele.hide();
			that.overlay.hide();
		});
		
	},
	openModal: function() {

		this.ele.show();
		this.overlay.show();
	},
	
	//挿入ボタンでテキストエリアに挿入
	insertClick: function() {
		var that = this;
		

		

		$('a.insert', that.ele).live("click", function(){
			
			

			var parent = $(this).parent().parent();
			//画像URL取得
			var getUrl = $('td:eq(3) a', parent).attr('href');
			//画像タイトル取得
			var getTitle = $('td:eq(2)', parent).text();
			//表示フォーマットに変換
			//var imgText = '[['+getTitle+'|'+getUrl+']]';
			var imgText = '<img src="'+getUrl+'" alt="'+getTitle+'" />'

			//$('.activeline').next().insertAtCaret(imgText);


			if (typeof(that.targetEle.toTextArea) == 'function') {
				that.targetEle.replaceSelection(imgText);
			} else {
				that.targetEle.val(imgText);
			}


			//$('#editor').insertAtCaret(imgText);
			//that.targetEle.insertAtCaret(imgText);

			//モーダル閉じる
			that.ele.hide();
			that.overlay.hide();
		});
	}
	
}

//カーソルの位置に文字を追加（Code Mirror）
$.fn.extend({
	insertAtCaret: function(v) {

		

		var o = this;
		

		//o.focus();
		if (jQuery.browser.msie) {
			var r = document.selection.createRange();
			r.text = v;
			r.select();
		} else {
			//現在の文字列取得
			//var s = o.value;
			
			var s = o.text() + v;
			//文字数
			var p = o.text().length;

			this.targetEle.replaceSelection(s);

			//o.text(s);

			// var np = p + v.length;
			// o.value = s.substr(0, p) + v + s.substr(p);
			// o.setSelectionRange(np, np);
			
		}
	}
});

/*
//テキストエリアに挿入する場合
$.fn.extend({
	insertAtCaret: function(v) {

		

		var o = this.get(0);
		o.focus();
		if (jQuery.browser.msie) {
			var r = document.selection.createRange();
			r.text = v;
			r.select();
		} else {
			//現在の文字列取得
			//var s = o.value;
			var s = o.value;
			//文字数
			var p = o.selectionStart;


			var np = p + v.length;
			o.value = s.substr(0, p) + v + s.substr(p);
			o.setSelectionRange(np, np);
		}
	}
});
*/

$.fn.mediaSelect = function(options) {
	//var opts = $.extend({}, $.fn.mediaSelect.defaults, options);
	var mSelect = null;
	
	$(this).click(function(e){
		e.preventDefault();



		if (mSelect == null) {
			mSelect = new MediaSelect(options);

		} else {
			//一度読み込まれてたら表示だけする
			mSelect.openModal();
			//console.log(mSelect);
		}

	});
};

//htmlエスケープ
$.escapeHTML = function(val) {
	return $("<div/>").text(val).html();
};


$.fn.mediaSelect.defaults = {
	//targetEle: '#editor'
};
