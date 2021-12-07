import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/packages/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    fade
  ]
})
export class FooterComponent implements OnInit {

  /** 載入中 */
  public isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {

    // 延遲顯示
    setTimeout(() => { this.isLoading = false }, 1000);
  }

}
