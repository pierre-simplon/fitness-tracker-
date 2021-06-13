import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove-training',
  templateUrl: './remove-training.component.html',
  styleUrls: ['./remove-training.component.css']
})
export class RemoveTrainingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  deleteExercise(){
    console.log("deleting");
  }
}
