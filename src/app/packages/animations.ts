import { transition, trigger, useAnimation } from "@angular/animations";

// 匯入 ngx-animate 套件
import { fadeIn, fadeOut } from "ngx-animate";

/**
 *  淡入淡出
 */
export const fade = trigger('fade', [
    transition(':enter', [useAnimation(fadeIn, { params: { timing: 0.7 } })]),
    transition(':leave', [useAnimation(fadeOut, { params: { timing: 0.7 } })])
]);