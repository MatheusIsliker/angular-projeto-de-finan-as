import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms-filho',
  templateUrl: './forms-filho.component.html',
  styleUrls: ['./forms-filho.component.scss']
})
export class FormsFilhoComponent implements OnInit {

 @Input() value: any;

  constructor() { }

  ngOnInit(): void {
  }

}
