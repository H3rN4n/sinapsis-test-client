import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';

export interface ThumbsResult {
  date: Date;
  title: string;
  files: ThumbsResultFiles[];
}

export interface ThumbsResultFiles {
  name: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  isLoading: boolean;
  data: any;

  // Components UX steps list:
  //  selecting-file
  //  cropping-image
  //  previewing-cropped-image
  //  uploading-cropped-image

  step: string;
  cropperSettings: CropperSettings;

  //thumbs list
  thumbs: ThumbsResult[];

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
    this.thumbs = [];
    this.step = 'selecting-file';
  }

  onFilesAdded(files: File[]) {
    // var image:any = new Image();
    var image: any = new Image();

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;

        // this content string could be used as an image source
        // or be uploaded to a webserver via HTTP.
      };

      reader.onloadend = (loadEvent: any) => {
        this.step = 'cropping-image';
        image.src = loadEvent.target.result;
        this.cropper.setImage(image);
      };

      // use this for basic text files like .txt or .csv
      // reader.readAsText(file);

      // use this for images
      reader.readAsDataURL(file);
    });
  }

  ngOnInit() {}

  uploadCroppedImage() {
    this.step = 'uploading-cropped-image';

    //TODO: USE RXJS
    const thumbsResult = {
      date: new Date(),
      title: 'New Thumbs',
      files: [
        {
          name: 'Original',
          url: 'https://cdn.newsapi.com.au/image/v1/67a523605bca40778c6faaad93883a3b'
        },
        {
          name: '320x320',
          url: 'https://cdn.newsapi.com.au/image/v1/67a523605bca40778c6faaad93883a3b'
        },
        {
          name: '160x120',
          url: 'https://cdn.newsapi.com.au/image/v1/67a523605bca40778c6faaad93883a3b'
        },
        {
          name: '120x120',
          url: 'https://cdn.newsapi.com.au/image/v1/67a523605bca40778c6faaad93883a3b'
        }
      ]
    };

    setTimeout(() => {
      console.log(this.thumbs)
      this.thumbs.push(thumbsResult);
      this.step = 'selecting-file';
    }, 500);
  }
}
