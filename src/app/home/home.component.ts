import { MoveStep, AddThumbsListItem, UploadFile } from './home.actions';
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
  thumbsTitle: string;

  @Select(HomeState) home$: Observable<HomeModel>;

  public cropperImage: any;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
    this.cropperImage = {};
    this.thumbsTitle = "New Awesome Image";
  }

  moveStep(moveTo: string){
    this.store.dispatch(new MoveStep(moveTo))
  }

  onFilesAdded(files: File[]) {
    var image: any = new Image();

    files.forEach(file => {
      const reader = new FileReader();

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
    this.webcamImage = webcamImage;

    var image = new Image();
    image.src = webcamImage.imageAsDataUrl;

    if(webcamImage){
      this.cropper.setImage(image);
      this.store.dispatch(new MoveStep('cropping-image'))
    }
  }

  public handleInitError(){

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

    setTimeout(() => {
      //this.thumbs.push(thumbsResult);
      this.store.dispatch(new UploadFile(this.thumbsTitle, this.cropperImage.image))
    }, 500);
  }
}
