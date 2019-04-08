import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxsModule } from '@ngxs/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-img-cropper';
import { WebcamModule } from 'ngx-webcam';

import { HomeComponent } from './home.component';
import { HomeState } from './home.state';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    NgxDropzoneModule,
    NgxsModule.forFeature([HomeState]),
    ImageCropperModule,
    WebcamModule
  ],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
