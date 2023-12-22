extends Control

func _ready():
	if (OS.has_feature("dedicated_server")):
		startServer()
	else:
		startClient()

func startServer():
	print("Starting server...")
	multiplayer.peer_connected.connect(self._on_client_connected)
	multiplayer.peer_disconnected.connect(self._on_client_disconnected)
	var server = ENetMultiplayerPeer.new()
	server.create_server(8080)
	multiplayer.multiplayer_peer = server

func startClient():
	get_tree().change_scene_to_file("res://client/scenes/connect_to_server/connect_to_server.tscn")

func _on_client_connected(clientId):
	print("Client " + str(clientId) + " connected")

func _on_client_disconnected(clientId):
	print("Client " + str(clientId) + " disconnected")
