/**
 * 取得隨機亂數
 *
 * @export
 * @param {number} num 範圍數
 * @return {*}
 */
export function getRandom(num: number) {
    return Math.floor(Math.random() * num);
}