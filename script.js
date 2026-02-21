// --- THEME SETUP (Enforced Dark Mode) ---
console.log("TaxInfo 2026 Loaded");

// --- GLOBAL VARIABLES for Chart ---
let taxChartInstance = null;
let activeNewsCategory = 'all';
const THEME_STORAGE_KEY = 'taxinfo_theme';
const CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js';
const SITE_CANONICAL_ORIGIN = 'https://taxinfo.solutions';
const FORUM_COLLECTION_JSONLD_ID = 'forum-collection-jsonld';
let chartJsLoaderPromise = null;
const THREAD_CATALOG = [
    {
        id: 'transfer-pricing-playbook',
        categoryKey: 'corporate',
        category: 'Corporate',
        tag: 'Corporate',
        kicker: 'Policy Watch',
        title: 'Transfer Pricing Playbook: Local File Scope and Benchmark Refresh',
        excerpt: 'A working thread for related-party transaction mapping, materiality thresholds, and how teams are refreshing benchmark packs for 2026 files.',
        href: 'thread-transfer-pricing-playbook.html',
        summary: 'Policy watch thread on related-party mapping, local file evidence, and benchmark update cadence.',
        replies: 176,
        updated: 'Feb 21, 2026',
        updatedIso: '2026-02-21',
        cta: 'Open Playbook',
        gradient: 'linear-gradient(135deg, #ff512f, #f09819)',
        keywordChips: ['Cyprus transfer pricing documentation 2026', 'Cyprus related party transactions forum']
    },
    {
        id: 'filing-penalties-calendar',
        categoryKey: 'personal',
        category: 'Personal',
        tag: 'Personal',
        kicker: 'Deadline Board',
        title: 'Filing Penalties Calendar: Late Return Costs and Appeal Windows',
        excerpt: 'Forum members are tracking penalty triggers, grace period assumptions, and the documents needed when filing correction or appeal requests.',
        href: 'thread-filing-penalties-calendar.html',
        summary: 'Deadline board for late filing triggers, penalty scenarios, and appeal documentation windows.',
        replies: 128,
        updated: 'Feb 21, 2026',
        updatedIso: '2026-02-21',
        cta: 'View Calendar',
        gradient: 'linear-gradient(135deg, #396afc, #2948ff)',
        keywordChips: ['Cyprus filing penalties deadlines', 'Cyprus late tax return penalties']
    },
    {
        id: 'payroll-assumptions-log',
        categoryKey: 'personal',
        category: 'Personal',
        tag: 'Personal',
        kicker: 'Payroll Board',
        title: 'Payroll Assumptions Log: PAYE Inputs, SI Caps, and Monthly Rechecks',
        excerpt: 'A shared log for payroll teams validating monthly assumptions, year-end true-up risks, and changes in deduction treatment across employee groups.',
        href: 'thread-payroll-assumptions-log.html',
        summary: 'Payroll board for PAYE assumptions, social insurance caps, and monthly reconciliation checks.',
        replies: 152,
        updated: 'Feb 20, 2026',
        updatedIso: '2026-02-20',
        cta: 'Open Payroll Log',
        gradient: 'linear-gradient(135deg, #16a085, #f4d03f)',
        keywordChips: ['Cyprus payroll assumptions 2026', 'Cyprus PAYE social insurance assumptions']
    },
    {
        id: 'corporate-transition',
        categoryKey: 'corporate',
        category: 'Corporate',
        tag: 'Corporate',
        kicker: 'Pinned Thread',
        title: 'Corporate Tax at 15%: Transitional Questions and Edge Cases',
        excerpt: 'Community members are comparing first-year filing strategies, loss offsets, and how mixed-revenue companies should model 2026 liability.',
        href: 'thread-corporate-tax-transition.html',
        summary: 'Pinned transition thread for first-year filings, mixed-revenue scenarios, and documentation policy.',
        replies: 149,
        updated: 'Feb 20, 2026',
        updatedIso: '2026-02-20',
        cta: 'Open Thread',
        gradient: 'linear-gradient(135deg, #FF5F6D, #FFC371)',
        keywordChips: ['Cyprus corporate tax 15%', 'Cyprus company tax planning 2026']
    },
    {
        id: 'dividend-planning',
        categoryKey: 'corporate',
        category: 'Corporate',
        tag: 'Corporate',
        kicker: 'Analyst Brief',
        title: 'Dividend SDC at 5%: Distribution Timing Discussion',
        excerpt: 'A practical thread on dividend calendar planning, retained earnings scenarios, and shareholder-level impact under the new regime.',
        href: 'thread-dividend-sdc-planning.html',
        summary: 'Analyst brief covering payout timing, retained earnings, and shareholder communication.',
        replies: 95,
        updated: 'Feb 19, 2026',
        updatedIso: '2026-02-19',
        cta: 'View Discussion',
        gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
        keywordChips: ['Cyprus dividend tax 5%', 'Cyprus SDC dividend timing']
    },
    {
        id: 'salary-threshold',
        categoryKey: 'personal',
        category: 'Personal',
        tag: 'Personal',
        kicker: 'Community Guide',
        title: 'EUR 22,000 Tax-Free Threshold: Salary Examples by Income Band',
        excerpt: 'Members are posting real salary scenarios and comparing payroll outcomes between 2025 and 2026 brackets using shared assumptions.',
        href: 'thread-salary-threshold-examples.html',
        summary: 'Community guide with structured salary examples and assumption-based comparisons.',
        replies: 214,
        updated: 'Feb 20, 2026',
        updatedIso: '2026-02-20',
        cta: 'Check Examples',
        gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
        keywordChips: ['Cyprus salary tax calculator 2026', 'Cyprus tax-free threshold 22000']
    },
    {
        id: 'crypto-evidence',
        categoryKey: 'crypto',
        category: 'Crypto',
        tag: 'Crypto',
        kicker: 'Compliance Thread',
        title: 'Crypto 8% Framework: Disposal Evidence and Wallet Tracking',
        excerpt: 'Forum contributors share audit-ready record templates and discuss when a disposal event is likely to trigger taxable gain recognition.',
        href: 'thread-crypto-disposal-evidence.html',
        summary: 'Compliance thread on disposal events, record trails, and valuation snapshots.',
        replies: 73,
        updated: 'Feb 18, 2026',
        updatedIso: '2026-02-18',
        cta: 'Read Thread',
        gradient: 'linear-gradient(135deg, #F7971E, #FFD200)',
        keywordChips: ['Cyprus crypto tax 8%', 'Cyprus crypto disposal evidence']
    },
    {
        id: 'relief-docs',
        categoryKey: 'relief',
        category: 'Relief',
        tag: 'Relief',
        kicker: 'Checklist Board',
        title: 'Housing and Family Relief: Required Documents by Claim Type',
        excerpt: 'A pinned checklist thread covering rent receipts, mortgage evidence, and how households are substantiating child-related deductions.',
        href: 'thread-housing-family-relief-docs.html',
        summary: 'Checklist board for rent, mortgage, and dependent support documentation.',
        replies: 119,
        updated: 'Feb 18, 2026',
        updatedIso: '2026-02-18',
        cta: 'Review Checklist',
        gradient: 'linear-gradient(135deg, #3f5efb, #fc466b)',
        keywordChips: ['Cyprus family tax relief', 'Cyprus housing deduction documents']
    },
    {
        id: 'startup-options',
        categoryKey: 'innovation',
        category: 'Innovation',
        tag: 'Innovation',
        kicker: 'Startup Board',
        title: '8% Treatment for Qualified Stock Options: Startup Scenarios',
        excerpt: 'Founders and finance teams compare vesting structures, qualification tests, and investor communication approaches under the proposed framework.',
        href: 'thread-startup-stock-options-8.html',
        summary: 'Startup board discussing vesting structures, qualification tests, and investor updates.',
        replies: 60,
        updated: 'Feb 17, 2026',
        updatedIso: '2026-02-17',
        cta: 'Join Startup Thread',
        gradient: 'linear-gradient(135deg, #0f2027, #2c5364)',
        keywordChips: ['Cyprus stock options tax 8%', 'Cyprus startup tax forum']
    }
];

function loadChartJsIfNeeded() {
    if (typeof Chart !== 'undefined') return Promise.resolve(true);
    if (chartJsLoaderPromise) return chartJsLoaderPromise;

    chartJsLoaderPromise = new Promise(resolve => {
        const script = document.createElement('script');
        script.src = CHART_JS_URL;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
    });

    return chartJsLoaderPromise;
}

function toCanonicalUrl(path) {
    if (!path) return SITE_CANONICAL_ORIGIN;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_CANONICAL_ORIGIN}${normalized}`;
}

function upsertJsonLdScript(scriptId, schemaObject) {
    if (!schemaObject) return;

    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.id = scriptId;
        document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(schemaObject);
}

function injectForumCollectionStructuredData() {
    if (!document.getElementById('news-hub')) return;

    const lastReviewedMeta = document.querySelector('meta[name="last-reviewed"]');
    const dateModified = lastReviewedMeta && lastReviewedMeta.content
        ? lastReviewedMeta.content
        : new Date().toISOString().slice(0, 10);

    const aboutTerms = Array.from(new Set(
        THREAD_CATALOG.flatMap(thread => [
            `${thread.category} tax Cyprus`,
            ...(thread.keywordChips || [])
        ])
    )).slice(0, 10);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_CANONICAL_ORIGIN}/#forum`,
        name: 'Cyprus Tax Forum and Newsroom 2026',
        url: SITE_CANONICAL_ORIGIN,
        inLanguage: 'en',
        dateModified,
        about: aboutTerms.map(term => ({ '@type': 'Thing', name: term })),
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: THREAD_CATALOG.map((thread, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: thread.title,
                url: toCanonicalUrl(thread.href)
            }))
        }
    };

    upsertJsonLdScript(FORUM_COLLECTION_JSONLD_ID, schema);
}

function getKeywordChipEntriesFromCatalog() {
    const seen = new Set();
    const chips = [];

    THREAD_CATALOG.forEach(thread => {
        (thread.keywordChips || []).forEach(label => {
            const key = `${label.toLowerCase()}|${thread.href}`;
            if (seen.has(key)) return;
            seen.add(key);
            chips.push({ label, href: thread.href });
        });
    });

    return chips;
}

function getLatestThreadUpdate() {
    return [...THREAD_CATALOG]
        .filter(thread => thread.updatedIso)
        .sort((a, b) => new Date(b.updatedIso) - new Date(a.updatedIso))[0] || null;
}

function formatDateLong(isoDate) {
    if (!isoDate) return '';
    const date = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function formatDateShort(isoDate) {
    if (!isoDate) return '';
    const date = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

function syncSeoKeywordMetaFromCatalog() {
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    const newsKeywordsMeta = document.querySelector('meta[name="news_keywords"]');

    const keywordPool = Array.from(new Set([
        'Cyprus tax calculator 2026',
        'Cyprus tax forum',
        'Cyprus tax news',
        ...THREAD_CATALOG.flatMap(thread => thread.keywordChips || [])
    ]));

    const keywordsValue = keywordPool.slice(0, 14).join(', ');
    const newsKeywordsValue = keywordPool.slice(0, 8).join(', ');

    if (keywordsMeta) keywordsMeta.setAttribute('content', keywordsValue);
    if (newsKeywordsMeta) newsKeywordsMeta.setAttribute('content', newsKeywordsValue);
}

function renderTrendingThreads() {
    const grid = document.getElementById('trending-grid');
    if (!grid) return;

    const topThreads = [...THREAD_CATALOG]
        .sort((a, b) => b.replies - a.replies)
        .slice(0, 3);

    grid.innerHTML = topThreads.map((thread, index) => `
        <article class="trending-card">
            <p class="trending-rank">#${index + 1}</p>
            <p class="trending-cat">${thread.category}</p>
            <h3 class="trending-title">${thread.title}</h3>
            <p class="trending-meta">
                <span class="trending-pill">${thread.replies} replies</span>
                <span class="trending-pill">Updated ${thread.updated}</span>
            </p>
            <a href="${thread.href}" class="trending-link">Open Thread</a>
        </article>
    `).join('');
}

function renderForumStatsFromCatalog() {
    const statThreads = document.getElementById('statTrackedThreads');
    const statReplies = document.getElementById('statCommunityReplies');
    const statChannels = document.getElementById('statForumChannels');
    const statLatest = document.getElementById('statLatestUpdate');

    const totalThreads = THREAD_CATALOG.length;
    const totalReplies = THREAD_CATALOG.reduce((sum, thread) => sum + (thread.replies || 0), 0);
    const totalChannels = new Set(THREAD_CATALOG.map(thread => thread.categoryKey)).size;
    const latest = getLatestThreadUpdate();
    const latestShort = latest ? formatDateShort(latest.updatedIso) : '--';

    if (statThreads) statThreads.textContent = String(totalThreads);
    if (statReplies) statReplies.textContent = String(totalReplies);
    if (statChannels) statChannels.textContent = String(totalChannels);
    if (statLatest) statLatest.textContent = latestShort || '--';

    if (latest && latest.updatedIso) {
        const lastReviewedBadge = document.getElementById('lastReviewedBadge');
        const metaLastReviewed = document.getElementById('meta-last-reviewed');
        const metaOgUpdatedTime = document.getElementById('meta-og-updated-time');

        const latestLong = formatDateLong(latest.updatedIso);
        if (lastReviewedBadge && latestLong) {
            lastReviewedBadge.textContent = `Last reviewed: ${latestLong}`;
        }
        if (metaLastReviewed) {
            metaLastReviewed.setAttribute('content', latest.updatedIso);
        }
        if (metaOgUpdatedTime) {
            metaOgUpdatedTime.setAttribute('content', `${latest.updatedIso}T00:00:00+02:00`);
        }
    }
}

function getActiveTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

function getChartUiColors(theme) {
    if (theme === 'dark') {
        return {
            legend: '#c5d7df',
            tooltipBg: 'rgba(8, 20, 30, 0.96)',
            tooltipTitle: '#e8f2f7',
            tooltipBody: '#d4e6ee',
            tooltipBorder: 'rgba(173, 205, 217, 0.2)'
        };
    }

    return {
        legend: '#49626b',
        tooltipBg: 'rgba(255, 255, 255, 0.96)',
        tooltipTitle: '#153740',
        tooltipBody: '#1d4650',
        tooltipBorder: 'rgba(21, 77, 91, 0.18)'
    };
}

function refreshChartTheme(theme = getActiveTheme()) {
    if (!taxChartInstance) return;
    const chartUi = getChartUiColors(theme);

    taxChartInstance.options.plugins.legend.labels.color = chartUi.legend;
    taxChartInstance.options.plugins.tooltip.backgroundColor = chartUi.tooltipBg;
    taxChartInstance.options.plugins.tooltip.titleColor = chartUi.tooltipTitle;
    taxChartInstance.options.plugins.tooltip.bodyColor = chartUi.tooltipBody;
    taxChartInstance.options.plugins.tooltip.borderColor = chartUi.tooltipBorder;
    taxChartInstance.update();
}

function getPreferredTheme() {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
    } catch (_) {
        // Continue with system preference fallback.
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

function updateThemeColorMeta(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute('content', theme === 'dark' ? '#0d1d28' : '#123640');
}

function updateThemeToggleButtons(theme) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const buttons = document.querySelectorAll('.theme-toggle');

    buttons.forEach(btn => {
        btn.textContent = nextTheme === 'dark' ? 'Dark' : 'Light';
        btn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_) {
        // Ignore storage failures (private mode/restricted environments).
    }
    updateThemeColorMeta(theme);
    updateThemeToggleButtons(theme);
    refreshChartTheme(theme);
}

function initThemeToggle() {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    const buttons = document.querySelectorAll('.theme-toggle');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    });
}

// --- TAB SWITCHING LOGIC ---
function openTab(tabName, targetButton) {
    const contents = document.getElementsByClassName('tab-content');
    for (let content of contents) {
        content.classList.remove('active');
        content.hidden = true;
    }
    const buttons = document.getElementsByClassName('tab-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
    }
    const activeTab = document.getElementById(tabName);
    if (!activeTab) return;

    activeTab.classList.add('active');
    activeTab.hidden = false;

    const activeButton =
        targetButton ||
        document.querySelector(`.tab-btn[aria-controls="${tabName}"]`) ||
        (typeof event !== 'undefined' ? event.currentTarget : null);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
        activeButton.setAttribute('tabindex', '0');
    }
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

    // 2. Social Deductions (Estimator policy)
    // Employee SI: 8.8% up to annual cap | GESY: 2.65% on gross
    const annualSocialInsuranceCap = 66612;
    const socialInsuranceRate = 0.088;
    const gesyRate = 0.0265;

    const socialInsurance = Math.min(gross, annualSocialInsuranceCap) * socialInsuranceRate;
    const gesy = gross * gesyRate;
    const socialDeductions = socialInsurance + gesy;

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
        else if (children === 3) totalDeductions += 3750;
        else if (children === 4) totalDeductions += 5500;
        else if (children === 5) totalDeductions += 7500;

        // B1. Housing Loan Interest (Max 2000)
        let housingInt = parseFloat(document.getElementById('housingInterest').value) || 0;
        housingInt = Math.min(housingInt, 2000);
        totalDeductions += housingInt;

        // B2. Rent Allowance (Max 2000)
        let rentDed = parseFloat(document.getElementById('rentDeduction').value) || 0;
        rentDed = Math.min(rentDed, 2000);
        totalDeductions += rentDed;

        // C. Green Investment (Max 1000)
        let green = parseFloat(document.getElementById('greenDeduction').value) || 0;
        green = Math.min(green, 1000);
        totalDeductions += green;

        // D. Other IR59 Deductions (Unions, Donations, etc.)
        let ir59 = parseFloat(document.getElementById('ir59Deductions').value) || 0;
        totalDeductions += ir59;

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
    const year = document.getElementById('taxYear').value;
    const noteElement = document.getElementById('taxComputationNote');

    if (year === '2026') {
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
        document.getElementById('outTaxLabel').innerText = "Income Tax (2026 Rules):";
        if (noteElement) {
            noteElement.innerText = "*Calculated with 2026 progressive brackets and estimator assumptions (SI cap + GESY).";
        }
    } else {
        // 2025 Progressive Brackets
        // 0 - 19,500: 0%
        // 19,501 - 28,000: 20%
        // 28,001 - 36,300: 25%
        // 36,301 - 60,000: 30%
        // 60,001+: 35%
        if (taxableIncome > 19500) {
            const taxableAmount = Math.min(taxableIncome, 28000) - 19500;
            tax += taxableAmount * 0.20;
        }
        if (taxableIncome > 28000) {
            const taxableAmount = Math.min(taxableIncome, 36300) - 28000;
            tax += taxableAmount * 0.25;
        }
        if (taxableIncome > 36300) {
            const taxableAmount = Math.min(taxableIncome, 60000) - 36300;
            tax += taxableAmount * 0.30;
        }
        if (taxableIncome > 60000) {
            const taxableAmount = taxableIncome - 60000;
            tax += taxableAmount * 0.35;
        }
        document.getElementById('outTaxLabel').innerText = "Income Tax (2025 Rules):";
        if (noteElement) {
            noteElement.innerText = "*Calculated with 2025 progressive brackets and estimator assumptions (SI cap + GESY).";
        }
    }

    const net = gross - socialDeductions - tax;

    // 5. Render Salary Results
    document.getElementById('outGross').innerText = formatCurrency(gross);
    document.getElementById('outSocial').innerText = formatCurrency(socialDeductions);
    document.getElementById('outTax').innerText = formatCurrency(tax);
    document.getElementById('outNet').innerText = formatCurrency(net);
    document.getElementById('salaryResult').classList.remove('hidden');

    // 6. Update Chart
    void updateChart(net, tax, socialDeductions);
}

async function updateChart(net, tax, social) {
    const chartReady = await loadChartJsIfNeeded();
    if (!chartReady) return;

    const chartCanvas = document.getElementById('taxChart');
    if (!chartCanvas || typeof Chart === 'undefined') return;

    const ctx = chartCanvas.getContext('2d');

    if (taxChartInstance) {
        taxChartInstance.destroy();
    }

    const chartUi = getChartUiColors(getActiveTheme());

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
                    labels: { color: chartUi.legend }
                },
                tooltip: {
                    backgroundColor: chartUi.tooltipBg,
                    titleColor: chartUi.tooltipTitle,
                    bodyColor: chartUi.tooltipBody,
                    borderColor: chartUi.tooltipBorder,
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += formatCurrency(context.parsed);
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
    verdictDiv.classList.remove('verdict-positive', 'verdict-negative', 'verdict-neutral');

    if (diff > 0) {
        verdictDiv.innerText = `You save €${formatMoney(diff)} with the new 2026 rules!`;
        verdictDiv.classList.add('verdict-positive');
    } else if (diff < 0) {
        verdictDiv.innerText = `You pay €${formatMoney(Math.abs(diff))} more under the new rules.`;
        verdictDiv.classList.add('verdict-negative');
    } else {
        verdictDiv.innerText = "No net difference between the 2025 and 2026 rules.";
        verdictDiv.classList.add('verdict-neutral');
    }
}

// Helper for currency formatting
const moneyFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
});

function formatMoney(amount) {
    const safeAmount = Number.isFinite(amount) ? amount : 0;
    return moneyFormatter.format(Math.round(safeAmount));
}

function formatCurrency(amount) {
    return `€${formatMoney(amount)}`;
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

function renderNewsCardsFromCatalog() {
    const grid = document.getElementById('news-grid-all');
    if (!grid) return;

    grid.innerHTML = THREAD_CATALOG.map(thread => `
        <article class="news-card" data-category="${thread.categoryKey}" data-thread-id="${thread.id}">
            <div class="news-img" style="background: ${thread.gradient};">
                <span class="news-tag">${thread.tag}</span>
            </div>
            <div class="news-content">
                <p class="news-kicker">${thread.kicker}</p>
                <h3 class="news-title">${thread.title}</h3>
                <p class="news-excerpt">${thread.excerpt}</p>
                <p class="forum-meta"><span class="forum-pill">${thread.replies} replies</span><span
                        class="forum-pill">Updated ${thread.updated}</span></p>
                <a href="${thread.href}" class="read-more">${thread.cta}</a>
            </div>
        </article>
    `).join('');
}

function renderThreadDirectory() {
    const list = document.getElementById('thread-directory-list');
    if (!list) return;

    const sortedThreads = [...THREAD_CATALOG].sort((a, b) => b.replies - a.replies);

    list.innerHTML = sortedThreads.map(thread => `
        <article class="thread-directory-card">
            <p class="thread-directory-cat">${thread.category}</p>
            <h3 class="thread-directory-title">${thread.title}</h3>
            <p class="thread-directory-summary">${thread.summary}</p>
            <p class="thread-directory-meta">
                <span class="thread-directory-pill">${thread.replies} replies</span>
                <span class="thread-directory-pill">Updated ${thread.updated}</span>
            </p>
            <a class="thread-directory-link" href="${thread.href}">Open Thread</a>
        </article>
    `).join('');
}

function renderKeywordChipsFromCatalog() {
    const grid = document.getElementById('keyword-chip-grid');
    if (!grid) return;

    const chips = getKeywordChipEntriesFromCatalog();
    grid.innerHTML = chips.map(chip => `
        <a href="${chip.href}" class="keyword-chip">${chip.label}</a>
    `).join('');
}

function initSearchFromQueryParam() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const params = new URLSearchParams(window.location.search);
    const query = (params.get('q') || '').trim();
    if (!query) return;

    input.value = query;
}

// --- NEWS SEARCH & FILTER LOGIC ---
function applyCardFilters(options = {}) {
    const { animateNews = false } = options;
    const input = document.getElementById('searchInput');
    const query = input ? input.value.trim().toUpperCase() : '';

    const allCards = document.querySelectorAll('.news-card, .tp-card, .card, .data-card, .res-card, .exemption-card, .thread-directory-card, .keyword-chip, .faq-item, .trending-card');

    allCards.forEach(card => {
        const text = card.textContent || card.innerText;
        const matchesSearch = text.toUpperCase().indexOf(query) > -1;
        const isNews = card.classList.contains('news-card');

        let matchesNewsCategory = true;
        if (isNews) {
            const articleCategory = card.getAttribute('data-category');
            matchesNewsCategory = activeNewsCategory === 'all' || articleCategory === activeNewsCategory;
        }

        const isVisible = matchesSearch && matchesNewsCategory;

        if (!isVisible) {
            card.style.display = "none";
            return;
        }

        if (isNews) {
            card.style.display = "flex";
            if (animateNews) {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = 'fadeIn 0.4s ease';
            }
        } else {
            card.style.display = "";
        }
    });
}

function filterNews(category) {
    activeNewsCategory = category;
    const buttons = document.querySelectorAll('.news-tab-btn');

    buttons.forEach(btn => {
        const btnCategory = btn.dataset.category;
        if (btnCategory === category) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });

    applyCardFilters({ animateNews: true });
}

function searchContent() {
    applyCardFilters();
}

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCalendar();
    renderNewsCardsFromCatalog();
    renderKeywordChipsFromCatalog();
    renderTrendingThreads();
    renderForumStatsFromCatalog();
    syncSeoKeywordMetaFromCatalog();
    injectForumCollectionStructuredData();
    renderThreadDirectory();
    initSearchFromQueryParam();

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        const closeMenu = () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            hamburger.setAttribute('aria-expanded', 'false');
        };

        hamburger.setAttribute('aria-expanded', 'false');

        hamburger.addEventListener("click", () => {
            const isOpen = hamburger.classList.toggle("active");
            navMenu.classList.toggle("active", isOpen);
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.querySelectorAll(".nav-link, .btn-nav, .dropdown-item").forEach(n => n.addEventListener("click", () => {
            if (!n.parentElement.classList.contains('nav-item-dropdown')) {
                closeMenu();
            }
        }));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    const activeTabBtn = document.querySelector('.tab-btn.active');
    if (activeTabBtn) {
        const tabName = activeTabBtn.getAttribute('aria-controls');
        if (tabName) openTab(tabName, activeTabBtn);
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

    const activeNewsBtn = document.querySelector('.news-tab-btn.active');
    if (activeNewsBtn && activeNewsBtn.dataset.category) {
        activeNewsCategory = activeNewsBtn.dataset.category;
    }
    applyCardFilters();
});
