
var copybut = document.getElementById("copyall");
if(copybut)
  copybut.disabled = false;
  
var movebut = document.getElementById("btnmove");
if(movebut)
  movebut.disabled = false; 
  
  
var bufcheck = document.getElementById("chkbufer") 
if(bufcheck )
     bufcheck.disabled = false;
	 
var curmodver = document.getElementById("hdcurmodver");
if(curmodver)
  curmodver = curmodver.value;
else
  curmodver = '';

 if(copybut && bufcheck)
   chrome.extension.sendMessage({type:"SEND_CHECK",text: document.title, modversion: curmodver}, function(response){});  




window.addEventListener("message", function(event)
 {
  if (event.source != window)
     return;
  
	 if (event.data.type && (event.data.type == "COPY_ALL"))
	{

	chrome.extension.sendMessage(
		{type:event.data.type,text: event.data.text}, function(response){});
	}
	
	 if (event.data.type && (event.data.type == "COPY_DOC"))
	{

	chrome.extension.sendMessage({type:event.data.type,text: event.data.text}, function(response)	{	});
	}

    if (event.data.type && (event.data.type == "SEND_NATIVE"))
	{

	chrome.extension.sendMessage({type:event.data.type,text: event.data.text}, function(response)	{	});
	}	
	
	 if (event.data.type && (event.data.type == "SEND_UNDO"))
	{

	chrome.extension.sendMessage({type:event.data.type}, function(response)	{	});
	}	
		
    }, false);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.greeting == "toggle")
	  {	  
	  window.postMessage({ type: "FROM_SCRIPT", text: "all ok"}, "*");
    	
	  }
	  
	   if (request.greeting == "player")
	  {	  
	  window.postMessage({ type: "FROM_SCRIPT", text: "player"}, "*");
    	
	  }
	  
	  if(request.greeting == "checking")
	  {	     
	   var oscheck = document.getElementById("chkinteg");
	   if(oscheck )
          oscheck.disabled = false;
    	  
	  }
	  
	  
	  
  });

	