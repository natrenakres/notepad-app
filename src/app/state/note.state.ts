import { State, StateContext, Action, Selector, Store } from "@ngxs/store";
import { Note } from "../interfaces/note";
import { NotesService } from "../services/notes.service";
import {
  CreateNote,
  GetNote,
  InitNoteState,
  SaveNote,
  UpdateNote,
  DeleteNote
} from "../actions/note.actions";
import { StateContextFactory } from "@ngxs/store/src/internal/state-context-factory";

export interface NoteStateModel {
  notes: Note[];
  selectedNote: Note;
}

@State<NoteStateModel>({
  name: "notes",
  defaults: {
    notes: [],
    selectedNote: null
  }
})
export class NoteState {
  constructor(private noteService: NotesService, private store: Store) {}

  @Selector()
  static getNotes(state: NoteStateModel) {
    return state.notes;
  }

  @Selector()
  static getNote(state: NoteStateModel) {
    return state.selectedNote;
  }

  @Action(CreateNote)
  async createNote(ctx: StateContext<NoteStateModel>, action: CreateNote) {
    const result = await this.noteService.createNote(action.payload);
    const state = ctx.getState();
    ctx.patchState({
      notes: [...state.notes, result]
    });
    this.store.dispatch(new SaveNote());
  }

  @Action(GetNote)
  async getNote(ctx: StateContext<NoteStateModel>, action: GetNote) {
    const note = await this.noteService.getNote(action.payload);
    ctx.patchState({
      selectedNote: note
    });
  }

  @Action(InitNoteState)
  async initNoteState(
    ctx: StateContext<NoteStateModel>,
    action: InitNoteState
  ) {
    const state = await this.noteService.load();

    ctx.patchState({
      notes: state
    });
  }

  @Action(SaveNote)
  saveNoteState(ctx: StateContext<NoteStateModel>, action: SaveNote) {
    const state = ctx.getState();
    this.noteService.save(state.notes);
  }

  @Action(UpdateNote)
  updateNote(ctx: StateContext<NoteStateModel>, action: UpdateNote) {
    const state = ctx.getState();
    state.notes.find(x => x.id === action.payload.id).content =
      action.payload.content;
    ctx.patchState({
      notes: state.notes
    });
    this.noteService.save(state.notes);
  }

  @Action(DeleteNote)
  deleteNote(ctx: StateContext<NoteStateModel>, action: DeleteNote) {
    const state = ctx.getState();
    const newState = state.notes.filter(x => x.id !== action.payload.id);
    ctx.patchState({
      notes: newState
    });
    this.noteService.save(newState);
  }
}
