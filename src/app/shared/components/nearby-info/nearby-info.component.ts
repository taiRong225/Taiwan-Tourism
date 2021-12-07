import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby-info',
  templateUrl: './nearby-info.component.html',
  styleUrls: ['./nearby-info.component.css']
})
export class NearbyInfoComponent implements OnInit {

  /** 代碼 */
  @Input() ID: string;

  /** 觀光類型 */
  @Input() TourismType: TourismType;

  constructor() { }

  ngOnInit(): void { }

  /**
   * 動態路由
   *
   * @readonly
   * @memberof NearbyInfoComponent
   */
  get routerLinkPath() {
    return `/${this.TourismType}`;
  }

  /**
   * 滑鼠滑入事件
   *
   * @param {MouseEvent} event 事件
   * @memberof NearbyInfoComponent
   */
  mouseenter(event: MouseEvent) {
    const eventTarget: HTMLLinkElement = <HTMLLinkElement>event.target;
    const imgTarget: HTMLImageElement = <HTMLImageElement>eventTarget.childNodes[0];
    const change: string = imgTarget.dataset.change;
    imgTarget.src = change;
  }

  /**
   * 滑鼠滑出事件
   *
   * @param {MouseEvent} event 事件
   * @memberof NearbyInfoComponent
   */
  mouseleave(event: MouseEvent) {
    const eventTarget: HTMLLinkElement = <HTMLLinkElement>event.target;
    const imgTarget: HTMLImageElement = <HTMLImageElement>eventTarget.childNodes[0];
    const original: string = imgTarget.dataset.original;
    imgTarget.src = original;
  }
}
