
function testFormatMoney() {
  console.log("Running tests for formatMoney...");

  // Test case 1: Integer
  let result = formatMoney(12345);
  console.assert(result === "12,345", "Test Case 1 Failed: Integer");

  // Test case 2: Number with decimals
  result = formatMoney(12345.67);
  console.assert(result === "12,346", "Test Case 2 Failed: Number with decimals");

  // Test case 3: Zero
  result = formatMoney(0);
  console.assert(result === "0", "Test Case 3 Failed: Zero");

  // Test case 4: Large number
  result = formatMoney(1000000);
  console.assert(result === "1,000,000", "Test Case 4 Failed: Large number");

  console.log("Tests for formatMoney finished.");
}

testFormatMoney();
