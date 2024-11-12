// Example of a simple interaction
document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.getElementById("home");
    homeSection.style.backgroundColor = "#f4f4f4";
});

function calculateProfit() {
    const optionType = document.getElementById("optionType").value;
    const strikePrice = parseFloat(document.getElementById("strikePrice").value);
    const marketPrice = parseFloat(document.getElementById("marketPrice").value);
    const contractPrice = parseFloat(document.getElementById("contractPrice").value);
    const numContracts = parseInt(document.getElementById("numContracts").value);
    let result = '';

    if (isNaN(strikePrice) || isNaN(marketPrice) || isNaN(contractPrice) || isNaN(numContracts)) {
        result = "Please enter valid numbers for all fields.";
    } else {
        const contractMultiplier = 100; // Each contract typically represents 100 shares
        const totalCost = contractPrice * contractMultiplier * numContracts;
        let potentialProfit = 0;

        if (optionType === "call") {
            potentialProfit = (marketPrice > strikePrice)
                ? ((marketPrice - strikePrice) * contractMultiplier * numContracts - totalCost)
                : -totalCost;
            result = `
                <strong>Calculation:</strong><br>
                Call Option Profit/Loss = (Market Price - Strike Price) x Contract Multiplier x Number of Contracts - Total Cost<br>
                Total Cost (Maximum Loss): $${totalCost.toFixed(2)}<br>
                ${potentialProfit >= 0 ? `<strong>Net Profit:</strong> $${potentialProfit.toFixed(2)}` : `<strong>Net Loss:</strong> $${Math.abs(potentialProfit).toFixed(2)}`}
            `;
        } else if (optionType === "put") {
            potentialProfit = (marketPrice < strikePrice)
                ? ((strikePrice - marketPrice) * contractMultiplier * numContracts - totalCost)
                : -totalCost;
            result = `
                <strong>Calculation:</strong><br>
                Put Option Profit/Loss = (Strike Price - Market Price) x Contract Multiplier x Number of Contracts - Total Cost<br>
                Total Cost (Maximum Loss): $${totalCost.toFixed(2)}<br>
                ${potentialProfit >= 0 ? `<strong>Net Profit:</strong> $${potentialProfit.toFixed(2)}` : `<strong>Net Loss:</strong> $${Math.abs(potentialProfit).toFixed(2)}`}
            `;
        }
    }

    document.getElementById("result").innerHTML = result;
}