import { Component, OnInit } from "@angular/core";
import { Note } from "../interfaces/note";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store, Select } from "@ngxs/store";
import { GetNote, DeleteNote, UpdateNote } from "../actions/note.actions";
import { NoteState } from "../state/note.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"]
})
export class DetailPage implements OnInit {
  public note: Note | null;

  @Select(NoteState.getNote)
  note$: Observable<Note>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get("id");

    this.store.dispatch(new GetNote(noteId));

    this.note$.subscribe(x => {
      this.note = x;
    });
  }

  noteChanged() {
    this.store.dispatch(new UpdateNote(this.note));
  }

  deleteNote() {
    this.store
      .dispatch(new DeleteNote(this.note))
      .subscribe(() => this.navCtrl.navigateBack("/notes"));
  }
}
