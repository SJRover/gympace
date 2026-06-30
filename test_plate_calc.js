// Verification Script: GymPace Barbell Plate Calculator Greedy Algorithm

function calculatePlates(target, barWeight = 45) {
  const remainder = target - barWeight;
  if (remainder <= 0) {
    return [];
  }

  const weightPerSide = remainder / 2;
  const availablePlates = [
    { weight: 45, name: "45 lb" },
    { weight: 35, name: "35 lb" },
    { weight: 25, name: "25 lb" },
    { weight: 10, name: "10 lb" },
    { weight: 5,  name: "5 lb" },
    { weight: 2.5,name: "2.5 lb" }
  ];

  let remainingWeight = weightPerSide;
  const loadedPlates = [];

  availablePlates.forEach(plate => {
    const qty = Math.floor(remainingWeight / plate.weight);
    if (qty > 0) {
      loadedPlates.push({ weight: plate.weight, qty: qty });
      remainingWeight -= qty * plate.weight;
    }
  });

  return loadedPlates;
}

// Test Cases
const testCases = [
  { target: 135, bar: 45, expected: [{ weight: 45, qty: 1 }] }, // 1x45 on each side
  { target: 225, bar: 45, expected: [{ weight: 45, qty: 2 }] }, // 2x45 on each side
  { target: 95,  bar: 45, expected: [{ weight: 25, qty: 1 }] }, // 1x25 on each side
  { target: 185, bar: 45, expected: [{ weight: 45, qty: 1 }, { weight: 25, qty: 1 }] }, // 1x45 + 1x25 on each side
  { target: 245, bar: 45, expected: [{ weight: 45, qty: 2 }, { weight: 10, qty: 1 }] }  // 2x45 + 1x10 on each side
];

console.log("Starting Barbell Plate Calculator Verification...");
let passed = 0;

testCases.forEach((tc, idx) => {
  const result = calculatePlates(tc.target, tc.bar);
  
  // Compare result with expected
  const isMatch = result.length === tc.expected.length && result.every((item, i) => {
    return item.weight === tc.expected[i].weight && item.qty === tc.expected[i].qty;
  });

  if (isMatch) {
    console.log(`✅ Test Case ${idx + 1} passed: Target ${tc.target} lbs -> Loaded: ${JSON.stringify(result)}`);
    passed++;
  } else {
    console.error(`❌ Test Case ${idx + 1} FAILED! Target ${tc.target} lbs -> Got: ${JSON.stringify(result)}, Expected: ${JSON.stringify(tc.expected)}`);
  }
});

if (passed === testCases.length) {
  console.log("\n🎉 ALL TEST CASES PASSED SUCCESSFULLY!");
  process.exit(0);
} else {
  console.error(`\n⚠️ ${testCases.length - passed} test case(s) failed.`);
  process.exit(1);
}
