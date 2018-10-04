import { Injectable } from "@angular/core";
import { Note } from "../interfaces/note";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  public notes: Note[] = [];
  public loaded = false;

  constructor(private storage: Storage) {}

  load(): Promise<boolean> {
    return new Promise(resolve => {
      this.storage.get("notes").then(notes => {
        if (notes != null) {
          this.notes = notes;
        }

        this.loaded = true;
        resolve(true);
      });
    });
  }

  save(): void {
    this.storage.set("notes", this.notes);
  }

  getNote(id): Note {
    return this.notes.find(x => x.id === id);
  }

  createNote(title): void {
    const id = Math.max(...this.notes.map(x => parseInt(x.id)), 0) + 1;
    this.notes.push({
      id: id.toString(),
      title: title,
      content: ""
    });
    this.save();
  }

  deleteNote(note: Note): void {
    const index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }
}
