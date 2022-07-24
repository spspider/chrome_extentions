
function changeFancySettingsHandler(){
	console.log('settingsChaged');	
	//TODO:!!!!!!!!!
	chrome.extension.sendRequest({method: "[AutomaticTabCleaner:ReloadSettings]"});
	//FIREFOX support 
    //chrome.extension.getBackgroundPage().reloadSettingsEvent();
	console.log('ReloadMessageSended!');
}

window.addEvent("domready", function () {
    // Option 1: Use the manifest:
    new FancySettings.initWithManifest(function (settings) {
		console.log(settings);
		//settings.search.events = new Array();
		settings.caller= function(arg){
			console.log('applied');
		};
    });

    document.getElementById('donateButton').onclick = function () {
        "use strict";

        chrome.extension.sendMessage({ method: '[AutomaticTabCleaner:donate]'});
        //setTimeout(function(){window.close();}, 300);

        return false;
    };
    
    // Option 2: Do everything manually:
    /*
    var settings = new FancySettings("My Extension", "icon.png");
    
    var username = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "username",
        "type": "text",
        "label": i18n.get("username"),
        "text": i18n.get("x-characters")
    });
    
    var password = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "password",
        "type": "text",
        "label": i18n.get("password"),
        "text": i18n.get("x-characters-pw"),
        "masked": true
    });
    
    var myDescription = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "myDescription",
        "type": "description",
        "text": i18n.get("description")
    });
    
    var myButton = settings.create({
        "tab": "Information",
        "group": "Logout",
        "name": "myButton",
        "type": "button",
        "label": "Disconnect:",
        "text": "Logout"
    });
    
    // ...
    
    myButton.addEvent("action", function () {
        alert("You clicked me!");
    });
    
    settings.align([
        username,
        password
    ]);
    */
});
