extends Control

var webSocket = WebSocketPeer.new()
var firstTime = true;

func _ready():
	webSocket.connect_to_url(ClientGlobals.sessionWS)

func _process(delta):
	webSocket.poll()
	if (webSocket.get_ready_state() == webSocket.STATE_OPEN and firstTime):
		webSocket.send_text(ClientGlobals.token)
		firstTime = false
	while webSocket.get_available_packet_count():
		print('new package')
		var latestToken = JSON.parse_string(webSocket.get_packet().get_string_from_utf8()).token
		print(latestToken)
		print(ClientGlobals.token)
		if (ClientGlobals.token != latestToken):
			ClientGlobals.token = ''
			get_tree().change_scene_to_file("res://client/scenes/disconnected_from_server/disconnected_from_server.tscn")
