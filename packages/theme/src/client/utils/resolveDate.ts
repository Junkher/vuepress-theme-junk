export const resolveDate = (date: string | number | Date): string => {
  const ymd = new Date(date)
  return ymd.getFullYear() + '-' + (ymd.getMonth() + 1) + '-' + ymd.getDate()
}
