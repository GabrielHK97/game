extends Control

func _ready():
	$Background/Reconnect.button_down.connect(self._on_reconnect)
	$Background/Quit.button_down.connect(self._on_quit)

func _on_reconnect():
	get_tree().change_scene_to_file("res://client/scenes/connect_to_server/connect_to_server.tscn")

func _on_quit():
	get_tree().quit()
