extends Control

var regEx = RegEx.new()

func _ready():
	$Background/Username.text_changed.connect(self._on_text_change)
	$Background/Login.button_down.connect(self._on_login)

func _on_text_change(newText):
	regEx.compile("[a-zA-Z0-9]+")
	if($Background/Username.text):
		$Background/Username.text = regEx.search($Background/Username.text).get_string()
		$Background/Username.caret_column = $Background/Username.text.length()

func _on_login():
	$Background/Status.text = "Logging in..."
	var loginRequest = HTTPRequest.new()
	add_child(loginRequest)
	var endpoint = ClientGlobals.serverURL + "/login"
	const headers = ["Content-Type: application/json"]
	var body = JSON.stringify({'username': $Background/Username.text, 'password': $Background/Password.text})
	loginRequest.request(endpoint, headers, HTTPClient.METHOD_POST, body)
	loginRequest.request_completed.connect(self._on_login_request)

func _on_login_request(result, responseCode, headers, body):
	#ClientGlobals.token = JSON.parse_string(body.get_string_from_utf8()).token
	$Background/Status.text = "Logged"

