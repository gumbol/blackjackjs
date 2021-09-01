/* jslint esversion : 8 */
const readline = require('readline');
const cards = [10, 10, 10, 'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10];

let read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = (str) => new Promise(resolve => read.question(str, resolve));

const game = async () =>
{
    let playerHand = 0;
    let dealerHand = 0;
    let count = 0;
    for (let i = 0; i < 2; i++)
    {
        let cardValue = cards[Number.parseInt(Math.random() * cards.length)];
        if (cardValue != 'ace')
            playerHand += cardValue;
        else
        {
            let res = await question("you got an Ace. Do you want 1 or 11? ");
            while (res != 11 && res != 1)
            {
                res = await question("you got an Ace. Do you want 1 or 11? ");
            }
            playerHand += Number.parseInt(res);

        }
        console.log("Player hand is: " + playerHand);
    }

    for (let i = 0; i < 19; i++)
    {
        let cardValue = cards[Number.parseInt(Math.random() * cards.length)];
        if (playerHand == 21) { console.log("Player WIN!!!"); break; }
        else if (playerHand > 21) { console.log("Dealer WIN!!!"); break; }

        let res = await question("hit (h) or stand (s)? ");
        res = String(res).toLowerCase();
        while (res != 'stand' && res != 's' && res != 'hit' && res != 'h')
        {
            res = await question("hit (h) or stand (s)? ");
        }
        if (res === 'hit' || res === 'h')
        {
            if (cardValue == 'ace')
            {
                let res = await question("you got an Ace. Do you want 1 or 11? ");
                playerHand += Number.parseInt(res);
            } else playerHand += cardValue;
            console.log("Player hand is: " + playerHand);
        }
        else if (res === 'stand' || res === 's')
        {
            console.log("you are standing and your hand is: " + playerHand);
            break;
        }
    }
    if (playerHand < 21)
        while (count != 1)
        {

            let cardValue = cards[Number.parseInt(Math.random() * cards.length)];

            if (cardValue == 'ace')
            {
                if ((dealerHand + 11) > 21) dealerHand += 1;
                else dealerHand += 11;
            } else dealerHand += cardValue;
            console.log("Dealer hand is: " + dealerHand);

            if (dealerHand === 21) { console.log("Dealer WIN!!!"); break; }
            else if (dealerHand < 21 && dealerHand > playerHand) { console.log("Dealer WIN!!!"); break; }
            else if (dealerHand > 21) { console.log("Player WIN!!!"); break; }
            else if (dealerHand === playerHand) { console.log("Tie"); break; }

        }
    if (playerHand > 0 && dealerHand > 0)
        console.log(`Dealer hand: ${dealerHand}, Player hand: ${playerHand}`);
    let res = await question("Play again? yes (y) no (n): ");
    res = String(res).toLowerCase();
    while (res != 'yes' && res != 'y' && res != 'no' && res != 'n')
    {
        res = await question("Play again? yes (y) no (n): ");
    }
    if (res === 'yes' || res === 'y') return game();
    else if (res === 'no' || res === 'n')
    {
        console.log("Thank you for playing!!");
        process.exit(0);
    }
};

game();
