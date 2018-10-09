import {State, StateContext, Action, Selector, Store} from "@ngxs/store";
import { Note } from "../interfaces/note";
import { NotesService } from "../services/notes.service";
import {CreateNote, GetNote, InitNoteState, SaveNote} from "../actions/note.actions";

export interface NoteStateModel {
  notes: Note[];
}

@State<NoteStateModel>({
  name: "notes",
  defaults: {
    notes: []
  }
})
export class NoteState {
  constructor(private noteService: NotesService,
              private store: Store) {
  }

  @Selector()
  static getNotes(state: NoteStateModel) {
    return state.notes;
  }

  @Action(CreateNote)
  async createNote(ctx: StateContext<NoteStateModel>, action: CreateNote) {
    const result = await this.noteService.createNote(action.payload);
    const state = ctx.getState();
    ctx.setState({
      notes: [...state.notes, result]
    });
    this.store.dispatch(new SaveNote());
  }

  async getNote(ctx: StateContext<NoteStateModel>, action: GetNote) {
    const note = await this.noteService.getNote(action.payload);
  }

  @Action(InitNoteState)
  async initNoteState(ctx: StateContext<NoteStateModel>, action: InitNoteState) {
    const state = await this.noteService.load();

    ctx.setState({
        notes: state
    });
  }

  @Action(SaveNote)
  saveNoteState(ctx: StateContext<NoteStateModel>, action: SaveNote) {
    const state = ctx.getState();
    this.noteService.save(state.notes);
  }
}
