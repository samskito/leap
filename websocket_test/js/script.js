$(document).ready(function(){
	
	var info_websocket = $('#connection');
	var dump = $('#dump_container');
	
	ws = new WebSocket("ws://127.0.0.1:6437/");
	console.log(ws);
	
	ws.onopen = function() {
		info_websocket.text('Connected to websocket!');
	}
	
	ws.onerror = function() {
		info_websocket.text('Websocket returned an error.');
	}
	
	ws.onclose = function() {
		info_websocket.text('Not connected to the websocket (connection closed)');
	}
	
	ws.onmessage = function(data) {
		dump.find('div').text(JSON.stringify(JSON.parse(data.data), undefined, 2));
	}
	
});