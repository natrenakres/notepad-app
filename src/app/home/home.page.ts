import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { NotesService } from "../services/notes.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public noteService: NotesService
  ) {}

  ngOnInit(): void {
    this.noteService.load();
  }

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
              this.noteService.createNote(data.title);
              this.noteService.load();
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }
}
