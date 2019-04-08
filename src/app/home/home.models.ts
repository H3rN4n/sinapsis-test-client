import { CropperSettings } from 'ngx-img-cropper';

export interface ThumbsItem {
  date: Date;
  title: string;
  files: ThumbsItemFiles[];
}

export interface ThumbsItemFiles {
  name: string;
  url: string;
}

export interface HomeModel {
  // STEPS:
  //    selecting-file
  //    take-a-snapshot
  //    cropping-image
  //    previewing-cropped-image
  //    uploading-cropped-image
  step: string;
  maxFileSize: number;
  thumbs: ThumbsItem[];
  cropper: {
    settings: CropperSettings;
  };
}
