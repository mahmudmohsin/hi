		let bot = new RiveScript();
		let user_input = document.getElementById('user_input');
		let chat_logs = document.getElementById('chatlogs');
		// Load an individual file.
		bot.loadFile("brain.rive", loading_brain_done, loading_brain_error);
		bot.loadFile("bangla.rive", loading_brain_done, loading_brain_error);
		bot.loadFile("star.rive", loading_brain_done, loading_brain_error);
		function loading_brain_done () {
		console.log('loading Done');
		bot.sortReplies();
		}
		function loading_brain_error () {
		console.log('error loading')
		}
		document.body.onkeydown = function ClickEnter(e){
		if(e.keyCode === 13){
		SendMsg();
		user_input.value = null;
		}
		};
		document.getElementById("Send").onclick = function snd(){
		SendMsg();
		};
		function SendMsg() {
		//let regex =
		///////////////test input-user if regex != [[:alpha:]]
		if(user_input.value === ''){
		return;
		}else if(user_input.value === "\n"){
		user_input.value = null;
		return;
		}
		//////////set new element chatBox Client
		createBoxMsg("chat Client", user_input.value);
		///////////////set new element chatBox Bot
		if( user_input.value === "video")creatBoxVideo("video.mp4");
		else
		var utterance = bot.reply("local_user", user_input.value);
		createBoxMsg("chat Bot", utterance);
				Core.speak(utterance);
    	
			
		// new SpeechSynthesisUtterance object
		let utter = new SpeechSynthesisUtterance();
		utter.lang = 'en-US';
		utter.text = utterance;
		utter.volume = 0.5;
		// event after text has been spoken
		utter.onend = function() {
		recognition.start();
		}
		// speak window.speechSynthesis.speak(utter);
	
    		
			//////////update page
		let objDiv = document.getElementById("chatlogs");
		objDiv.scrollTop = objDiv.scrollHeight;
		}

    	
	

		function createBoxMsg(for_, msg, string) {
		//////create element
		let element = document.createElement('div');
		let element_div = document.createElement('div');
		let element_p = document.createElement('p');
		//////set attribute for element
		element.setAttribute("class", for_);
		element_div.setAttribute("class", "user-photo");
		element_p.setAttribute("class", "chat-message");
		element_p.textContent = msg;
		////// append element to parent
		element.appendChild(element_div);
		element.appendChild(element_p);
		/////append parent to log chat
		chat_logs.appendChild(element);
		}
		function creatBoxVideo(video) {
		let chat_logs = document.getElementById('chatlogs');
		//////create element
		let element = document.createElement('div');
		let element_div = document.createElement('div');
		let element_p = document.createElement('video');
		//////set attribute for element
		element.setAttribute("class", "chat Bot");
		element_div.setAttribute("class", "user-photo");
		element_p.setAttribute("class", "chat-message");
		element_p.src = video;
		element_p.height = 200;
		element_p.width = 300;
		element_p.autoplay = true;
		element_p.controls = true;
		////// append element to parent
		element.appendChild(element_div);
		element.appendChild(element_p);
		/////append parent to log chat
		chat_logs.appendChild(element);
		}
		
		var message = document.querySelector('#user_input');
		var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
		var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
		var grammar = '#JSGF V1.0;'
		var recognition = new SpeechRecognition();
		var speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString(grammar, 1);
		recognition.grammars = speechRecognitionList;
		recognition.lang = 'en-IN';
		recognition.interimResults = false;
		recognition.onresult = function(event) {
		var last = event.results.length - 1;
		var command = event.results[last][0].transcript;
		message.value = command + '.';
		SendMsg();
		
		};
		recognition.onspeechend = function() {
		recognition.stop();
		btnGiveCommand.style.background='#1ddced';
		};
		recognition.onerror = function(event) {
		message.textContent = 'Error occurred in recognition: ' + event.error;
		}
		document.querySelector('#btnGiveCommand').addEventListener('click', function(){
		recognition.start();
		btnGiveCommand.style.background='#39c81f';
		});



	
