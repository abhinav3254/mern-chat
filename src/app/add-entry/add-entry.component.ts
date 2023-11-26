import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {

  constructor(private question: QuestionService) { }

  onSubmit(form: NgForm) {
    this.question.addQuestion(form.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.status === 201) {
          alert('Data saved to the database!');
        } else {
          alert('Data saved to the database!');
        }
      },
      (error) => {
        console.error('Error occurred:', error);
        alert('Error occurred while saving data.');
      }
    );
  }


}
