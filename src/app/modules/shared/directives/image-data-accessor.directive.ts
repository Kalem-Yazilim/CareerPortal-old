import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Directive({
  selector: '[appImageDataAccessor]',
  host: {
    '(change)': 'onChange($event.target.files)',
    '(blur)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageDataAccessorDirective,
      multi: true,
    },
  ],
})
export class ImageDataAccessorDirective implements ControlValueAccessor {
  private onChange: (value: string) => void;
  private onTouched: () => void;

  constructor(private el: ElementRef) {}

  writeValue(value: any): void {
    if (value) {
      const input = this.el.nativeElement;
      input.value = value;
    }
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    const input = this.el.nativeElement;
    input.disabled = isDisabled;
  }

  @HostListener('change', ['$event.target.files']) onChangeEvent(
    files: FileList
  ) {
    const reader = new FileReader();
    reader.onload = () => {
      const [fileType, base64] = (reader.result as string).split(',');;
      this.onChange(base64);
      this.onTouched();
    };
    reader.readAsDataURL(files[0]);
  }
}
