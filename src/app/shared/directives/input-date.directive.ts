import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputDate]'
})
export class InputDateDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('focus', ['$event']) onFocus(event) {
    this._el.nativeElement.type = 'date';
    this._el.nativeElement.focus();
    this._el.nativeElement.click();
  }

  @HostListener('blur', ['$event']) onBlur(event) {
    if (this._el.nativeElement.value === '') {
      this._el.nativeElement.type = 'text';
    }
  }
}
