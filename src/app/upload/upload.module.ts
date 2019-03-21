import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtDragUploadDirective } from './at-drag-upload.directive';
import { AtUploadListDirective } from './at-upload-list.directive';
import { AtUploadComponent } from './at-upload/at-upload.component';
import { AtImagePreviewDirective } from './image-preview.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [AtUploadComponent, AtUploadListDirective],
  declarations: [AtUploadComponent, AtUploadListDirective, AtImagePreviewDirective, AtDragUploadDirective]
})
export class AtUploadModule {
}
