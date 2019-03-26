import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'at-upload',
  templateUrl: './at-upload.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AtUploadComponent),
    multi: true
  }]
})
export class AtUploadComponent implements OnInit {

  constructor() {
  }

  @ViewChild('file_input') fileEle: ElementRef;

  @Input() multiple = true;

  @Input() atType = 'text';

  @Output() readonly after_remove: EventEmitter<number> = new EventEmitter();

  preview = false;

  preview_image;

  private _files = [];

  get files(): any[] {
    return this._files;
  }

  set files(value: any[]) {
    this._files = value;
  }

  ngOnInit() {
  }

  previewImage(i) {
    this.preview_image = this.files[i];
    this.preview = true;
  }

  triggerUpload() {
    this.fileEle.nativeElement.click();
  }

  fileChange(event) {
    if (this.multiple) {
      this.files = this.files.concat(Array.prototype.slice.call(event.target.files));
      this.onChange(this.files);
    } else {
      this.files = [].concat(event.target.files[0]);
      this.onChange(this.files[0]);
    }

  }

  removeFile(index: number) {
    this._files.splice(index, 1);
    this.after_remove.emit(index)
  }

  dragFile(files: any) {
    this.files = this.files.concat(files);
  }

  onChange: (value: any) => void = () => null;
  onTouched: () => void = () => null;

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value): void {
    if ((typeof(value) !== 'undefined') && value !== null) {
      this._files = [].concat(value);
    }
  }
}
