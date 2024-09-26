// Initialize the number of flips to 0
let flips = 0;

// Initialize the variable to track if the coin landed on heads
let isHeads = false;

// Continue flipping the coin until it lands on heads
while (!isHeads) {
  // Increment the flip count by 1 for each flip
  flips++;
  
  // Simulate a coin flip: Math.random() generates a number between 0 and 1
  // If the number is less than 0.5, it represents heads (50% chance)
  isHeads = Math.random() < 0.5;
}

// Output the total number of flips it took to get heads
console.log(`It took ${flips} flips to land on heads.`);
