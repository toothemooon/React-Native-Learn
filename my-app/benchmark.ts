const iterations = 1000000;

console.log("Benchmarking inline array creation...");
let start = performance.now();
let dummy = 0;
for (let i = 0; i < iterations; i++) {
  const arr = [...Array(11)];
  dummy += arr.length;
}
let end = performance.now();
console.log(`Inline array creation took: ${(end - start).toFixed(2)} ms`);

console.log("Benchmarking pre-allocated array...");
const PRE_ALLOCATED = Array.from({ length: 11 });
start = performance.now();
let dummy2 = 0;
for (let i = 0; i < iterations; i++) {
  const arr = PRE_ALLOCATED;
  dummy2 += arr.length;
}
end = performance.now();
console.log(`Pre-allocated array took: ${(end - start).toFixed(2)} ms`);
