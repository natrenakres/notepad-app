import { Component, OnInit } from "@angular/core";
import { Note } from "../interfaces/note";
import { ActivatedRoute } from "@angular/router";
import { NotesService } from "../services/notes.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"]
})
export class DetailPage implements OnInit {
  public note: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private navCtrl: NavController
  ) {
    this.note = {
      id: "",
      title: "",
      content: ""
    };
  }

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get("id");

    if (this.notesService.loaded) {
      this.note = this.notesService.getNote(noteId);
    } else {
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(noteId);
      });
    }
  }

  noteChanged() {
    this.notesService.save();
  }

  deleteNote() {
    this.notesService.deleteNote(this.note);
    this.navCtrl.navigateBack("/notes");
  }
}
