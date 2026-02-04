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
 const hidedicedelayms = 100000;
 const numdicetoroll = 2;
 const processdiceresultdelayms = 1800;
 //html element ids
 const crapsgameinputid = "craps-game-input-id";
 const crapsgameregistration = "craps-game-registration";
 const crapsgamemainsection = "craps-game-main-section";
 const crapsstatsuser="craps-stats-user";
 const crapsstatsmoneyvalue="craps-stats-money-value";
 const crapsstatsrounds="craps-stats-rounds";
 const crapsuserbetamount="craps-user-bet-amount";
 const crapsrollbutton="craps-roll-button"
 const crapsrolldiceanimationcontainer="craps-roll-dice-animation-container"
 const crapsbettinggridcontainer="craps-betting-grid-conatiner";
 const crapsroundfinishgridcontainer="craps-round-finish-grid-conatiner";
 const crapsroundfinishmessage="craps-round-finish-message";
 const crapsnextrounddisabledbutton="craps-next-round-disabled-button";
 const crapsnextroundbutton="craps-next-round-button";
 let currentrounds = startingrounds;
let currentmoney = startingmoney;
let currentbet = bets.even;
let currentbetamount = minimumbet;
let canchangebet = true;

// HTML MANIPULATION FUNCTIONS
  
  function showelement(elementid){
    document.getElementById(elementid).style.display="block";
  }
   function hideelement(elementid){
    document.getElementById(elementid).style.display="none";
  }
    function removeregistrationpane(){
        hideelement(crapsgameregistration);
    }
    function showegistrationpane(){
        showelement(crapsgameregistration);
    }
    function showmaingamesection(){
      showelement(crapsgamemainsection);
    }
     function hidemaingamesection(){
      hideelement(crapsgamemainsection);
    }
   

// GAME STARTING POINT FUNCTIONS
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

// MANAGING ROUNDS
    function setupfirstround(){
      document.getElementById(crapsstatsuser).innerHTML = ' ' + crapsusername;
      hideelement(crapsnextrounddisabledbutton)
      showelement(crapsnextroundbutton)
      setmoneyvalue(startingmoney);
      setroundsvalue(startingrounds);
      beteven();
      setbetamount(minimumbet);
      setupNextround()
    }
     function setupNextround(){
      hideelement(crapsrolldiceanimationcontainer)
      hideelement(crapsroundfinishgridcontainer)
      showelement(crapsrollbutton)
      showelement(crapsbettinggridcontainer)
      canchangebet = true;
      setbetamount(minimumbet);
    }

// MANAGING SCORE SETTINGS 
    function setmoneyvalue(money){
      currentmoney = money;
      document.getElementById(crapsstatsmoneyvalue).innerHTML = money;
    }

    function setroundsvalue(rounds){
      currentrounds = rounds;
      document.getElementById(crapsstatsrounds).innerHTML = rounds;
    } 

// MANAGE USER BET SELECTION
    function beteven(){
      choosebet(bets.even);
    }
     function betodd(){
      choosebet(bets.odd);
    }
    function choosebet(bet){
      if (canchangebet){
currentbet = bet;
       document.getElementById(bet).style.backgroundColor= "red";
       const deselectBet = bet === bets.even ? bets.odd : bets.even;
        document.getElementById(deselectBet).style.backgroundColor= "transparent";
      }
    }
    function increasebetamount(){
setbetamount(Math.min(currentbetamount + minimumbet, currentmoney));
    }
    function decreasebetamount(){
setbetamount(Math.max(currentbetamount - minimumbet, minimumbet));
    }
    function setbetamount(betamount){
      if (canchangebet){
currentbetamount = betamount;
      document.getElementById(crapsuserbetamount).innerHTML = "$" + betamount;
      }
    }
    //ROLL DICE AND PROCESS RESULT
    function rolldice(){
      canchangebet = false;
      showelement(crapsrolldiceanimationcontainer)
      hideelement(crapsrollbutton)
      const dicerollelement = document.getElementById(crapsrolldiceanimationcontainer);
        // create the roll animation (library will insert its DOM into the container)
        rollADie({ element: dicerollelement, numberOfDice: numdicetoroll, callback: delayeddiceprocessingresult , delay : hidedicedelayms});
       
        //requestAnimationFrame(() => setTimeout(adjustDiceLayout, 10000000));
    }
document.addEventListener("resize", formatdicescale);
    function formatdicescale(){
      const vw = window.innerWidth * 0.8;
      const vh = window.innerHeight * 0.8;
      const widthscale = Math.min(700,vw,vh );
      const heightscale = widthscale * 0.714;
      alert(heightscale)
      const scale = heightscale / 494.6592; 
      document.getElementById(crapsrolldiceanimationcontainer).style.transform = "scale(" + scale + ")";
    }
    function delayeddiceprocessingresult(diceresult){
      setTimeout( function() {processdiceresult(diceresult);}, processdiceresultdelayms);
    }
    function processdiceresult(diceresult){
//currentbet=useres bet
//[2,4]
const sum = diceresult.reduce((partialsum , a) => partialsum + a, 0);

if (sum % 2 === 1 ){
  diceresult = bets.odd;
} else {
  diceresult = bets.even;
}
   setroundsvalue(currentrounds + 1)
   let roundfinishmessage = ""
    if (diceresult !== currentbet){
      roundfinishmessage = "YOU LOSE"      
      setmoneyvalue(currentmoney - currentbetamount);
    }
    else{
     roundfinishmessage = "YOU WIN"      
      setmoneyvalue(currentmoney + currentbetamount);
    }
    if (currentmoney === 0){
    roundfinishmessage = "YOU ARE OUT"
    showelement(crapsnextrounddisabledbutton)
    hideelement(crapsnextroundbutton)
    }

     hideelement(crapsbettinggridcontainer)
     showelement(crapsroundfinishgridcontainer)
     document.getElementById(crapsroundfinishmessage).innerHTML = roundfinishmessage
  }

  //EXIT GAME
function exitgame (){
  alert("after playing " + currentrounds + " rounds, you are exiting the game with $" + currentmoney + " . Thank you for playing!");
hidemaingamesection() 
showegistrationpane()
document.getElementById(crapsgameinputid).value = ""
}

























































    
      