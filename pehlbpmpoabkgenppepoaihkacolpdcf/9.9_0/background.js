var usenative = 0;
var prevlen=0;
var newlineflag = true; // no space before need

//var tabid	
 chrome.commands.onCommand.addListener(function(command) {

 switch(command)
 {
   case "direct":  
   chrome.tabs.getSelected(scriptinjectnew);
   break;
   case "clipboard":
   runspext();
   break;
   case "togrecord":
   togrecord("toggle");
   break;
   case "player":
   togrecord("player");
   break;
   default:
   break;
 }
      
      });
	  


function scriptinj(tab, pagelang, iseditscr, iscont)
{
if(iscont)
 _gaq.push(['_trackEvent', 'injcont', 'clicked']);
else
 _gaq.push(['_trackEvent', 'inj', 'clicked']);
var inject = "m678: { if( typeof(isstart) !=='undefined' && isstart == true) { reco.stop(); break m678;  } var actdoc = document.activeElement; \
	if(!actdoc) break m678;  \
	if(actdoc.tagName == 'IFRAME')  \
    actdoc =  actdoc.contentDocument.activeElement; \
	if(!actdoc) break m678; "  + iseditscr + " \
	if(typeof(a767893) === 'undefined') \
	{  var a767893 =true; var isstart=false; var resindex = 0; \
	   var bgcolor = actdoc.style.backgroundColor; \
	    if(!bgcolor) bgcolor='';    \
		var reco = new webkitSpeechRecognition();  reco.continuous=" + iscont +"; reco.lang = '" +  pagelang + "';"  +	"reco.onerror =	function(event) { actdoc.style.backgroundColor = bgcolor; isstart=false; alert(event.error);};  \
		reco.onstart = function() {  actdoc.style.backgroundColor='pink';  isstart=true; resindex=0; }; \
		reco.onend = function(event) { actdoc.style.backgroundColor = bgcolor; isstart=false; }; \
		reco.onresult = function(event) \
		{   for (var i = event.resultIndex; i < event.results.length; ++i) \
		        if (event.results[i].isFinal) \
					if(i >= resindex++) \
			{ var tmpstr = event.results[i][0].transcript; \
			if(typeof(actdoc.value) != 'undefined') \
				{ if(actdoc.value)  tmpstr = ' ' + tmpstr;  else  {  tmpstr = tmpstr.charAt(0).toUpperCase() + tmpstr.substr(1);}  \
				  actdoc.value += tmpstr; \
				} \
			else \
				{  if(actdoc.innerText.length > 1) tmpstr = ' ' + tmpstr;  else  {  tmpstr = tmpstr.charAt(0).toUpperCase() + tmpstr.substr(1);} \
				       actdoc.innerText += tmpstr; \
				} \
			} \
		}; \
		reco.start(); \
	} else  reco.start(); }" 
  chrome.tabs.executeScript(tab.id,  {code: inject})	

}

function scriptinjectnew(tab)
{

if(!tab)
{

return;
}

var pagelang = getlang();
var isedit = "if(!(actdoc.tagName == 'TEXTAREA' || (actdoc.tagName == 'INPUT' && actdoc.type == 'text') || actdoc.isContentEditable)) break m678;";
var contrec = localStorage["contrec"]?1:0;
scriptinj(tab, pagelang, isedit, contrec);
}

	  
function scriptinject(tab)
{
var pagelang = getlang();
var isedit = '';
var contrec = localStorage["contrec"]?1:0;
scriptinj(tab, pagelang, isedit, contrec);
}


function runspext()
{
 _gaq.push(['_trackEvent', 'ext', 'clicked']);
var pagelang = getlang();
var querystr = "?autostart=1&pagelang=" + pagelang;
var activest = true;
if(localStorage["native_speech"])
 {
  querystr += "&chkinteg=1";
  activest = false;
 }
if(localStorage["bufer_speech"])
 {
  querystr += "&chkbufer=1"; 
  activest = false;
  }
 if(activest == false) 
  querystr += "&vid=1";
  
 var loca = chrome.i18n.getMessage("@@ui_locale");
	if(loca == "ru" || loca == "uk") 
	   chrome.tabs.create({url:"https://speechpad.ru/" + querystr,active:activest});
	  else
	   chrome.tabs.create({url:"https://voicenotebook.com/" + querystr,active:activest});

}

function islangrus()
{
if(getlang() == "ru-RU")
  return true;
else
  return false;
}


function getlang()
{
 var pagelang;
 if(localStorage["favorite_language"])
       pagelang = localStorage["favorite_language"];
	else
	{
	var loca = chrome.i18n.getMessage("@@ui_locale");
	if(loca == "ru" || loca == "uk")
	   pagelang = "ru-RU";
	 else
	   pagelang = "en-US";
	} 

return pagelang;

}	  

function onClickHandler(info, tab)
{   
	switch(info.menuItemId)
	{
	case "parent":
		if(info.editable)
		{		
		scriptinject(tab);			
		}
		else
		{ 
		runspext();
		}
	}

}


function copytobuffer(str)
{
  bg = chrome.extension.getBackgroundPage();
  txtar = bg.document.createElement("textarea");
  bg.document.body.appendChild(txtar);
  txtar.value = str;
    
  txtar.select();
  bg.document.execCommand("Copy");

}

parent = chrome.contextMenus.create({"title": "SpeechPad","id": "parent","contexts":["all"]}, function() { if (chrome.runtime.lastError) ;       });


chrome.contextMenus.onClicked.addListener(onClickHandler);


// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  if(localStorage["add_space"] === undefined)
		localStorage["add_space"] = "before";

//parent = chrome.contextMenus.create({"title": "SpeechPad","id": "parent","contexts":["all"]});
/*
if(islangrus())
 chrome.notifications.create(
      'speechpadupdate', {
      'type': 'basic',
        'iconUrl': 'speechpad-48.png',
        'title': 'Новоcти Speechpad!',
        'message': 'Добавлена интерграции с OS Windows'
      }, function () { }
    );
 else
  chrome.notifications.create(
      'speechpadupdate', {
      'type': 'basic',
        'iconUrl': 'speechpad-48.png',
        'title': 'Speechpad news!',
        'message': 'The integration with Windows OS has been added'
      }, function () { }
    );
 */									   
});

function notifyuser(notifytitle, notifymesid)
{
 var strtitle = notifytitle;
 var strmes = chrome.i18n.getMessage(notifymesid);

 chrome.notifications.create(
      'speechpadupdate', {
      'type': 'basic',
        'iconUrl': 'speechpad-48.png',
        'title': strtitle,
        'message': strmes
      }, function () { }
    );

}



chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) 
  {
   var tmp;
   
   switch(request.type)
   {
   case "SEND_CHECK":
   if(!localStorage["show_top"])
      tmp = "##CHECKING##";
   else
      tmp = "##CHECKING##TOP" + request.text;
   
   	chrome.runtime.sendNativeMessage('ru.speechpad.host',
	     { text: tmp },
		  function(response)
		  {	  	    
			if(response)
			{
			  if(request.modversion && request.modversion != response.text)
              {
				notifyuser("Speechpad", "notyfyupdmsg");
			  }
			  togrecord("checking");
            }//end 	if(response)		
		  });
   break;
   
   case "SEND_NATIVE":  
   
	   if(!localStorage["add_space"])
	   {	   
	    prevlen = request.text.length;
	  	chrome.runtime.sendNativeMessage('ru.speechpad.host',
	     { text:  request.text },
		  function(response)
		  {  
			if(usenative == 0)
			   {
			_gaq.push(['_trackEvent', 'nonespace', 'clicked']);
			usenative++;
			}
		
		  });	   	   	   	   
	   }
	   else if(localStorage["add_space"] == "after")
	   {   
	        
	        if(request.text.charAt(request.text.length-1) == '\n' || request.text.charAt(request.text.length-1) == '\b' )
			   tmp = request.text;
			 else 
			   tmp = request.text + ' ';
			   
			prevlen = tmp.length;
			   
			chrome.runtime.sendNativeMessage('ru.speechpad.host',
		        { text:  tmp},
			  function(response)
			  {
				if(usenative == 0)
				{
				_gaq.push(['_trackEvent', 'afterspace', 'clicked']);
				usenative++;
				}
		
			  });
	   }//end   if(localStorage === after
	  else//before
	  {
	     if(newlineflag)
		    tmp = request.text;
		 else
		  switch(request.text.charAt(0))
           {
		     case '\n':
			 case '\b':
             case ',':
             case '.':
             case '!':
             case '?':
			 case ')':
			 case ':':
			 case ';':
			 tmp = request.text;
			 break;
			 default:
			 tmp = ' ' + request.text;
             break;
			}
		var tmplast	= tmp.charAt(tmp.length-1);
        if(tmplast == '\n' || tmplast == '(')
		     newlineflag = true;
	    else
             newlineflag = false;		
			   
		prevlen = tmp.length;
			   
		chrome.runtime.sendNativeMessage('ru.speechpad.host',
		        { text:  tmp},
			  function(response)
			  {
				if(usenative == 0)
				{
				_gaq.push(['_trackEvent', 'beforespace', 'clicked']);
				usenative++;
				}
		
			  });
	  	   
      }//end before

  
   break; 
   
   case "SEND_UNDO":  
   if(prevlen > 1)
  {
   tmp = '';
   for(i = 0; i < prevlen; i++) 
    tmp += "\b";
   prevlen = 0;
    chrome.runtime.sendNativeMessage('ru.speechpad.host',
		  { text:  tmp},
		  function(response)
		  {	
	      }); 
   }
   break;
	case "COPY_ALL":
        copytobuffer(request.text); 
    break;		   

	case "COPY_DOC":
        copytobuffer(request.text); 
	 break;
	 default:
	 break;
	}//end  switch(request.type)
	 
  });// end chrome.extension.onMessage.addListener(


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-43297544-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src ='https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

function togrecord(someact)
{

chrome.tabs.query({url: "https://speechpad.ru/"}, function(tabs) {
if(tabs[0])
  chrome.tabs.sendMessage(tabs[0].id, {greeting: someact}, function(response) { });
});



chrome.tabs.query({url: "https://speechpad.ru/?*"}, function(tabs) {
if(tabs[0])
  chrome.tabs.sendMessage(tabs[0].id, {greeting: someact}, function(response) { });
});



chrome.tabs.query({url: "https://voicenotebook.com/"}, function(tabs) {
if(tabs[0])
  chrome.tabs.sendMessage(tabs[0].id, {greeting: someact}, function(response) {  });
});

chrome.tabs.query({url: "https://voicenotebook.com/?*"}, function(tabs) {
if(tabs[0])
  chrome.tabs.sendMessage(tabs[0].id, {greeting: someact}, function(response) {  });
});



}

