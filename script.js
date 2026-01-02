// --- THEME SWITCHING LOGIC ---
const themeToggleBtn = document.getElementById('theme-toggle');
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Initial Theme Check
const setInitialTheme = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
};

// Toggle Function
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// Event Listeners
themeToggleBtn.addEventListener('click', toggleTheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// Run on load
setInitialTheme();


// --- TAB SWITCHING LOGIC ---
function openTab(tabName) {
    const contents = document.getElementsByClassName('tab-content');
    for (let content of contents) {
        content.classList.remove('active');
    }
    const buttons = document.getElementsByClassName('tab-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
    document.getElementById(tabName).classList.add('active');
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
    if (taxableIncome > 22000) {
        const taxableAmount = Math.min(taxableIncome, 32000) - 22000;
        tax += taxableAmount * 0.20;
    }
    if (taxableIncome > 32000) {
        const taxableAmount = Math.min(taxableIncome, 42000) - 32000;
        tax += taxableAmount * 0.25;
    }
    if (taxableIncome > 42000) {
        const taxableAmount = Math.min(taxableIncome, 72000) - 42000;
        tax += taxableAmount * 0.30;
    }
    if (taxableIncome > 72000) {
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
    const divTax26 = afterCorp26 * 0.05; 
    const net26 = afterCorp26 - divTax26;

    document.getElementById('tax25').innerText = formatMoney(corpTax25);
    document.getElementById('div25').innerText = formatMoney(divTax25);
    document.getElementById('net25').innerText = formatMoney(net25);

    document.getElementById('tax26').innerText = formatMoney(corpTax26);
    document.getElementById('div26').innerText = formatMoney(divTax26);
    document.getElementById('net26').innerText = formatMoney(net26);

    document.getElementById('businessResult').classList.remove('hidden');

    const diff = net26 - net25;
    const verdictDiv = document.getElementById('verdict');
    verdictDiv.classList.remove('hidden');
    
    if (diff > 0) {
        verdictDiv.innerText = `You save €${formatMoney(diff)} with the new 2026 rules!`;
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

// --- TAX CALENDAR LOGIC ---
function initCalendar() {
    const deadlines = [
        { date: "2026-01-31", title: "Deemed Dividend Deadline" },
        { date: "2026-03-31", title: "Tax Return (TD4/TD1) Submission" },
        { date: "2026-06-30", title: "SDC & GHS Payment (1st Sem)" },
        { date: "2026-07-31", title: "1st Provisional Tax Installment" },
        { date: "2026-12-31", title: "2nd Provisional Tax Installment" }
    ];

    const today = new Date();
    const displayBox = document.getElementById("next-deadline-title");
    const daysBox = document.getElementById("days-left");

    const next = deadlines.find(d => new Date(d.date) > today);

    if (next) {
        const diffTime = Math.abs(new Date(next.date) - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        displayBox.innerText = next.title;
        daysBox.innerText = `${diffDays} Days Left`;
        
        if(diffDays < 7) daysBox.style.color = "#ff6b6b"; 
    } else {
        displayBox.innerText = "All 2026 Deadlines Passed";
        daysBox.innerText = "✅";
    }
}

document.addEventListener('DOMContentLoaded', initCalendar);