extends Control

func _ready():
	multiplayer.connected_to_server.connect(self._connected_to_server)
	multiplayer.server_disconnected.connect(self._disconnected_from_server)
	multiplayer.connection_failed.connect(self._failed_to_connect)
	var client = ENetMultiplayerPeer.new()
	client.create_client("localhost", 8080)
	multiplayer.multiplayer_peer = client

func _connected_to_server():
	get_tree().change_scene_to_file("res://client/scenes/login/login.tscn")

func _disconnected_from_server():
	get_tree().change_scene_to_file("res://client/scenes/disconnected_from_server/disconnected_from_server.tscn")
	
func _failed_to_connect():
	get_tree().change_scene_to_file("res://client/scenes/failed_to_connect/failed_to_connect.tscn")

