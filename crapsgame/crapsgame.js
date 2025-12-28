 //craps main data 
 let crapsusername = "";
 //craps game settings 
 const startingmoney = 1000;
 const startingrounds = 0;
 const bets ={
  even : "EVEN",
  odd : "ODD"
 }
 const minimumbet = 100;
 //html element ids
 const crapsgameinputid = "craps-game-input-id";
 const crapsgameregistration = "craps-game-registration";
 const crapsgamemainsection = "craps-game-main-section";
 const crapsstatsuser="craps-stats-user";
 const crapsstatsmoneyvalue="craps-stats-money-value";
 const crapsstatsrounds="craps-stats-rounds";
 const crapsuserbetamount="craps-user-bet-amount";
 //in game variables
 let currentrounds = startingrounds;
let currentmoney = startingmoney;
let currentbet = bets.even;
let currentbetamount = minimumbet;
 function registercrapsplayer(){
  crapsusername = document.getElementById(crapsgameinputid).value.trim();
   
  
  
   if (/^[0-9]/.test(crapsusername) ||  /^[_.]/.test(crapsusername) || crapsusername.length < 5 || /\s/.test(crapsusername) || /[^a-zA-Z0-9_.]/.test(crapsusername)) {
    alert("username must be more than 5 characters long, alphanumeric with underscore and dot only, cannot start with a digit or special symbol, no spaces allowed");
    }
    else{
       removeregistrationpane()
        showmaingamesection()

      setupfirstround()
   }
   

  }
    function removeregistrationpane(){
        document.getElementById(crapsgameregistration).style.display="none"
    }
    function showmaingamesection(){
      document.getElementById(crapsgamemainsection).style.display="block"
    }
    function setupfirstround(){
      // Simple, safe display of username as plain text
      document.getElementById(crapsstatsuser).innerHTML = ' ' + crapsusername;
      currentmoney = startingmoney
      currentrounds = startingrounds
      setmoneyvalue(currentmoney);
      setroundsvalue(currentrounds);
      beteven();
      setbetamount(minimumbet);
    }
    function setmoneyvalue(money){
      document.getElementById(crapsstatsmoneyvalue).innerHTML = money;
    }
    function setroundsvalue(rounds){
      document.getElementById(crapsstatsrounds).innerHTML = rounds;
    } 
    function beteven(){
      choosebet(bets.even);
    }
     function betodd(){
      choosebet(bets.odd);
    }
    function choosebet(bet){
      currentbet = bet;
       document.getElementById(bet).style.backgroundColor= "red";
       const deselectBet = bet === bets.even ? bets.odd : bets.even;
        document.getElementById(deselectBet).style.backgroundColor= "transparent";
    }
    function increasebetamount(){
setbetamount(Math.min(currentbetamount + minimumbet, currentmoney));
    }
    function decreasebetamount(){
setbetamount(Math.max(currentbetamount - minimumbet, minimumbet));
    }
    function setbetamount(betamount){
      currentbetamount = betamount;
      document.getElementById(crapsuserbetamount).innerHTML = "$" + betamount;
    }