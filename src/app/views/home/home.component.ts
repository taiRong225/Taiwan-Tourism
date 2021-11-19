import { Component, OnInit } from '@angular/core';
import { RequestBase } from 'src/app/models/request.model';
import { Spots } from 'src/app/models/spots.model';
import { SpotsService } from 'src/app/services/spots.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /** 景點列表 */
  public spotsList: Spots[] = [];

  constructor(private spotsService: SpotsService) { }

  ngOnInit(): void {

    // 取得景點
    this.getSpotsList();
  }

  /**
   * 取得景點
   *
   * @memberof HomeComponent
   */
  getSpotsList() {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: 4
    }
    this.spotsService.getSpotsList(options).subscribe(data => this.spotsList = data);
  }
}
