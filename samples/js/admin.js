(function($) {
$(function() {
	//$('#mediaBtn').mediaSelect();
	
	
	if (document.getElementById("editor")) {
		//テキストエリアカスタマイズ
		var meditor = CodeMirror.fromTextArea(document.getElementById("editor"), {
			mode: 'text/html',
			//mode: 'xmlpure',
			tabMode: "indent",
			indentUnit: 4,	//インデントサイズ
			enterMode: "keep",
			lineNumbers: true,
			lineWrapping: true,
			indentWithTabs: true,

			extraKeys: {
				"'>'": function(cm) { cm.closeTag(cm, '>'); },
				"'/'": function(cm) { cm.closeTag(cm, '/'); }
			},

			//アクティブ行をハイライト
			onCursorActivity: function() {
				meditor.setLineClass(hlLine, null, null);
				hlLine = meditor.setLineClass(meditor.getCursor().line, null, "activeline");
			},

			// send all key events to Zen Coding
			onKeyEvent: function() {
				return zen_editor.handleKeyEvent.apply(zen_editor, arguments);
			},
			wordWrap: true
		});
		var hlLine = meditor.setLineClass(0, "activeline");
	}
	CodeMirror.commands["selectAll"](meditor);
	


	//メディアセレクトウインドウ
	$('#mediaBtn').mediaSelect({
		insertObj: meditor
	});

	$('#thum-insert-btn').mediaSelect({
		insertObj: '#thum-field'
	});

	$('#disc-insert-btn').mediaSelect({
		insertObj: '#disc-textarea'
	});

});
})(jQuery);




