 const crapsgameinputid = "craps-game-input-id";
 const crapsgameregistration = "craps-game-registration";
 const crapsgamemainsection = "craps-game-main-section";
 function registercrapsplayer(){
   let crapsusername =   document.getElementById(crapsgameinputid).value
   
  
  
   if (/^[0-9]/.test(crapsusername) ||  /^[_.]/.test(crapsusername) || crapsusername.length <= 5 || /\s/.test(crapsusername) || /[^a-zA-Z0-9_.]/.test(crapsusername)) {
    alert("username must be more than 5 characters long, alphanumeric with underscore and dot only, cannot start with a digit or special symbol, no spaces allowed");
    }
    else{
       removeregistrationpane()
        showmaingamesection()
   }
   

  }
    function removeregistrationpane(){
        document.getElementById(crapsgameregistration).style.display="none"
    }
    function showmaingamesection(){
      document.getElementById(crapsgamemainsection).style.display="block"
    }
