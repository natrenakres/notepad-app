import { Note } from "../interfaces/note";

export class CreateNote {
  static readonly type = "[Note] Create Note";
  constructor(public payload: String) {}
}

export class SaveNote {
  static readonly type = "[Note] Save Note";
  constructor() {}
}

export class UpdateNote {
  static readonly type = "[Note] Update Note";
  constructor(public payload: Note) {}
}

export class DeleteNote {
  static readonly type = "[Note] Delete Note";
  constructor(public payload: Note) {}
}

export class GetNote {
  static readonly type = "[Note] get Note";
  constructor(public payload: string) {}
}

export class InitNoteState {
  static readonly type = "[Note] init Notes";
  constructor() {}
}
