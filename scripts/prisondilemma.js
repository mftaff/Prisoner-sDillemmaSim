function Strategy(name, strategy){
    this.name = name;
    this.points = 0;
    this.prevCard = null;
    this.strategy = strategy;
}

function bobStrat() {
    return (Math.random() <= 0.5) ? "D" : "C";
}

function jimStrat() {
    return (Bob.prevCard !== null) ? Bob.prevCard : "C";
}

function PrisonersDilemma() {
};

PrisonersDilemma.game = function(roundsToPlay, player1, player2) {
    this.roundHistory = {};
    
    for (var i = 1; i <= roundsToPlay; i++) {
        var playedCards = this.cardChooser(player1.strategy, player2.strategy);
        var pointsRecieved = this.pointAssign(playedCards);
        this.roundHistory[i] = [playedCards, pointsRecieved];
        
        player1.points += pointsRecieved[0];
        player2.points += pointsRecieved[1];
        
        player1.prevCard = playedCards[0];
        player2.prevCard = playedCards[1];
        
        var resultWindow = document.getElementById('simResults');
        var p = document.createElement('p');
        var log = document.createTextNode("\nRound#" + i + " Start:\nplayer1's card: " + this.roundHistory[i][0][0] +
            "\nplayer2's card: " + this.roundHistory[i][0][1] + "\nplayer1's points this round: " +
            this.roundHistory[i][1][0] + "\nplayer2's points this round: " + this.roundHistory[i][1][1] +
            "\nplayer1 total: " + player1.points + "\nplayer2 total: " + player2.points + 
            "\nRound End.\n-----------------\n");
        p.appendChild(log);
        resultWindow.appendChild(p);

        
        //for testing purposes.
//        console.log("\nRound#" + i + " Start:")
//        console.log("player1's card: " + this.roundHistory[i][0][0]);
//        console.log("player2's card: " + this.roundHistory[i][0][1]);
//        console.log("player1's points this round: " + this.roundHistory[i][1][0]);
//        console.log("player2's points this round: " + this.roundHistory[i][1][1]);
//        console.log("player1 total: " + player1.points);
//        console.log("player2 total: " + player2.points + "\nRound End.");
    }
};

PrisonersDilemma.cardChooser = function(strat1, strat2) {
    card1 = strat1();
    card2 = strat2();
    return [card1, card2];
};

PrisonersDilemma.pointAssign = function(cards) {
    if (cards[0] === 'C' && cards[1] === 'C') {
        return [3, 3];
    } else if (cards[0] === 'D' && cards[1] === 'D') {
        return [1, 1];
    } else if (cards[0] === 'C' && cards[1] === 'D') {
        return [0, 5];
    } else if (cards[0] === 'D' && cards[1] === 'C') {
        return [5, 0];
    }
};

var Bob = new Strategy('bob', bobStrat);
var Jim = new Strategy('jim', jimStrat);

document.getElementsByClassName('runSim')[0].addEventListener("click", function() {
    PrisonersDilemma.game(100, Bob, Jim)
});