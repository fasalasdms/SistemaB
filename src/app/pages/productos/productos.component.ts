import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;

  filtroForm = this._formBuilder.group({
    nombre     : [, [Validators.required]],
    codigo     : [, [Validators.required]],
  });

  filtrosBarForm = this._formBuilder.group({
    nombre     : [, [Validators.required]],
    codigo     : [, [Validators.required]],
    grupo     : [, [Validators.required]]
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
