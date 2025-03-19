const price = 1.87;
const cid = [
    ['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25],
    ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]
];
const usCurrency = {
    'PENNY': 0.01, 'NICKEL': 0.05, 'DIME': 0.10, 'QUARTER': 0.25,
    'ONE': 1, 'FIVE': 5, 'TEN': 10, 'TWENTY': 20, 'ONE HUNDRED': 100
};

function processTransaction(payment) {
    if (isNaN(payment) || payment <= 0) return 'Invalid payment';
    if (payment < price) {
        alert('Customer does not have enough money to purchase the item');
        return 'Customer does not have enough money to purchase the item';
    }
    if (payment === price) return 'No change due - customer paid with exact cash';
    
    return calculateChange(parseFloat((payment - price).toFixed(2)));
}

function calculateChange(change) {
    let remainingChange = change;
    let changeDenomination = [];
    let totalDrawer = cid.reduce((sum, [, amount]) => sum + amount, 0);
    
    if (totalDrawer < change) return 'Status: INSUFFICIENT_FUNDS';
    
    for (let i = cid.length - 1; i >= 0; i--) {
        let [name, amount] = cid[i];
        let value = usCurrency[name];
        let givenAmount = 0;
        
        while (remainingChange >= value && amount > 0) {
            remainingChange = parseFloat((remainingChange - value).toFixed(2));
            amount = parseFloat((amount - value).toFixed(2));
            givenAmount = parseFloat((givenAmount + value).toFixed(2));
        }
        
        if (givenAmount > 0) {
            changeDenomination.push([name, givenAmount]);
            cid[i][1] = amount;
        }
    }
    
    if (remainingChange > 0) return 'Status: INSUFFICIENT_FUNDS';
    
    let status = cid.every(([_, amount]) => amount === 0) ? 'CLOSED' : 'OPEN';
    let formattedChange = changeDenomination.map(([key, value]) => `${key}: $${value.toFixed(2)}`).join(', ');
    return `Status: ${status} ${formattedChange}`;
}

function renderCashDrawer() {
    changeDrawer.innerHTML = '';
    cid.forEach(([name, amount]) => {
        const li = document.createElement('li');
        li.textContent = `${name}: $${amount.toFixed(2)}`;
        changeDrawer.appendChild(li);
    });
}

function handlePurchase() {
    const payment = parseFloat(cashInput.value);
    const result = processTransaction(payment);
    changeDue.textContent = result;
    renderCashDrawer();
}

const cashInput = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDrawer = document.querySelector('.drawer');

document.querySelector('.price').textContent = `Shop price $${price}`;

purchaseBtn.addEventListener('click', handlePurchase);
cashInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handlePurchase(); });

renderCashDrawer();
