import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Store, Select } from "@ngxs/store";
import {CreateNote, SaveNote} from "../actions/note.actions";
import { Observable } from "rxjs";
import { Note } from "../interfaces/note";
import { NoteState } from "../state/note.state";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  @Select(NoteState.getNotes)
  notes$: Observable<Note>;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private store: Store
  ) {}

  ngOnInit(): void {}

  addNote() {
    this.alertCtrl
      .create({
        header: "New Note",
        message: "What should the title of this note be?",
        inputs: [
          {
            type: "text",
            name: "title"
          }
        ],
        buttons: [
          {
            text: "Cancel"
          },
          {
            text: "Save",
            handler: data => {
              this.store.dispatch(
                  new CreateNote(data.title)
              );
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }
}
