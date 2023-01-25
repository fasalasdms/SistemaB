import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.scss']
})
export class ListaVentasComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','iva'];
  dataSource = ["dsfsd","sdfsdf","dfsdfsdf","sdfsdfds","dsfsdfsdf"];

  constructor() { }

  ngOnInit(): void {
  }

}
