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
 const crapsrollbutton="craps-roll-button"
 const crapsrolldiceanimationcontainer="craps-roll-dice-animation-container"
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
    function rolldice(){
      document.getElementById(crapsrollbutton).style.display="none"
      const dicerollelement = document.getElementById(crapsrolldiceanimationcontainer);
        // create the roll animation (library will insert its DOM into the container)
        rollADie({ element: dicerollelement, numberOfDice: 2, callback: processdiceresult });
        // After the library inserts its elements, nudge layout so the two dice sit
        // horizontally and closer together. Use RAF + timeout to wait for DOM.
        requestAnimationFrame(() => setTimeout(adjustDiceLayout, 40));
    }
    function processdiceresult(diceresult){
console.log(diceresult);
    }





























































    
      // Ensure the two dice visuals render inline and closer together.
      function adjustDiceLayout(){
        const container = document.getElementById("craps-roll-dice-animation-container");
        if(!container) return;
        const children = Array.from(container.children).filter(c => c.nodeType === 1);
        if(children.length === 0) return;

        // Make container a horizontal flex row so children are on the same line
        container.style.display = 'flex';
        container.style.flexWrap = 'nowrap';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.gap = '0';
        container.style.whiteSpace = 'nowrap';

        // Apply per-child tweaks so dice are tighter but not overlapping faces
        children.forEach((el, i) => {
          if(!(el instanceof HTMLElement)) return;
          el.style.display = 'inline-block';
          el.style.verticalAlign = 'middle';
          el.style.width = 'auto';
          el.style.maxWidth = '48%';
          // small negative margins to pull dice closer
          if(i === 0) el.style.marginRight = '-12px';
          else if(i === children.length - 1) el.style.marginLeft = '-12px';
          else el.style.margin = '0 -16px';
          // allow pointer events on container's trigger to still be clickable
          el.style.pointerEvents = 'none';
        });
      }