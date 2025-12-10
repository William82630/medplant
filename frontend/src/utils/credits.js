// ========================================
// Anonymous Credit System for Guest Users
// ========================================

// Get today's date (yyyy-mm-dd)
function todayKey() {
  return new Date().toISOString().split("T")[0];
}

// Load anonymous credits (10 per day)
export function getAnonCredits() {
  const stored = localStorage.getItem("anonCredits");
  const date = localStorage.getItem("anonCreditsDate");

  // If new day → reset to 10
  if (date !== todayKey()) {
    localStorage.setItem("anonCredits", "10");
    localStorage.setItem("anonCreditsDate", todayKey());
    return 10;
  }

  return stored ? Number(stored) : 10;
}

// Deduct 1 credit
export function useAnonCredit() {
  let credits = getAnonCredits();
  credits = Math.max(credits - 1, 0);
  localStorage.setItem("anonCredits", String(credits));
  return credits;
}

// How many credits have been used?
export function anonUsedCount() {
  return 10 - getAnonCredits();
}
