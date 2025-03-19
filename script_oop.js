import { logoAnimation } from './modules/logo_module.js'
import { buttonAnimation } from './modules/button_shine_module.js'

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
            return 'Customer does not have enough money to purchase the item';
        } else if (payment === this.price) {
            return 'No change due - customer paid with exact cash'
        } else {
            this.change = Number(parseFloat(payment - this.price).toFixed(2));
            // alert(`Price: ${this.price}$. received ${payment}$. Your change is ${this.change}$`)
        }
    }
    
    calculateChangeDenomination() {
        let remainingChange = this.change;
        const changeDenomination = {};
        if (this.change) {
            const denominationArray = Object.entries(this.denomination).reverse();
            const availableDenominationTotal = [...this.cashInDrawer].reverse();
            denominationArray.forEach(([deno, value], index) => {
                const remainingPieces = Math.round((availableDenominationTotal[index][1] / value) * 100) / 100;
                const piecesRequired = Math.floor(remainingChange / value);
                if (value < this.change && remainingChange > 0) {
                    if ((remainingPieces > piecesRequired) && piecesRequired) {
                        remainingChange -= value * piecesRequired;
                        changeDenomination[deno] = piecesRequired
                    } else if (piecesRequired && remainingPieces) {
                        remainingChange -= value * remainingPieces;
                        changeDenomination[deno] = remainingPieces
                    }
                    remainingChange = Math.round(remainingChange * 100) / 100;
                }
            })
            if (remainingChange) {
                return 'Status: INSUFFICIENT_FUNDS';
            }
            else {
                this.updateCashInDrawer(changeDenomination)
                return this.returnChangeObject(changeDenomination);
            }
        } else {
            console.warn('Nothing to calculate!');
            return false
        }
    }
    
    returnChangeObject(changeDenomination) {
        const changeDueObj = {};
        Object.entries(changeDenomination).forEach(([deno, val]) => {
            changeDueObj[deno] = Math.round(val * this.denomination[deno] * 100) / 100;
        })
        return changeDueObj;
    }

    updateCashInDrawer(pieces) {
        if (typeof pieces == 'object') {
            Object.entries(this.denomination).forEach(([deno, val], index) => {
                if (pieces[deno]) {
                    const subtractFromDrawer = pieces[deno] * val;
                    let toBeSubracted = this.cashInDrawer[index][1];
                    toBeSubracted -= Math.round(subtractFromDrawer * 100) / 100;
                    this.cashInDrawer[index][1] = Math.round(toBeSubracted * 100) / 100;
                }
            })
        }
    }
}

const shop = new CashRegister(price, cid, usCurrency);

cost.textContent = `Shop price $${shop.price}`;

const renderChangeInDrawer = (cid) => {
    while (changeDrawer.firstChild) {
        changeDrawer.removeChild(changeDrawer.firstChild);
    }
    cid.forEach((denomination) => {
        const newElement = document.createElement('li');
        newElement.textContent = `${denomination[0]}: `;
        newElement.textContent += `${denomination[1]}$`;
        changeDrawer.appendChild(newElement);
    });
}

const renderChangeDue = (change) => {
    if (typeof change == 'object') {
        console.table(change);
        let changeLeftValue = 0;
        shop.cashInDrawer.forEach((deno) => {
            changeLeftValue += deno[1]
        });
        if (!changeLeftValue) {
            changeDue.textContent = 'Status: CLOSED ';
        } else {
            changeDue.textContent = 'Status: OPEN ';
        }
        Object.entries(change).forEach(([deno, val]) => {
            changeDue.textContent += `${deno}: $${val} `
        })
        shop.change = 0;
        renderChangeInDrawer(shop.cashInDrawer);
    } else if (change) {
        changeDue.textContent = change;
    } else {
        console.warn('Drawer not opened.')
    }
}

const purchaseEvent = () => {
    changeDue.textContent = shop.doTransaction(cash);
    const changeObj = shop.calculateChangeDenomination();
    renderChangeDue(changeObj);
    showChangeDue();
}

purchaseBtn.addEventListener('click', purchaseEvent);

cash.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') {
        purchaseEvent()
    }
})

const showChangeDue = () => {
    if (changeDue.textContent == '') {
        changeDue.style.display = 'none';
    } else {
        changeDue.style.display = 'block';
    }
}

showChangeDue();
renderChangeInDrawer(shop.cashInDrawer);

const gradStart = `hsl(297, 80%, 30%)`;
const gradFinish = `hsl(297, 80%,40%)`;
const color = `#fff`

buttonAnimation(purchaseBtn, gradStart, gradFinish, color);
logoAnimation();