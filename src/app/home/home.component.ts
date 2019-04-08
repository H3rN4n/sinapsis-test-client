import { MoveStep, AddThumbsListItem } from './home.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { HomeState } from './home.state';

import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ThumbsItem, HomeModel } from './home.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  @Select(HomeState) home$: Observable<HomeModel>;

  public cropperImage: any;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
    this.cropperImage = {};
  }

  moveStep(moveTo: string){
    this.store.dispatch(new MoveStep(moveTo))
  }

  onFilesAdded(files: File[]) {
    var image: any = new Image();

    files.forEach(file => {
      const reader = new FileReader();

      // reader.onload = (e: ProgressEvent) => {
      //   const content = (e.target as FileReader).result;

      //   // this content string could be used as an image source
      //   // or be uploaded to a webserver via HTTP.
      // };

      reader.onloadend = (loadEvent: any) => {
        image.src = loadEvent.target.result;
        this.cropper.setImage(image);
        this.store.dispatch(new MoveStep('cropping-image'))
      };

      reader.readAsDataURL(file);
    });
  }

  ngOnInit() {}

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    var image = new Image();
    image.src = webcamImage.imageAsDataUrl;

    if(webcamImage){
      this.cropper.setImage(image);
      this.store.dispatch(new MoveStep('cropping-image'))
    }
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  uploadCroppedImage() {
    this.store.dispatch(new MoveStep('uploading-cropped-image'))

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
          name: '400x300',
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
      //this.thumbs.push(thumbsResult);
      this.store.dispatch(new AddThumbsListItem(thumbsResult))
    }, 500);
  }
}
