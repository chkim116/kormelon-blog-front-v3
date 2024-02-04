export function calcTotalPage(total: number, per: number) {
  return Math.ceil(total / per);
}
