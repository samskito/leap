$(document).ready(function(){
	
	var info_websocket = $('#connection');
	var dump = $('#dump_container');
	var last_gesture = null;
	
	ws = new WebSocket("ws://127.0.0.1:6437/");
	//console.log(ws);
	
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
		data = JSON.parse(data.data);
		var output = '';
		var hand = data.hands;
		var gesture = data.gestures;
		
		data = JSON.stringify(data, undefined, 2);
		dump.find('div').text(data);
		
		if (!$.isEmptyObject(hand)) {
			output = 'Hand detected';
		}
		else {
			output = 'No hand detected.';
		}
		
		output += '<br/><br/>';
		
		if (!$.isEmptyObject(gesture)) {
			output += 'Gesture detected';
			last_gesture = gesture;
		}
		else {
			output += 'No Gesture detected.';
		}
		
		output += '<br/><br/>';
		
		if (last_gesture != null)
			output += 'Last gesture : '+last_gesture[0]['type'];
		
		$('#results').html(output);
	}
});