// --- THEME SETUP (Enforced Dark Mode) ---
console.log("TaxInfo 2026 Loaded");

// --- GLOBAL VARIABLES for Chart ---
let taxChartInstance = null;

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

// --- ADVANCED MODE TOGGLE ---
function toggleAdvancedMode() {
    const isChecked = document.getElementById('advancedModeToggle').checked;
    const inputsDiv = document.getElementById('advancedInputs');
    if (isChecked) {
        inputsDiv.classList.remove('hidden');
    } else {
        inputsDiv.classList.add('hidden');
    }
}

// --- 1. SALARY CALCULATOR LOGIC (2026 REFORM + ADVANCED) ---
function calculateSalary() {
    // 1. Get Base Inputs
    const gross = parseFloat(document.getElementById('grossSalary').value);
    if (!gross || gross < 0) return;

    // 2. Social Deductions (Standard)
    // Social Ins: 8.3% | GESY: 2.65% | Total: 10.95%
    const socialRate = 0.1095;
    const socialDeductions = gross * socialRate;

    // 3. Advanced Deductions
    let totalDeductions = 0;
    
    // Check if Advanced Mode is Active
    const isAdvanced = document.getElementById('advancedModeToggle').checked;
    let expatExemption = 0;

    if (isAdvanced) {
        // A. Children
        const children = parseInt(document.getElementById('childrenCount').value);
        if (children === 1) totalDeductions += 1000;
        else if (children === 2) totalDeductions += 2250;
        else if (children === 3) totalDeductions += 3750; // Approximated 3+ logic

        // B. Housing Interest (Max 2000)
        let housing = parseFloat(document.getElementById('housingDeduction').value) || 0;
        housing = Math.min(housing, 2000);
        totalDeductions += housing;

        // C. Green Investment (Max 1000)
        let green = parseFloat(document.getElementById('greenDeduction').value) || 0;
        green = Math.min(green, 1000);
        totalDeductions += green;

        // D. Expat 50% Exemption
        const isExpat = document.getElementById('expatExemption').checked;
        if (isExpat && gross > 55000) {
            expatExemption = gross * 0.5;
        }
    }

    // 4. Calculate Taxable Income
    // Formula: Gross - Social - ExpatExemption - Deductions = Taxable Base
    // Note: Deductions usually reduce the Taxable Base.
    let taxableIncome = gross - socialDeductions - expatExemption - totalDeductions;
    if (taxableIncome < 0) taxableIncome = 0;

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

    // 5. Render Salary Results
    document.getElementById('outGross').innerText = formatMoney(gross);
    document.getElementById('outSocial').innerText = formatMoney(socialDeductions);
    document.getElementById('outTax').innerText = formatMoney(tax);
    document.getElementById('outNet').innerText = formatMoney(net);
    document.getElementById('salaryResult').classList.remove('hidden');

    // 6. Update Chart
    updateChart(net, tax, socialDeductions);
}

function updateChart(net, tax, social) {
    const ctx = document.getElementById('taxChart').getContext('2d');
    
    if (taxChartInstance) {
        taxChartInstance.destroy();
    }

    taxChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Net Pay', 'Income Tax', 'Social Ins & GESY'],
            datasets: [{
                data: [net, tax, social],
                backgroundColor: [
                    '#2ec16d', // Green for Net
                    '#ff5a5f', // Red for Tax
                    '#f1c40f'  // Yellow for Social
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#b0b0b0' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += formatMoney(context.parsed) + ' €';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function multiplyBy12() {
    const input = document.getElementById('grossSalary');
    if (input.value) {
        input.value = parseFloat(input.value) * 12;
    }
}

function multiplyBy13() {
    const input = document.getElementById('grossSalary');
    if (input.value) {
        input.value = parseFloat(input.value) * 13;
    }
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

    // Only run if calendar elements exist (e.g. index.html)
    if (!displayBox || !daysBox) return;

    const next = deadlines.find(d => new Date(d.date) > today);

    if (next) {
        const diffTime = Math.abs(new Date(next.date) - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        displayBox.innerText = next.title;
        daysBox.innerText = `${diffDays} Days Left`;

        if (diffDays < 7) daysBox.style.color = "#ff6b6b";
    } else {
        displayBox.innerText = "All 2026 Deadlines Passed";
        daysBox.innerText = "✅";
    }
}

// --- NEWS SEARCH & FILTER LOGIC ---
function filterNews(category) {
    const allArticles = document.querySelectorAll('.news-card');
    const buttons = document.querySelectorAll('.news-tab-btn');

    buttons.forEach(btn => {
        const btnText = btn.innerText.toLowerCase();
        if (category === 'all' && btnText.includes('all')) {
            btn.classList.add('active');
        } else if (category !== 'all' && btnText.includes(category)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    allArticles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        if (category === 'all' || articleCategory === category) {
            article.style.display = 'flex'; // Restore filtered logic
            article.style.animation = 'none';
            article.offsetHeight; 
            article.style.animation = 'fadeIn 0.4s ease';
        } else {
            article.style.display = 'none';
        }
    });
}

function searchContent() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const allCards = document.querySelectorAll('.news-card, .tp-card, .card, .data-card, .res-card, .exemption-card');

    allCards.forEach(card => {
        const text = card.textContent || card.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        document.querySelectorAll(".nav-link, .btn-nav, .dropdown-item").forEach(n => n.addEventListener("click", () => {
            if (!n.parentElement.classList.contains('nav-item-dropdown')) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }));
    }

    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
                dropdowns.forEach(other => {
                    if (other !== dropdown) other.classList.remove('active');
                });
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown') && !e.target.closest('.hamburger')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});