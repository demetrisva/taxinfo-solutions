// --- THEME SETUP (Enforced Dark Mode) ---
// No toggle logic needed as we are Dark Mode exclusive now.
console.log("TaxInfo 2026 Loaded");


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

function multiplyBy12() {
    const input = document.getElementById('grossSalary');
    if (input.value) {
        input.value = parseFloat(input.value) * 12;
        // Optionally auto-calculate
        // calculateSalary(); 
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

// --- NEWS FILTER LOGIC ---
function filterNews(category) {
    const allArticles = document.querySelectorAll('.news-card');
    const buttons = document.querySelectorAll('.news-tab-btn');

    // Update active button state
    buttons.forEach(btn => {
        // Simple text matching for active state or exact match
        const btnText = btn.innerText.toLowerCase();
        if (category === 'all' && btnText.includes('all')) {
            btn.classList.add('active');
        } else if (category !== 'all' && btnText.includes(category)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter articles
    allArticles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        if (category === 'all' || articleCategory === category) {
            article.style.display = 'block';
            // Trigger reflow for animation
            article.style.animation = 'none';
            article.offsetHeight; /* trigger reflow */
            article.style.animation = 'fadeIn 0.4s ease';
        } else {
            article.style.display = 'none';
        }
    });
}


// --- SEARCH LOGIC ---
function searchContent() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();

    // Elements to search in: News cards, TP cards, Calculator sections
    // Simple implementation: Highlight or separate logic?
    // Let's filter the main sections or cards.

    // 1. Search in News
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const text = card.textContent || card.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    // 2. Search in TP Section
    const tpCards = document.querySelectorAll('.tp-card');
    tpCards.forEach(card => {
        const text = card.textContent || card.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    // If input is empty, ensure layout resets (grids might need display:block vs flex fix, but display="" usually reverts to stylesheet default)
    // For specific grids like news-grid, we rely on the active class, but hiding children works.
}

document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    // Initialize news with 'all'
    // filterNews('all'); // functions exposed globally, HTML calls them.

    // --- MOBILE HAMBURGER TOGGLE ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when clicking a link
        document.querySelectorAll(".nav-link, .btn-nav, .dropdown-item").forEach(n => n.addEventListener("click", () => {
            // Only close if it's not a dropdown toggle
            if (!n.parentElement.classList.contains('nav-item-dropdown')) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }));
    }

    // --- MOBILE DROPDOWN TOGGLE ---
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                // Prevent default anchor jump if it's a dropdown toggle
                e.preventDefault();
                // Toggle active class
                dropdown.classList.toggle('active');

                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown') && !e.target.closest('.hamburger')) {
            dropdowns.forEach(d => d.classList.remove('active'));
            // Optional: Close main menu if clicking outside? Maybe not for standard mobile feel.
        }
    });
});