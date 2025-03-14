let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const usCurrency = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.10,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100
};
const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due'); // output
const cost = document.querySelector('.price');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDrawer = document.querySelector('.drawer')

class CashRegister {
    constructor (price, cid, denomination) {
        this.price = price;
        this.cashInDrawer = cid;
        this.denomination = denomination;
        this.change = 0;
    }

    doTransaction(cash) {
        const payment = isNaN(Number(cash.value)) ? 0 : Number(cash.value);
        if (payment < this.price) {
            return 'Customer does not have enough money to purchase the item'
        } else if (payment === this.price) {
            return 'No change due - customer paid with exact cash'
        } else {
            this.change = Number(parseFloat(payment - this.price).toFixed(2));
            // alert(`Price: ${this.price}$. received ${payment}$. Your change is ${this.change}$`)
        }
    }

    calculateChangeDenomination() {
        if (this.change) {
            const denominationPieces = {};
            const denominationArray = Object.entries(this.denomination).reverse();
            const availableDenominationTotal = this.cashInDrawer.reverse();
            let remainingChange = this.change;
            denominationArray.forEach(([deno, value], index) => {
                const remainingPieces = Math.round((availableDenominationTotal[index][1] / value) * 100) / 100;
                const piecesRequired = Math.floor(remainingChange / value);
                if (value < this.change && remainingChange > 0) {
                    if ((remainingPieces > piecesRequired) && piecesRequired) {
                        remainingChange -= value * piecesRequired;
                        denominationPieces[deno] = piecesRequired
                    } else if (piecesRequired) {
                        remainingChange -= value * remainingPieces;
                        denominationPieces[deno] = remainingPieces
                    }
                    remainingChange = Math.round(remainingChange * 100) / 100;
                }
            }) 
            if (!remainingChange) {
                const changeDueObj = {};
                Object.entries(denominationPieces).forEach(([deno, val]) => {
                    changeDueObj[deno] = val * this.denomination[deno]
                })
                return changeDueObj
            } else {
                return {'Insufficient': 'Funds'}
            }
            console.table(denominationPieces)
        } else {
            console.warn('Nothing to calculate!');
            return false
        }
    }
}

const shop = new CashRegister(price, cid, usCurrency);

shop.price = 19.5;

shop.cashInDrawer = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
cost.textContent = `Shop price $${shop.price}`;



const renderChangeInDrawer = (cid) => {
    cid.forEach((denomination) => {
        const newElement = document.createElement('li');
        newElement.textContent = `${denomination[0]}: `;
        newElement.textContent += `${denomination[1]}$`;
        changeDrawer.appendChild(newElement);
    });
}

const renderChangeDue = (change) => {
    if (change) {
        console.warn(shop.change);
        console.table(change);
        changeDue.textContent = 'Status: OPEN '
        Object.entries(change).forEach(([deno, val]) => {
            changeDue.textContent += `${deno}: $${val} `
        })
        shop.change = 0;
    } else {
        console.warn('Drawer not opened.')
    }
}

const purchaseButton = () => {
    changeDue.textContent = shop.doTransaction(cash);
    const changeObj = shop.calculateChangeDenomination();
    renderChangeDue(changeObj);
}

purchaseBtn.addEventListener('click', purchaseButton);

cash.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') {
        purchaseButton()
    }
})

renderChangeInDrawer(shop.cashInDrawer);

