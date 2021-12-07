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

/**
 * 滾動到元素
 *
 * @export
 * @param {HTMLElement} el 元素
 */
export function scrollToElement(el: HTMLElement) {
    // scrollIntoView() 方法讓當前的元素滾動到瀏覽器窗口的可視區域內 true:頂端對齊
    if (el) el.scrollIntoView(true);
}