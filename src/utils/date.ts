export function getYearsSince(date: Date): number {
  const now = new Date()
  let years = now.getFullYear() - date.getFullYear()
  const monthDiff = now.getMonth() - date.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
    years--
  }
  return years
}
