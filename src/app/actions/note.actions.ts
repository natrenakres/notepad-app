import {Note} from "../interfaces/note";

export class CreateNote {
  static readonly type = "[Note] Create Note";
  constructor(public payload: String) {}
}

export class SaveNote {
  static readonly type = "[Note] Save Note";
  constructor() {}
}


export class GetNote {
  static readonly type = "[Note] get Note";
  constructor(public payload: number) {}
}

export class InitNoteState {
  static readonly type = "[Note] init Notes";
  constructor() {}
}