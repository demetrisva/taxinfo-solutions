const assert = require('node:assert/strict');

function runFormatMoneyAssertions(formatMoneyFn) {
  console.log('Running tests for formatMoney...');

  assert.equal(formatMoneyFn(12345), '12,345', 'Integer formatting');
  assert.equal(formatMoneyFn(12345.67), '12,346', 'Decimal rounding');
  assert.equal(formatMoneyFn(0), '0', 'Zero formatting');
  assert.equal(formatMoneyFn(1000000), '1,000,000', 'Large number formatting');

  console.log('Tests for formatMoney finished.');
}

function runBrowserPath() {
  if (typeof window === 'undefined') return false;
  if (typeof window.formatMoney !== 'function') return false;
  runFormatMoneyAssertions(window.formatMoney);
  return true;
}

function loadFormatMoneyFromScriptFile() {
  const fs = require('node:fs');
  const path = require('node:path');
  const vm = require('node:vm');

  const scriptPath = path.join(__dirname, 'script.js');
  const scriptSource = fs.readFileSync(scriptPath, 'utf8');

  const context = {
    console,
    Intl,
    Date,
    setTimeout,
    clearTimeout,
    document: {
      addEventListener() {}
    }
  };

  vm.createContext(context);
  vm.runInContext(scriptSource, context, { filename: 'script.js' });

  if (typeof context.formatMoney !== 'function') {
    throw new Error('formatMoney was not found after loading script.js');
  }

  return context.formatMoney;
}

if (!runBrowserPath()) {
  const formatMoney = loadFormatMoneyFromScriptFile();
  runFormatMoneyAssertions(formatMoney);
}
