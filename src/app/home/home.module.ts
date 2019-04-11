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
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { ThumbsListComponent } from './thumbs-list/thumbs-list.component';
import { ThumbsListItemComponent } from './thumbs-list-item/thumbs-list-item.component';

import { HomeState } from './home.state';
import { HomeService } from './home.service';

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
    WebcamModule,
    FormsModule
  ],
  declarations: [HomeComponent, ThumbsListComponent, ThumbsListItemComponent],
  providers: [HomeService]
})
export class HomeModule {}
