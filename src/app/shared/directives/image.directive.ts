import { Directive, ElementRef, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective {

  @Input() placeholder?: string;
  @Input() src?: string;

  constructor(private imageRef: ElementRef) {
    this.placeholder = this.placeholder || environment.noImage250x200
  }

  ngAfterViewInit(): void {

    // Set a placeholder image
    this.setImage(this.placeholder);

    // Creates a new HTMLImageElement instance
    const img = new Image();

    // Image Load Finish
    img.onload = () => {
      this.setImage(this.src);
    };

    // Image Load Error
    img.onerror = () => {
      console.log('image load failed');
    };

    img.src = this.src;
  }

  /**
   * 設置圖片路徑
   *
   * @private
   * @param {string} src 來源路徑
   * @memberof ImageDirective
   */
  private setImage(src: string) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }
}
