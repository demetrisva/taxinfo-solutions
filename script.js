// --- TAB SWITCHING LOGIC ---
function openTab(tabName) {
    // Hide all tab contents
    const contents = document.getElementsByClassName('tab-content');
    for (let content of contents) {
        content.classList.remove('active');
    }
    // Remove active class from buttons
    const buttons = document.getElementsByClassName('tab-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
    // Show specific tab
    document.getElementById(tabName).classList.add('active');
    // Highlight specific button (simple approximation)
    event.currentTarget.classList.add('active');
}

// --- 1. SALARY CALCULATOR LOGIC (2026 REFORM) ---
function calculateSalary() {
    const gross = parseFloat(document.getElementById('grossSalary').value);
    if (!gross || gross < 0) return;

    // Social Deductions: 8.3% Social Ins + 2.65% GESY = 10.95%
    const socialDeductions = gross * 0.1095;
    const taxableIncome = gross - socialDeductions;

    let tax = 0;

    // 2026 Progressive Brackets
    // 0 - 22,000: 0%
    if (taxableIncome > 22000) {
        // 22,001 - 32,000: 20%
        const taxableAmount = Math.min(taxableIncome, 32000) - 22000;
        tax += taxableAmount * 0.20;
    }
    if (taxableIncome > 32000) {
        // 32,001 - 42,000: 25%
        const taxableAmount = Math.min(taxableIncome, 42000) - 32000;
        tax += taxableAmount * 0.25;
    }
    if (taxableIncome > 42000) {
        // 42,001 - 72,000: 30%
        const taxableAmount = Math.min(taxableIncome, 72000) - 42000;
        tax += taxableAmount * 0.30;
    }
    if (taxableIncome > 72000) {
        // 72,000+: 35%
        const taxableAmount = taxableIncome - 72000;
        tax += taxableAmount * 0.35;
    }

    const net = gross - socialDeductions - tax;

    // Render Salary Results
    document.getElementById('outGross').innerText = formatMoney(gross);
    document.getElementById('outSocial').innerText = formatMoney(socialDeductions);
    document.getElementById('outTax').innerText = formatMoney(tax);
    document.getElementById('outNet').innerText = formatMoney(net);
    document.getElementById('salaryResult').classList.remove('hidden');
}

// --- 2. BUSINESS PROFIT CALCULATOR LOGIC ---
function calculateBusiness() {
    const profit = parseFloat(document.getElementById('profitInput').value);
    if (!profit || profit < 0) return;

    // 2025 Rules
    const corpTax25 = profit * 0.125;
    const afterCorp25 = profit - corpTax25;
    const divTax25 = afterCorp25 * 0.17; 
    const net25 = afterCorp25 - divTax25;

    // 2026 Rules
    const corpTax26 = profit * 0.15;
    const afterCorp26 = profit - corpTax26;
    const divTax26 = afterCorp26 * 0.05; // New 5% SDC
    const net26 = afterCorp26 - divTax26;

    // Render Business Results
    document.getElementById('tax25').innerText = formatMoney(corpTax25);
    document.getElementById('div25').innerText = formatMoney(divTax25);
    document.getElementById('net25').innerText = formatMoney(net25);

    document.getElementById('tax26').innerText = formatMoney(corpTax26);
    document.getElementById('div26').innerText = formatMoney(divTax26);
    document.getElementById('net26').innerText = formatMoney(net26);

    document.getElementById('businessResult').classList.remove('hidden');

    // Verdict Logic
    const diff = net26 - net25;
    const verdictDiv = document.getElementById('verdict');
    verdictDiv.classList.remove('hidden');
    
    if (diff > 0) {
        verdictDiv.innerText = `Winner! You save €${formatMoney(diff)} with the new rules.`;
        verdictDiv.style.background = "#e8f5e9";
        verdictDiv.style.color = "#2e7d32";
    } else {
        verdictDiv.innerText = `You pay €${formatMoney(Math.abs(diff))} more under the new rules.`;
        verdictDiv.style.background = "#ffebee";
        verdictDiv.style.color = "#c62828";
    }
}

// Helper for currency formatting
function formatMoney(amount) {
    return amount.toLocaleString('en-EU', { maximumFractionDigits: 0 });
}