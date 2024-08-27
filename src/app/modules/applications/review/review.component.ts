import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  id:string|null;
  constructor(private rout:ActivatedRoute){
    this.id=rout.snapshot.paramMap.get('id');
  }  



  firstName:string='İsim';
  lastName:string='Soyisim';
}
