module.exports = iter;
function iter(n) {
  let current = 0;
  let next = null;
  let swap = null;
  for (var i = 0; i < n; i++) {
    swap = current, current = next;
    next = swap + next;
  }
  return current;
}