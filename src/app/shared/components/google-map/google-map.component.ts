import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  /** ε°ε */
  @Input() address: string;

  constructor() { }

  ngOnInit(): void { }

  /**
   * εεΎ Google Map URL
   *
   * @readonly
   * @memberof GoogleMapComponent
   */
  get googleMapUrl() {
    return `https://www.google.com/maps?q=${this.address}&output=embed`;
  }
}
