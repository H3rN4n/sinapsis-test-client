import { ThumbsItem } from "./home.models";

export class MoveStep {
  static readonly type = '[Home] Move Step';
  constructor(public moveTo: string) {}
}

export class AddThumbsListItem {
  static readonly type = '[Home] Add Thumbs List Item';
  constructor(public item: ThumbsItem) {}
}

export class UploadFile {
  static readonly type = '[Home] Upload File';
  constructor(public title: string, public file: any) {}
}
