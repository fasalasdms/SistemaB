import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-tipos',
  templateUrl: './lista-tipos.component.html',
  styleUrls: ['./lista-tipos.component.scss']
})
export class ListaTiposComponent implements OnInit {

  constructor() { }

    
  //Tags

  listaTags = [
    {
      colorBg:"004D40",
      colorText:"fff",
      icon:"clock",
      nombre:"Categoria 1",
      link:"",
      stock:10
    },
    {
      colorBg:"0D47A1",
      colorText:"fff",
      icon:"annotation",
      nombre:"Categoria 2",
      link:"",
      stock:10
    },
    {
      colorBg:"E65100",
      colorText:"fff",
      icon:"cash",
      nombre:"Categoria 1",
      link:"",
      stock:10
    },
    {
      colorBg:"4A148C",
      colorText:"fff",
      icon:"camera",
      nombre:"Tag 1",
      link:"",
      stock:10
    },
    {
      colorBg:"B71C1C",
      colorText:"fff",
      icon:"desktop-computer",
      nombre:"Tag 1",
      link:"",
      stock:10
    },
    {
      colorBg:"F4511E",
      colorText:"fff",
      icon:"film",
      nombre:"Tag 1",
      link:"",
      stock:10
    }
  ];


  ngOnInit(): void {
  }

}
