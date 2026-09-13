const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function calculator(values = {}) {
    const elements = new Map();
    const el = id => {
        if (!elements.has(id)) elements.set(id, { value: '', checked: false, innerText: '', textContent: '',
            setAttribute() {}, focus() {}, classList: { add() {}, remove() {} } });
        return elements.get(id);
    };
    for (const [id, value] of Object.entries(values)) {
        if (typeof value === 'boolean') el(id).checked = value;
        else el(id).value = String(value);
    }
    const context = { console, Intl, Date, setTimeout, clearTimeout,
        document: { addEventListener() {}, getElementById: el } };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync('script.js', 'utf8'), context);
    context.updateChart = async () => {};
    return { context, el };
}
test('year-specific salary caps and GESY ceiling', () => {
    const {context,el} = calculator({grossSalary:200000,taxYear:2026});
    context.calculateSalary();
    assert.equal(el('outSocial').innerText, '€10,834');
    el('taxYear').value='2025'; context.calculateSalary();
    assert.equal(el('outSocial').innerText, '€10,632');
});
test('2026 family deductions use shared housing cap and correct fourth/fifth child amounts', () => {
    const {context,el} = calculator({grossSalary:60000,taxYear:2026,advancedModeToggle:true,deductionEligibility:true,
        childrenCount:4,housingInterest:2000,rentDeduction:2000,greenDeduction:1000,ir59Deductions:0});
    context.calculateSalary();
    // 60,000 - 6,870 social - 5,250 children - 2,000 housing/rent - 1,000 green = 44,880.
    assert.equal(el('outTax').innerText,'€5,364');
    el('childrenCount').value='5'; context.calculateSalary();
    assert.equal(el('outTax').innerText,'€4,914');
    el('taxYear').value='2025'; context.calculateSalary();
    assert.equal(el('outTax').innerText,'€8,824');
});
test('zero clears a previous result and negative/infinite inputs are rejected', () => {
    const {context,el}=calculator({grossSalary:30000,taxYear:2026});
    context.calculateSalary(); el('grossSalary').value='0'; context.calculateSalary();
    assert.equal(el('outNet').innerText,'€0');
    for (const value of ['-1','Infinity','']) {
        el('grossSalary').value=value; context.calculateSalary();
        assert.match(el('salaryError').textContent,/Enter an amount/);
    }
});
test('negative deduction cannot increase tax or leave a visible stale result',()=>{
    const {context,el}=calculator({grossSalary:60000,taxYear:2026,advancedModeToggle:true,deductionEligibility:true,housingInterest:-100});
    context.calculateSalary(); assert.match(el('salaryError').textContent,/Enter an amount/);
});
test('business comparison is based on profit before corporation tax',()=>{
    const {context,el}=calculator({profitInput:100000}); context.calculateBusiness();
    assert.equal(el('net25').innerText,'72,625'); assert.equal(el('net26').innerText,'80,750');
    el('profitInput').value='0';context.calculateBusiness();assert.equal(el('net26').innerText,'0');
});
test('calendar selects chronological dates regardless of input order',()=>{
    const {context}=calculator();
    const dates=[{date:'2026-09-30'},{date:'2026-07-31'},{date:'2026-12-31'}];
    assert.equal(context.getNextDeadline(dates,'2026-07-01').date,'2026-07-31');
    assert.equal(context.getNextDeadline(dates,'2026-09-30').date,'2026-09-30');
    assert.equal(context.getNextDeadline(dates,'2027-01-01'),undefined);
});
test('lazy-loaded chart renders with its real callback path',async()=>{
    const {context,el}=calculator();
    vm.runInContext(fs.readFileSync('script.js','utf8').match(/async function updateChart[\s\S]*?(?=function multiplyBy12)/)[0],context);
    el('taxChart').getContext=()=>({});
    let options;
    context.Chart=function(_ctx, config){ options=config; };
    context.loadChartJsIfNeeded=async()=>true;
    await context.updateChart(20000,1000,3000);
    assert.equal(options.type,'doughnut');
    assert.equal(options.data.datasets[0].data.join(','),'20000,1000,3000');
});
test('publisher code is limited to editorial pages and ad requests remain paused',()=>{
    assert.equal(fs.readFileSync('ads.txt','utf8').trim(),'google.com, pub-6942670124765473, DIRECT, f08c47fec0942fa0');
    for (const file of fs.readdirSync('.').filter(f=>f.endsWith('.html')&&!f.startsWith('google'))) {
        const html=fs.readFileSync(file,'utf8');
        assert.equal((html.match(/name="google-adsense-account"/g)||[]).length,1,file);
        const eligible = file.startsWith('thread-') || ['index.html','cyprus-tax-guide-2026.html','resources.html','september-2026-developments.html'].includes(file);
        assert.equal((html.match(/pagead\/js\/adsbygoogle.js/g)||[]).length,eligible ? 1 : 0,file);
        if (eligible) {
            assert.ok(html.indexOf('pauseAdRequests = 1') < html.indexOf('pagead/js/adsbygoogle.js'),file);
            assert.ok(html.includes('client=ca-pub-6942670124765473'),file);
        }
        assert.ok(!html.includes('unsafe-eval'),file);
    }
});

test('first-employment relief stops estimation until deduction interactions are verified',()=>{
    const {context,el}=calculator({grossSalary:60000,taxYear:2026,advancedModeToggle:true,deductionEligibility:true,expatExemption:true});
    context.calculateSalary();
    assert.match(el('salaryError').textContent,/individual calculation/);
    assert.equal(el('outNet').innerText,'');
});
