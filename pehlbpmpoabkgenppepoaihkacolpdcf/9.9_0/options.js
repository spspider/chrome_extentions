// Save this script as `options.js`

// Saves options to localStorage.




function save_options() {
  var select = document.getElementById("pagelang");
  var fcode = document.getElementById("pagecode");
   var language;
  if(!fcode.value)
  {
  language = select.children[select.selectedIndex].value; 
  }
  else
  {
   language = fcode.value;
  }
  localStorage["favorite_language"] = language;
  var chkcont = document.getElementById("chkcont");
  var chknative = document.getElementById("chknative");
  var chkbufer =  document.getElementById("chkbufer");
  
  if(chkcont.checked)
    localStorage["contrec"] = '1';
   else
    localStorage["contrec"] = '';

	if(chknative.checked)
    localStorage["native_speech"] = '1';
   else
    localStorage["native_speech"] = '';
	
	if(chkbufer.checked)
    localStorage["bufer_speech"] = '1';
   else
    localStorage["bufer_speech"] = '';
	
	var rdbefore = document.getElementById("rdbefore");
	var rdafter = document.getElementById("rdafter");
	var rdnone = document.getElementById("rdnone");
	if(rdnone.checked)
	 	localStorage["add_space"] = '';
	if(rdafter.checked)
	    localStorage["add_space"] = 'after';
	if(rdbefore.checked)
	    localStorage["add_space"] = 'before';	

    var chktop = document.getElementById("chktop");	
    if(chktop.checked)
       localStorage["show_top"] = '1';
	else
	    localStorage["show_top"] = '';
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {

var tel = document.getElementById("splang");
var intro = document.getElementById("intro");
var tcode = document.getElementById("spcode");
var tspor = document.getElementById("spor");
var helpurl = document.getElementById("helpurl");
var langhelpurl = document.getElementById("langhelpurl");
var spnote = document.getElementById("spnote");
var spcont = document.getElementById("spcont");
var spdesign = document.getElementById("spdesign");
var spnative = document.getElementById("spnative");
var sprun = document.getElementById("sprun");
var spbufer = document.getElementById("spbufer");
var spspace = document.getElementById("spspace");
var spbefore = document.getElementById("spbefore");
var spafter = document.getElementById("spafter");
var spnone = document.getElementById("spnone");

var loca = chrome.i18n.getMessage("@@ui_locale");




switch(loca)
{
case "ru":
case "uk":
intro.innerHTML = "Выберите язык для голосового ввода или введите код языка, например, <b>ru-RU</b>.  Поле кода  имеет приоритет.";
tel.innerHTML = "Язык голосового ввода:";
tcode.innerHTML = "Код языка:";
tel.innerHTML = "Язык голосового ввода:";
tspor.innerHTML = "ИЛИ";


//ruRU.selected = true;
helpurl.href = "https://speechpad.ru/blog/exthelp/";
langhelpurl.href = "https://speechpad.ru/blog/speech-reco-languages/";
spnote.innerHTML = "Внимание: новые настройки вступят в силу после обновления окна браузера";
spcont.innerHTML = "Продолжительное распознавание";
spdesign.innerHTML = "Разработка и продвижение интернет проектов";
spnative.innerHTML = "Выставлять флажок <b>Интеграция с OS</b> при запуске SpeechPad";
sprun.innerHTML = '<b>Настройки интеграции с Windows и Linux</b><br> (должен быть установлен <a target="_blank" href="https://speechpad.ru/blog/windows-integration/">дополнительный модуль</a>)';
spbufer.innerHTML = "Выставлять флажок <b>Вывод в буфер обмена</b> при запуске SpeechPad";
spspace.innerHTML  = "Добавлять пробел к фразам в режиме интеграции";
spbefore.innerHTML  = "В начало";
spafter.innerHTML  = "В конец";
spnone.innerHTML  = "Нет";
sptop.innerHTML = "Показывать SpeechPad поверх окон (только для Windows)";
break;
default:
intro.innerHTML ="Specify a speech input language or input a speech language code, for example <b>en-US</b>. The code field  has the priority.";
tel.innerHTML = "Speech input language:";
tcode.innerHTML = "Speech language code:";
tspor.innerHTML = "OR";
//enUS.selected = true;
helpurl.href = "https://voicenotebook.com/blog/exthelp/";
langhelpurl.href = "https://voicenotebook.com/blog/speech-input-languages/";
spnote.innerHTML = "Note: your changes will have effect after refreshing the browser window";
spcont.innerHTML = "Continuous recognition";
spdesign.innerHTML = "Internet projects design and promotion";
spnative.innerHTML = "Set <b>OS integration</b> checkbox while calling Voice Notebook";
sprun.innerHTML = '<b>Windows and Linux integration settings</b><br> (<a target="_blank" href="https://voicenotebook.com/blog/windows-integration/">additional component</a> must be installed)';
spbufer.innerHTML = "Set <b>Transfer to clipboard</b> checkbox while calling Voice Notebook";
spspace.innerHTML  = "Add a space to the phrase in integrated mode";
spbefore.innerHTML  = "In front";
spafter.innerHTML  = "Behind";
spnone.innerHTML  = "None";
sptop.innerHTML = "Stay Voice Notebook on Top (only Windows OS)";
break;
}

  var select = document.getElementById("pagelang");
  var favorite = localStorage["favorite_language"];
  if (favorite)
  {
	  var isflag = false;
	
	  var fcode = document.getElementById("pagecode");
	  for (var i = 0; i < select.children.length; i++)
	  {
		var child = select.children[i];
		if (child.value == favorite)
		{
		  child.selected = "true";
		  isflag = true;
		  break;
		}
	  }//end for
	  if(!isflag)
		 fcode.value = favorite;
  }//end if (favorite)
  else
  {
    if(loca == "ru")
       select.value = "ru-RU";
	else
	   if(loca == "uk")
	       select.value = "uk-UA";
		      else select.value = "en-US"; 
  }


  var chkcontin = document.getElementById("chkcont");
  if(localStorage["contrec"])
      chkcontin.checked = 'on';
   else
      chkcontin.checked = '';

  
 var chknative = document.getElementById("chknative");
  

  if(localStorage["native_speech"])
      chknative.checked = 'on';
   else
      chknative.checked = '';
	  
 var chkbufer = document.getElementById("chkbufer");
  

  if(localStorage["bufer_speech"])
      chkbufer.checked = 'on';
   else
      chkbufer.checked = '';	  

  var rdbefore = document.getElementById("rdbefore");
  var rdafter = document.getElementById("rdafter");
  var rdnone = document.getElementById("rdnone");
   
   if(!localStorage["add_space"])
        rdnone.checked = "on";
    else 
	   if(localStorage["add_space"] == "after")
          rdafter.checked = "on";	
           else 
                 rdbefore.checked = "on";
				 
  var chktop = document.getElementById("chktop");
  if(localStorage["show_top"])
      chktop.checked = 'on';
   else
      chktop.checked = '';				 
      
  
}//end function restore_options()
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);