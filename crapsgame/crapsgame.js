 const crapsgameinputid = "craps-game-input-id";
 const crapsgameregistration = "craps-game-registration";
 const crapsgamemainsection = "craps-game-main-section";
 function registercrapsplayer(){
   let crapsusername =   document.getElementById(crapsgameinputid).value;
   alert("Welcome to the Craps Game, " + crapsusername + "!");
   removeregistrationpane();
   showmaingamesection();
    }

    function removeregistrationpane(){
        document.getElementById(crapsgameregistration).style.display="none"
    }
    function showmaingamesection(){
      document.getElementById(crapsgamemainsection).style.display="block"
    }
