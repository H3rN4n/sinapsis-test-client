import { MoveStep, AddThumbsListItem } from './home.actions';
import { State, Action, StateContext } from '@ngxs/store';
import { CropperSettings } from 'ngx-img-cropper';
import { HomeModel } from './home.models';

const defaultCropperSetting = function() {
  let cropperSettings = new CropperSettings();
  cropperSettings.noFileInput = true;
  cropperSettings.width = 400;
  cropperSettings.height = 300;
  cropperSettings.croppedWidth = 400;
  cropperSettings.croppedHeight = 300;
  cropperSettings.canvasWidth = 400;
  cropperSettings.canvasHeight = 300;
  return cropperSettings;
};

@State<HomeModel>({
  name: 'home',
  defaults: {
    step: 'selecting-file',
    maxFileSize: 5000 * 1024 * 1024,
    thumbs: [],
    cropper: {
      settings: defaultCropperSetting()
    }
  }
})

export class HomeState {
  @Action(MoveStep)
  MoveStep(ctx: StateContext<HomeModel>, action: MoveStep) {
    const state = ctx.getState();
    console.log(action, ctx)
    ctx.setState({
      ...state,
      step: action.moveTo
    });
  }

  @Action(AddThumbsListItem)
  AddThumbsListItem(ctx: StateContext<HomeModel>, action: AddThumbsListItem) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      thumbs: state.thumbs.concat(action.item)
    });

    return ctx.dispatch(new MoveStep('selecting-file'));
  }

}
