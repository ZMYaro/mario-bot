/** {Object<String,Array<String>>} A map of triggers to arrays of possible responses */
var triggersMap;
/** {RegExp} A regular expression that will match if the last words are a trigger. */
var triggersRegEx;

Array.prototype.pickRandom = function () {
	return this[Math.floor(Math.random() * this.length)];
};

window.addEventListener('load', function() {
	// Generate the triggers map.
	loadTriggerList();
	
	// Set up the text field.
	var textField = document.getElementById('textField');
	textField.addEventListener('input', function(e) {
		// Check the input for a trigger and alert any output.
		parseInput(e.target.value, alert);
	}, false);
	textField.disabled = false;
	textField.focus();
}, false);

/**
 * Loads the master list of triggers and responses
 */
function loadTriggerList() {
	/*var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.status === 200) {
			if(xhr.readyState === 4) {
				try {
					parseTriggerList(JSON.parse(xhr.responseText));
				} catch(e) {
					console.error('Attempting to fetch the master list of triggers and responses returned invalid JSON.');
				}
			} else {
				console.error('Failed to fetch the master list of triggers and responses.')
			}
		}
	};
	xhr.open('GET', 'triggers.json', true);
	xhr.send();*/
	
	parseTriggerList([
		{
			"triggers": ["bacon"],
			"responses": [
				"I hate bacon!",
				"I HATE bacon!"
			]
		}, {
			"triggers": ["barbecue sauce", "bbq sauce"],
			"responses": [
				"I hate barbecue sauce!"
			]
		}, {
			"triggers": ["firefly"],
			"responses": [
				"I hate Firefly."
			],
			"followUps": [
				"It's my least favorite show of all time.",
				"It's a combination of my least favorite genres of all time."
			]
		}, {
			"triggers": ["ginger ale"],
			"responses": [
				"I love ginger ale."
			],
			"followUps": [
				"It's my second favorite soda of all time."
			]
		}, {
			"triggers": ["hot sauce"],
			"responses": [
				"I LOVE hot sauce!",
				"I fucking love hot sauce."
			]
		}, {
			"triggers": ["new york"],
			"responses": [
				"New York is the best city.",
				"New York City best city."
			]
		}, {
			"triggers": ["paramore"],
			"responses": [
				"I love Paramore."
			]
		}, {
			"triggers": ["peanut butter"],
			"responses": [
				"I hate peanut butter."
			],
			"followUps": [
				"And it's not just the taste.  It's also the texture.",
				"Not just the taste, but the texture as well."
			]
		}, {
			"triggers": ["pepsi"],
			"responses": [
				"I love Pepsi."
			]
		}, {
			"triggers": ["science ficton", "sci fi", "sci-fi"],
			"responses": [
				"I hate science fiction."
			]
		}, {
			"triggers": ["the fly"],
			"responses": [
				"I love The Fly (1986)."
			],
			"followUps": [
				"It's my favorite non-Pixar movie."
			]
		}
	]);
}

/**
 * Parses the list of triggers and responses and turns it into a list of key-value pairs
 */
function parseTriggerList(list) {
	// Create the triggers map.
	triggersMap = {};
	
	list.forEach(function (item) {
		item.triggers.forEach(function (trigger) {
			// Create an array of responses for each trigger.
			triggersMap[trigger] = [];
			
			item.responses.forEach(function (response) {
				// Add the basic responses as well as all possible follow-ups for each.
				triggersMap[trigger].push(response);
				if (item.followUps) {
					item.followUps.forEach(function (followUp) {
						triggersMap[trigger].push(response + '  ' + followUp);
					});
				}
			});
		});
	});
	
	// Create a regular expression that will validate when any trigger was the last thing typed.
	triggersRegEx = new RegExp("(" + Object.keys(triggersMap).join("|") + ")$", "ig");
}

/**
 * Parses input and responds if necessary
 * @param {String} input - The input from the user
 * @param {Function} callback - The function to which the response, if any, should be sent
 */
function parseInput(input, callback) {
	var matches = triggersRegEx.exec(input);
	if (matches) {
		// If a trigger was just typed, send a response.
		callback(triggersMap[matches[0].toLowerCase()	].pickRandom());
	}
}
