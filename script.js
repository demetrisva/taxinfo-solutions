// --- GLOBAL VARIABLES for Chart ---
let taxChartInstance = null;
let activeNewsCategory = 'all';
const CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js';
const SITE_CANONICAL_ORIGIN = 'https://taxinfo.solutions';
const SITE_CANONICAL_HOME = `${SITE_CANONICAL_ORIGIN}/`;
const BRIEFING_COLLECTION_JSONLD_ID = 'briefing-collection-jsonld';
const PWA_INSTALL_DISMISS_UNTIL_KEY = 'taxinfo_pwa_install_dismiss_until';
const PWA_IOS_HINT_DISMISS_UNTIL_KEY = 'taxinfo_pwa_ios_hint_dismiss_until';
const PWA_INSTALL_SNOOZE_DAYS = 14;
const PWA_IOS_HINT_SNOOZE_DAYS = 30;
let chartJsLoaderPromise = null;
let deferredInstallPromptEvent = null;
let pwaInstallPromptElement = null;
const THREAD_CATALOG = [
    {
        id: 'cross-border-tax-watch',
        primary: false,
        categoryKey: 'international',
        category: 'International',
        tag: 'International',
        kicker: 'Cross-Border Watch',
        title: 'Cyprus Cross-Border Watch: Vietnam Treaty, OECD Coordination and FDI Screening',
        excerpt: 'A practical international update covering the Cyprus-Vietnam treaty signing, the Ministry of Finance note on the OECD/G20 side-by-side package, and the FDI screening framework now in force.',
        href: 'thread-transfer-pricing-playbook.html',
        summary: 'International note on treaty expansion, OECD coordination and Cyprus FDI screening controls.',
        sources: 3,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read Briefing',
        gradient: 'linear-gradient(135deg, #0c5c7a, #2ca58d)',
        keywordChips: ['Cyprus Vietnam double tax treaty', 'Cyprus OECD side-by-side package', 'Cyprus FDI screening 2026']
    },
    {
        id: 'filing-calendar',
        primary: true,
        categoryKey: 'payroll',
        category: 'Payroll',
        tag: 'Payroll',
        kicker: 'Deadline Calendar',
        title: 'Cyprus Tax Calendar 2026: PAYE, TD7, VAT and Provisional Tax Dates',
        excerpt: 'A dated compliance map of the 2026 filing points that matter most, including the currently published Tax For All PAYE deadlines and the provisional tax cycle.',
        href: 'thread-filing-penalties-calendar.html',
        summary: 'Deadline briefing covering payroll withholding, provisional tax and where to recheck official notices.',
        sources: 5,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'View Dates',
        gradient: 'linear-gradient(135deg, #0a76a8, #6cc3d5)',
        keywordChips: ['Cyprus PAYE deadlines 2026', 'Cyprus provisional tax calendar 2026']
    },
    {
        id: 'vat-zero-rate-exit',
        primary: true,
        categoryKey: 'corporate',
        category: 'Corporate',
        tag: 'Corporate',
        kicker: 'VAT Operations',
        title: 'VAT Operating Notes 2026: Zero-Rate Basic Goods and SME Scheme Checks',
        excerpt: 'A VAT operations briefing on the temporary zero-rate window for basic goods through December 31, 2026 and the small-enterprise rules introduced from January 1, 2025.',
        href: 'thread-vat-zero-rate-exit-readiness.html',
        summary: 'VAT operations note on zero-rate controls, SME checks and year-end transition planning.',
        sources: 3,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read VAT Note',
        gradient: 'linear-gradient(135deg, #006466, #4d908e)',
        keywordChips: ['Cyprus VAT zero rate 2026', 'Cyprus VAT transition 2027', 'Cyprus VAT controls for basic goods']
    },
    {
        id: 'payroll-operating-guide',
        primary: true,
        categoryKey: 'payroll',
        category: 'Payroll',
        tag: 'Payroll',
        kicker: 'Operating Guide',
        title: 'Tax For All Payroll Guide: Monthly Withholding, TD59 Support and Year-Round Controls',
        excerpt: 'A payroll-focused briefing on the published Tax For All filing dates, the interaction with the 2026 individual tax package, and where TD59 support fits into year-round controls.',
        href: 'thread-payroll-assumptions-log.html',
        summary: 'Employer payroll guide for monthly controls, withholding returns, and deduction support files.',
        sources: 4,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Open Guide',
        gradient: 'linear-gradient(135deg, #2c7f5e, #a8d672)',
        keywordChips: ['Cyprus payroll withholding 2026', 'Cyprus TD59 deductions employer']
    },
    {
        id: 'corporate-transition',
        primary: true,
        categoryKey: 'corporate',
        category: 'Corporate',
        tag: 'Corporate',
        kicker: 'Core Reform',
        title: 'Corporate Tax Reform 2026: 15% Rate, Effective Date and Finance Team Checklist',
        excerpt: 'A corporate briefing on the Cyprus reform package effective from January 1, 2026, with emphasis on the 15% corporation tax rate, close processes, forecasts and governance.',
        href: 'thread-corporate-tax-transition.html',
        summary: 'Corporate reform note on the new 15% income tax rate and governance steps for 2026 close cycles.',
        sources: 3,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read Reform Note',
        gradient: 'linear-gradient(135deg, #c76829, #f2c14e)',
        keywordChips: ['Cyprus corporate tax 15% 2026', 'Cyprus tax reform company checklist']
    },
    {
        id: 'dividend-planning',
        primary: true,
        categoryKey: 'corporate',
        category: 'Corporate',
        tag: 'Corporate',
        kicker: 'Shareholder Brief',
        title: 'Dividend SDC at 5%: Distribution Planning, Non-Dom Boundaries and Board Papers',
        excerpt: 'This briefing focuses on the reduced 5% Special Defence Contribution rate on dividends from January 1, 2026 and the checks shareholders should complete before declaring distributions.',
        href: 'thread-dividend-sdc-planning.html',
        summary: 'Dividend planning note on SDC, eligibility checks, and evidence expected before payment dates.',
        sources: 2,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read Dividend Note',
        gradient: 'linear-gradient(135deg, #177e89, #8fc0a9)',
        keywordChips: ['Cyprus dividend tax 5%', 'Cyprus non-dom dividend planning']
    },
    {
        id: 'salary-reform',
        primary: true,
        categoryKey: 'individual',
        category: 'Individuals',
        tag: 'Individuals',
        kicker: 'Income Tax Reform',
        title: 'Cyprus Personal Tax Guide 2026: EUR 22,000 Threshold, Bands and Filing Scope',
        excerpt: 'A practical guide to the Cyprus personal income tax package effective from January 1, 2026, including the EUR 22,000 tax-free threshold, updated bands and wider filing questions.',
        href: 'thread-salary-threshold-examples.html',
        summary: 'Individual tax briefing on salary bands, filing coverage, and employee documentation points.',
        sources: 4,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read Salary Guide',
        gradient: 'linear-gradient(135deg, #516395, #614385)',
        keywordChips: ['Cyprus salary tax calculator 2026', 'Cyprus tax free threshold 22000']
    },
    {
        id: 'filing-scope-check',
        primary: true,
        categoryKey: 'individual',
        category: 'Individuals',
        tag: 'Individuals',
        kicker: 'Compliance Reality Check',
        title: 'Cyprus Filing Scope Reality Check 2026: Who Must File and What to Document',
        excerpt: 'A practical map of 2026 filing scope triggers, including the resident age 25 to 71 condition, residency tests and document controls that prevent avoidable compliance misses.',
        href: 'thread-filing-scope-reality-check.html',
        summary: 'Individual compliance briefing on filing-scope triggers, residency tests, and document controls.',
        sources: 3,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read Filing Guide',
        gradient: 'linear-gradient(135deg, #355070, #6d597a)',
        keywordChips: ['Cyprus filing obligation 2026', 'Cyprus tax resident 25 to 71']
    },
    {
        id: 'crypto-framework',
        primary: false,
        categoryKey: 'incentives',
        category: 'Incentives',
        tag: 'Incentives',
        kicker: 'Digital Assets',
        title: 'Crypto Gains at 8%: Cyprus Recordkeeping, Disposal Timing and Evidence',
        excerpt: 'A compliance-first briefing on the 8% tax treatment for gains from disposal of crypto assets under the January 2026 tax incentives package, with more focus on evidence than headlines.',
        href: 'thread-crypto-disposal-evidence.html',
        summary: 'Crypto tax note focused on disposal evidence, wallet trails, and valuation discipline.',
        sources: 2,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read Crypto Note',
        gradient: 'linear-gradient(135deg, #f4a261, #e9c46a)',
        keywordChips: ['Cyprus crypto tax 8%', 'Cyprus crypto disposal evidence']
    },
    {
        id: 'relief-docs',
        primary: false,
        categoryKey: 'individual',
        category: 'Individuals',
        tag: 'Individuals',
        kicker: 'Deduction Checklist',
        title: 'Housing, Children and TD59 Support: What Payroll Files Should Keep',
        excerpt: 'A working checklist for taxpayers and payroll teams tracking the support behind child deductions, housing loan interest, rent and other TD59-linked claims under the 2026 package.',
        href: 'thread-housing-family-relief-docs.html',
        summary: 'Deduction checklist for TD59 support files and year-end payroll reconciliation.',
        sources: 3,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Open Checklist',
        gradient: 'linear-gradient(135deg, #b56576, #e56b6f)',
        keywordChips: ['Cyprus family tax relief 2026', 'Cyprus housing deduction documents']
    },
    {
        id: 'startup-options',
        primary: false,
        categoryKey: 'incentives',
        category: 'Incentives',
        tag: 'Incentives',
        kicker: 'Employer Incentives',
        title: 'Cyprus Tax Incentives 2026: NID, IP Box, Securities and Startup Planning',
        excerpt: 'A founder and finance-team guide to the January 2026 incentives package, including the current references to NID, the IP box, securities gains and practical startup planning.',
        href: 'thread-startup-stock-options-8.html',
        summary: 'Incentives note on what the official January 2026 package actually lists and how founders should read it.',
        sources: 2,
        updated: 'May 2, 2026',
        updatedIso: '2026-05-02',
        cta: 'Read Incentives Note',
        gradient: 'linear-gradient(135deg, #264653, #2a9d8f)',
        keywordChips: ['Cyprus tax incentives 2026', 'Cyprus NID IP box securities exemption']
    }
];

function getPrimaryThreads() {
    return THREAD_CATALOG.filter(thread => thread.primary !== false);
}

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
    if (!path) return SITE_CANONICAL_HOME;
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
        getPrimaryThreads().flatMap(thread => [
            `${thread.category} tax Cyprus`,
            ...(thread.keywordChips || [])
        ])
    )).slice(0, 10);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_CANONICAL_HOME}#briefings`,
        name: 'Cyprus Tax and Accounting Briefings 2026',
        url: SITE_CANONICAL_HOME,
        inLanguage: 'en',
        dateModified,
        about: aboutTerms.map(term => ({ '@type': 'Thing', name: term })),
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: getPrimaryThreads().map((thread, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: thread.title,
                url: toCanonicalUrl(thread.href)
            }))
        }
    };

    upsertJsonLdScript(BRIEFING_COLLECTION_JSONLD_ID, schema);
}

function getKeywordChipEntriesFromCatalog() {
    const seen = new Set();
    const chips = [];

    getPrimaryThreads().forEach(thread => {
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
    return [...getPrimaryThreads()]
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
        'Cyprus tax guide 2026',
        'tax Cyprus',
        'Cyprus tax',
        'Cyprus tax calculator 2026',
        'Cyprus tax update 2026',
        'Cyprus tax news',
        ...getPrimaryThreads().flatMap(thread => thread.keywordChips || [])
    ]));

    const keywordsValue = keywordPool.slice(0, 14).join(', ');
    const newsKeywordsValue = keywordPool.slice(0, 8).join(', ');

    if (keywordsMeta) keywordsMeta.setAttribute('content', keywordsValue);
    if (newsKeywordsMeta) newsKeywordsMeta.setAttribute('content', newsKeywordsValue);
}

function renderTrendingThreads() {
    const grid = document.getElementById('trending-grid');
    if (!grid) return;

    const topThreads = [...getPrimaryThreads()]
        .sort((a, b) => new Date(b.updatedIso) - new Date(a.updatedIso) || b.sources - a.sources)
        .slice(0, 3);

    grid.innerHTML = topThreads.map((thread, index) => `
        <article class="trending-card">
            <p class="trending-rank">#${index + 1}</p>
            <p class="trending-cat">${thread.category}</p>
            <h3 class="trending-title">${thread.title}</h3>
            <p class="trending-meta">
                <span class="trending-pill">${thread.sources} source refs</span>
                <span class="trending-pill">Updated ${thread.updated}</span>
            </p>
            <a href="${thread.href}" class="trending-link">Open Briefing</a>
        </article>
    `).join('');
}

function renderForumStatsFromCatalog() {
    const statThreads = document.getElementById('statTrackedThreads');
    const statReplies = document.getElementById('statCommunityReplies');
    const statChannels = document.getElementById('statForumChannels');
    const statLatest = document.getElementById('statLatestUpdate');

    const primaryThreads = getPrimaryThreads();
    const totalThreads = primaryThreads.length;
    const totalReplies = primaryThreads.reduce((sum, thread) => sum + (thread.sources || 0), 0);
    const totalChannels = new Set(primaryThreads.map(thread => thread.categoryKey)).size;
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

// --- 1. SALARY CALCULATOR LOGIC ---
function calculateSalary() {
    // 1. Get Base Inputs
    const gross = parseFloat(document.getElementById('grossSalary').value);
    if (!gross || gross < 0) return;

    // 2. Social deductions used by the estimator.
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
        // 2026 progressive brackets from the current reform material.
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
            noteElement.innerText = "*Calculated with the 2026 published brackets plus estimator assumptions for employee SI and GESY. Use annual figures and confirm deduction eligibility before relying on the result.";
        }
    } else {
        // 2025 progressive brackets.
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
            noteElement.innerText = "*Calculated with the 2025 baseline brackets plus estimator assumptions for employee SI and GESY.";
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

    // 2025 baseline
    const corpTax25 = profit * 0.125;
    const afterCorp25 = profit - corpTax25;
    const divTax25 = afterCorp25 * 0.17;
    const net25 = afterCorp25 - divTax25;

    // 2026 reform scenario
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
        verdictDiv.innerText = `This simplified comparison shows €${formatMoney(diff)} more post-tax cash than the 2025 baseline. It assumes a Cyprus-domiciled shareholder and no special exemptions.`;
        verdictDiv.classList.add('verdict-positive');
    } else if (diff < 0) {
        verdictDiv.innerText = `This simplified comparison shows €${formatMoney(Math.abs(diff))} less post-tax cash than the 2025 baseline. It assumes a Cyprus-domiciled shareholder and no special exemptions.`;
        verdictDiv.classList.add('verdict-negative');
    } else {
        verdictDiv.innerText = "No net difference appears between the 2025 baseline and this simplified 2026 reform scenario.";
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

function getStoredTimestamp(key) {
    try {
        const value = localStorage.getItem(key);
        const number = Number(value);
        return Number.isFinite(number) ? number : 0;
    } catch (_) {
        return 0;
    }
}

function setStoredTimestamp(key, timestamp) {
    try {
        localStorage.setItem(key, String(timestamp));
    } catch (_) {
        // Ignore storage failures.
    }
}

function isPromptSnoozed(key) {
    return getStoredTimestamp(key) > Date.now();
}

function snoozePromptForDays(key, days) {
    const until = Date.now() + (days * 24 * 60 * 60 * 1000);
    setStoredTimestamp(key, until);
}

function isRunningStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
}

function isIosSafariBrowser() {
    const ua = window.navigator.userAgent || '';
    const isIos = /iPad|iPhone|iPod/.test(ua);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
    return isIos && isSafari;
}

function removePwaPrompt() {
    if (!pwaInstallPromptElement) return;
    pwaInstallPromptElement.remove();
    pwaInstallPromptElement = null;
}

function createPwaPrompt(options) {
    const { title, message, primaryLabel, secondaryLabel, onPrimary, onSecondary } = options;
    const prompt = document.createElement('aside');
    prompt.className = 'pwa-install-prompt';
    prompt.setAttribute('role', 'dialog');
    prompt.setAttribute('aria-live', 'polite');

    const copy = document.createElement('div');
    copy.className = 'pwa-install-copy';

    const titleEl = document.createElement('p');
    titleEl.className = 'pwa-install-title';
    titleEl.textContent = title;

    const messageEl = document.createElement('p');
    messageEl.className = 'pwa-install-message';
    messageEl.textContent = message;

    copy.appendChild(titleEl);
    copy.appendChild(messageEl);

    const actions = document.createElement('div');
    actions.className = 'pwa-install-actions';

    if (secondaryLabel) {
        const secondaryButton = document.createElement('button');
        secondaryButton.type = 'button';
        secondaryButton.className = 'pwa-btn pwa-btn-secondary';
        secondaryButton.textContent = secondaryLabel;
        secondaryButton.addEventListener('click', onSecondary);
        actions.appendChild(secondaryButton);
    }

    if (primaryLabel) {
        const primaryButton = document.createElement('button');
        primaryButton.type = 'button';
        primaryButton.className = 'pwa-btn pwa-btn-primary';
        primaryButton.textContent = primaryLabel;
        primaryButton.addEventListener('click', onPrimary);
        actions.appendChild(primaryButton);
    }

    prompt.appendChild(copy);
    prompt.appendChild(actions);
    return prompt;
}

function showBrowserInstallPrompt() {
    if (!deferredInstallPromptEvent || pwaInstallPromptElement) return;
    if (isRunningStandalone() || isPromptSnoozed(PWA_INSTALL_DISMISS_UNTIL_KEY)) return;

    pwaInstallPromptElement = createPwaPrompt({
        title: 'Install TaxInfo as an app',
        message: 'Get faster access from your home screen and open the site like a native app.',
        primaryLabel: 'Install',
        secondaryLabel: 'Later',
        onPrimary: async () => {
            if (!deferredInstallPromptEvent) return;
            const promptEvent = deferredInstallPromptEvent;
            promptEvent.prompt();
            const choice = await promptEvent.userChoice;
            deferredInstallPromptEvent = null;
            removePwaPrompt();
            if (choice && choice.outcome !== 'accepted') {
                snoozePromptForDays(PWA_INSTALL_DISMISS_UNTIL_KEY, PWA_INSTALL_SNOOZE_DAYS);
            }
        },
        onSecondary: () => {
            snoozePromptForDays(PWA_INSTALL_DISMISS_UNTIL_KEY, PWA_INSTALL_SNOOZE_DAYS);
            removePwaPrompt();
        }
    });

    document.body.appendChild(pwaInstallPromptElement);
}

function showIosInstallHint() {
    if (!isIosSafariBrowser() || isRunningStandalone() || pwaInstallPromptElement) return;
    if (isPromptSnoozed(PWA_IOS_HINT_DISMISS_UNTIL_KEY)) return;

    pwaInstallPromptElement = createPwaPrompt({
        title: 'Add TaxInfo to your home screen',
        message: 'In Safari, tap Share and then choose Add to Home Screen for app-style access.',
        primaryLabel: null,
        secondaryLabel: 'Dismiss',
        onSecondary: () => {
            snoozePromptForDays(PWA_IOS_HINT_DISMISS_UNTIL_KEY, PWA_IOS_HINT_SNOOZE_DAYS);
            removePwaPrompt();
        }
    });

    document.body.appendChild(pwaInstallPromptElement);
}

function initPwaInstallPrompt() {
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredInstallPromptEvent = event;
        showBrowserInstallPrompt();
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPromptEvent = null;
        removePwaPrompt();
    });

    window.setTimeout(() => {
        if (!deferredInstallPromptEvent) {
            showIosInstallHint();
        }
    }, 1800);
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (window.location.protocol !== 'https:' && !isLocalhost) return;

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').catch(() => {
            // Silent fallback for unsupported/private contexts.
        });
    });
}

// --- TAX CALENDAR LOGIC ---
function initCalendar() {
    const deadlines = [
        { date: "2026-03-31", title: "PAYE July-December 2025 submissions" },
        { date: "2026-05-31", title: "Annual PAYE withholding return for 2025" },
        { date: "2026-07-31", title: "1st Provisional Tax Installment" },
        { date: "2026-12-31", title: "2nd Provisional Tax Installment" }
    ];

    const today = new Date();
    const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const displayBox = document.getElementById("next-deadline-title");
    const daysBox = document.getElementById("days-left");

    // Only run if calendar elements exist (e.g. index.html)
    if (!displayBox || !daysBox) return;

    const next = deadlines.find(d => new Date(`${d.date}T00:00:00`) >= todayAtMidnight);

    if (next) {
        const diffTime = Math.abs(new Date(`${next.date}T00:00:00`) - todayAtMidnight);
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

    grid.innerHTML = getPrimaryThreads().map(thread => `
        <article class="news-card" data-category="${thread.categoryKey}" data-thread-id="${thread.id}">
            <div class="news-img" style="background: ${thread.gradient};">
                <span class="news-tag">${thread.tag}</span>
            </div>
            <div class="news-content">
                <p class="news-kicker">${thread.kicker}</p>
                <h3 class="news-title">${thread.title}</h3>
                <p class="news-excerpt">${thread.excerpt}</p>
                <p class="forum-meta"><span class="forum-pill">${thread.sources} source refs</span><span
                        class="forum-pill">Updated ${thread.updated}</span></p>
                <a href="${thread.href}" class="read-more">${thread.cta}</a>
            </div>
        </article>
    `).join('');
}

function renderThreadDirectory() {
    const list = document.getElementById('thread-directory-list');
    if (!list) return;

    const sortedThreads = [...getPrimaryThreads()].sort((a, b) => new Date(b.updatedIso) - new Date(a.updatedIso) || b.sources - a.sources);

    list.innerHTML = sortedThreads.map(thread => `
        <article class="thread-directory-card">
            <p class="thread-directory-cat">${thread.category}</p>
            <h3 class="thread-directory-title">${thread.title}</h3>
            <p class="thread-directory-summary">${thread.summary}</p>
            <p class="thread-directory-meta">
                <span class="thread-directory-pill">${thread.sources} source refs</span>
                <span class="thread-directory-pill">Updated ${thread.updated}</span>
            </p>
            <a class="thread-directory-link" href="${thread.href}">Open Briefing</a>
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
    const input = getSearchInputElement();
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

function getSearchInputElement() {
    return document.querySelector('[data-search-input]') || document.getElementById('searchInput');
}

function getCalculatorShortcutTarget() {
    return document.querySelector('[data-calculator-toggle]') ||
        document.getElementById('tab-salary') ||
        document.querySelector('.tab-btn');
}

document.addEventListener('DOMContentLoaded', () => {
    registerServiceWorker();
    initPwaInstallPrompt();
    initCalendar();
    initSmoothScroll();
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

    enhancePrintability();
    generateTableOfContents();
    estimateReadingTime();
    initTableSorting();

    const searchInput = getSearchInputElement();
    if (searchInput) {
        const hint = document.createElement('small');
        hint.className = 'keyboard-hint';
        hint.innerHTML = '<kbd>Ctrl+K</kbd> to search';
        searchInput.parentElement.appendChild(hint);
    }
});

// ========================================
// ENHANCED PROFESSIONAL FEATURES
// ========================================

// Smooth scroll behavior for anchor links (only run in browser)
function initSmoothScroll() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Print-friendly enhancements
function enhancePrintability() {
    const printBtn = document.querySelector('[data-print-article]');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

// Table of contents generator for long articles
function generateTableOfContents() {
    const article = document.querySelector('article');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 3) return;

    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>In This Article</h3><ul></ul>';
    const list = toc.querySelector('ul');

    let headingId = 0;
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = `heading-${headingId++}`;
        }
        const level = parseInt(heading.tagName[1]);
        const li = document.createElement('li');
        li.className = `toc-level-${level}`;
        li.innerHTML = `<a href="#${heading.id}">${heading.textContent}</a>`;
        list.appendChild(li);
    });

    if (list.children.length > 0) {
        article.insertBefore(toc, article.firstChild);
    }
}

// Reading time estimator
function estimateReadingTime() {
    const article = document.querySelector('article');
    if (!article) return null;

    const text = article.innerText;
    const wordCount = text.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    const badge = document.createElement('span');
    badge.className = 'reading-time-badge';
    badge.textContent = `${readingTimeMinutes} min read`;

    const header = article.querySelector('header, .thread-post-head');
    if (header) {
        header.appendChild(badge);
    }

    return readingTimeMinutes;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'k':
            case 'K':
                e.preventDefault();
                const searchInput = getSearchInputElement();
                if (searchInput) searchInput.focus();
                break;
            case '/':
                e.preventDefault();
                const calculator = getCalculatorShortcutTarget();
                if (calculator) calculator.click();
                break;
        }
    }
});

// Improved table sorting
function initTableSorting() {
    document.querySelectorAll('table[data-sortable]').forEach(table => {
        const headers = table.querySelectorAll('thead th');
        headers.forEach((header, index) => {
            if (header.getAttribute('data-sortable') !== 'false') {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => sortTable(table, index));
            }
        });
    });
}

function sortTable(table, columnIndex) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    if (!rows.length) return;
    const isNumeric = !isNaN(parseFloat(rows[0].children[columnIndex].textContent));

    rows.sort((a, b) => {
        const aVal = a.children[columnIndex].textContent.trim();
        const bVal = b.children[columnIndex].textContent.trim();

        if (isNumeric) {
            return parseFloat(aVal) - parseFloat(bVal);
        }
        return aVal.localeCompare(bVal);
    });

    rows.forEach(row => table.querySelector('tbody').appendChild(row));
}

