const WEBSOCKET_URI = "ws://127.0.0.1:8080/";

// subscribe to Twitch events
const ws = new WebSocket(WEBSOCKET_URI);
ws.addEventListener("open", (event) => {
	console.log("Connected to Streamer.bot");

	ws.send(
		JSON.stringify({
			request: "Subscribe",
			id: "123",
			events: {
				Raw: ["SubAction"]
			}
		})
	);
});

ws.addEventListener("message", (event) => {
	console.log(event.data);
//	if (!event.data) return;

	const data = JSON.parse(event.data);
	if (data.data?.name == "** START GAME **") {
		var word = data.data.arguments.randomLine;
		console.log("Word is " + word);
    hide();
    startover();
    setTimeout(() => wordwheel(word),1000);
	};
  if (data.data?.name == "** CORRECT WORD **") {
	reveal();
	console.log("WIN");
  };
  	if (data.data?.name == "** RESET WORD **") {
		console.log("Reset");
    hide();
    startover();
    };

	
});



//GET RANDOM 9 LETTER WORD
function wordwheel(newword){
var name = newword; 			
	console.log(name);		
if(document.getElementById("result")){

document.getElementById("placeholder").removeChild(document.getElementById("result"));
			}
	
var element = document.createElement("div");
element.setAttribute("id", "result");

element.appendChild(document.createTextNode(name));

document.getElementById("placeholder").appendChild(element);		
		

//START This function shuffles list items
 (function($){
    $.fn.shuffle = function() {
        return this.each(function(){
            var items = $(this).children().clone(true);
            return (items.length) ? $(this).html($.shuffle(items)) : this;
        });
    }
    
    $.shuffle = function(arr) {
        for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
})(jQuery);
//END This function shuffles list items

//SPLIT 9 LETTER WORD 
var str = $('#result').html();
var spl = str.split('');
var len = spl.length;
var i = 0;
setInterval(function(){

    if(i < len)
    {
        if(spl[i] != " "){
		$('.letters').append('<li>'+spl[i]+'</li>')//DISPLAY WORD AS SEPARATE LETTER AND AS LIST ITEMS
		$('.letters').shuffle();//Call shuffle function
        }
    }
    i++;
    },100)//load time
}
//window.onload = wordwheel;//calls wordwheel() function

function startover(){//clears <li> and calls wordwheel() function
$('.letters').empty();
   //Hide button until all letters have loaded
   //var  myButton= document.getElementById('newword');
  // myButton.style.visibility='hidden';
   //setTimeout (function(){
   //myButton.style.visibility ='visible';
   //},1000);
   return false;
   //Hide button until all letters have loaded END
   
};
  
function reveal(){
   $("#placeholder").slideDown();
};
function hide(){
 
   $("#placeholder").slideUp();
};


//REVEAL ANSWER (JQUERY)
     $(document).ready(function(){
  $(".reveal").click(function(){
    $("#placeholder").slideToggle();
  });
});