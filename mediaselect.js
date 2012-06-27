/**
 * jquery.mediaSelect.js
 *
 * @version  0.1.0
 * @author   k-ishiwata
 * @url     http://www.webopixel.net/
 * @license  http://rewish.org/license/mit The MIT License
 *
 * Since:   2012-06-27
 *
 * jQuery 1.7
 */
;(function($){
	$.wop = $.wop || {};
	$.wop.mediaSelect = function(targets,option){
		this.opts = $.extend({},$.wop.mediaSelect.defaults,option);
		var self = this;
		var ele = targets;

	//ボタンクリックしたらWindow表示
	ele.click(function(e){
	    e.preventDefault();
	    self.openModal();
	});

	};
	$.wop.mediaSelect.prototype = {
		openModal : function() {
			var self = this;
		  
			// 要素を作成
			$('body').append('<div id="overlay"></div>');
			$('body').append('<div class="media-modal">'+
			  '<div class="modal-header">'+
			  '<a class="close" data-dismiss="modal">×</a>'+
			  '<h3>画像一覧</h3>'+
			  '</div>'+
			  '<div class="modal-body"></div>'+
			  '<div id="pagenation" class="pagination"></div>'+
			  '<div class="modal-footer">'+
			  '<a class="btn close-modal">閉じる</a>'+
			  '</div></div>');

			self.overlay = $('#overlay');
			self.overlay.css({'height': $(document).outerHeight(true)+'px'});
			self.modal = $('div.media-modal');

			//クリックで閉じる
			self.overlay.click(function(e){
				self.closeModal();
			});
			$('a.close, a.close-modal').click(function(e){
				self.closeModal();
			});

			//挿入クリック
			$('a.insert').live('click', function(){
				self.insertClick($(this));
			});

			//ページャークリック
			$('div.pagination a').live('click', function(e) {
				e.preventDefault();
				self.loadContents($(this).attr('href'));
			});
			this.loadContents(self.opts.loadFile);

		},
       closeModal : function() {
	this.overlay.remove();  
	this.modal.remove();
	//挿入イベント削除
	$('a.insert').die();
	$('div.pagination a').die();
		  
        },
        //メディアコンテンツを読み込み
        loadContents : function(url) {
            url = this.escapeHTML(url);
            $('.modal-body').load(url + ' #media-list');

        },
        //htmlエスケープ
        escapeHTML : function(val) {
            return $("<div/>").text(val).html();
        },
	   
		//挿入ボタンで挿入
		insertClick: function(thisEle) {
			var self = this;

			var parent = thisEle.parent().parent();
			//画像URL取得
			var getUrl = $('td:eq(3) a', parent).attr('href');
			//画像タイトル取得
			var getTitle = $('td:eq(2)', parent).text();
			//表示フォーマットに変換
			var imgText = null;
			
			//CodeMirrorだったらimgタグ挿入
			if (typeof(this.opts.insertObj) == 'object') {
				this.opts.insertObj.focus();
				imgText = '<img src="'+getUrl+'" alt="'+getTitle+'" />';
				this.opts.insertObj.replaceSelection(imgText);
			} else {
				var iObj = $(this.opts.insertObj);
				//テキストフィールドに挿入
				if (iObj[0].nodeName == 'TEXTAREA') {
					imgText = '<img src="'+getUrl+'" alt="'+getTitle+'" />';
					this.insertAtCaret(iObj,imgText);
				}
				//テキストフィールドだったら値の入れ替え
				else {
					iObj.focus();
					imgText = getUrl;
					iObj.val(imgText);
				}
			}

			this.closeModal();
		},
		//テキストエリアのキャレットの位置に挿入
		insertAtCaret: function(thisEle, v) {
			var o = thisEle.get(0);
			o.focus();
			//現在の文字列取得
			var s = o.value;
			//文字数
			var p = o.selectionStart;
			var np = p + v.length;
			o.value = s.substr(0, p) + v + s.substr(p);
			o.setSelectionRange(np, np);
		}
	}
	
	$.wop.mediaSelect.defaults = {
		loadFile : 'media-list1.html'
	};
	$.fn.mediaSelect = function(option){
		option = option || {};
		var api = new $.wop.mediaSelect(this,option);
		return option.api ? api : this;
	};
})(jQuery);