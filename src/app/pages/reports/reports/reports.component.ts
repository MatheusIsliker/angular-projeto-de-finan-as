import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {


  public mesesEanos: Array<any> = [
    {mes:'Janeiro' , ano: 'Ano de 2012' , id: 1},
    {mes:'Fevereiro' , ano: 'Ano de 2013' , id: 2},
    {mes:'Março' , ano: 'Ano de 2014' , id: 3},
    {mes:'Abril' , ano: 'Ano de 2015' , id: 4},
    {mes:'Maio' , ano: 'Ano de 2016' , id: 5},
    {mes:'Junho' , ano: 'Ano de 2017' , id: 6},
    {mes:'Julho' , ano: 'Ano de 2018' , id: 7},
    {mes:'Agosto' , ano: 'Ano de 2019' , id: 8},
    {mes:'Setembro' , ano: 'Ano de 2020' , id: 9},
    {mes:'Novembro' , ano: 'Ano de 2021' , id: 10},
    {mes:'Dezembro' , ano: 'Ano de 2022' , id: 11}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
