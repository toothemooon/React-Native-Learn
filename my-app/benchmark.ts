import { performance } from 'perf_hooks';

const SOUNDS = [
  { id: '紫金', name: '紫金', locked: false, color: '#A08090' },
  { id: '白玉', name: '白玉', locked: false, color: '#C0D0C0' },
  { id: '檀木', name: '檀木', locked: false, color: '#A07050' },
  { id: '黄铜', name: '黄铜', locked: true, color: '#A09050' },
  { id: '赛博', name: '赛博', locked: true, color: '#5090A0' },
];

const ITERATIONS = 1_000_000;

// Benchmark original
let start = performance.now();
let dummy = '';
for (let i = 0; i < ITERATIONS; i++) {
  for (const s of SOUNDS) {
    dummy = s.name.split('').join('\n');
  }
}
let end = performance.now();
console.log(`Original duration: ${(end - start).toFixed(2)}ms`);

// Pre-compute formatted string
const OPTIMIZED_SOUNDS = SOUNDS.map(s => ({
  ...s,
  formattedName: s.name.split('').join('\n')
}));

start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  for (const s of OPTIMIZED_SOUNDS) {
    dummy = s.formattedName;
  }
}
end = performance.now();
console.log(`Optimized duration: ${(end - start).toFixed(2)}ms`);
