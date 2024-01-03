extends Control

var regEx = RegEx.new()

func _ready():
	$Background/Username.text_changed.connect(self._on_username_change)
	$Background/Login.button_down.connect(self._on_login)

func _on_username_change(newText):
	regEx.compile("[a-zA-Z0-9]+")
	if($Background/Username.text):
		$Background/Username.text = regEx.search($Background/Username.text).get_string()
		$Background/Username.caret_column = $Background/Username.text.length()


func _on_login():
	$Background/Status.text = "Logging in..."
	var loginRequest = HTTPRequest.new()
	loginRequest.set_timeout(5.0)
	add_child(loginRequest)
	var endpoint = ClientGlobals.serverURL + "/auth/login"
	const headers = ["Content-Type: application/json"]
	var body = JSON.stringify({'username': $Background/Username.text, 'password': $Background/Password.text})
	loginRequest.request(endpoint, headers, HTTPClient.METHOD_POST, body)
	loginRequest.request_completed.connect(self._on_login_request)

func _on_login_request(result, responseCode, headers, body):
	if (responseCode == 200):
		ClientGlobals.token = JSON.parse_string(body.get_string_from_utf8()).data.token
		$Background/Status.text = "Logged in!"
		get_tree().change_scene_to_file("res://client/scenes/main_menu/main_menu.tscn")
	else:
		$Background/Status.text = "Error logging in"

