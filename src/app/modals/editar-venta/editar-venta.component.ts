import { Component, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';




moment.locale('es');

@Component({
  selector: 'app-editar-venta-modal-servicio',
  templateUrl: './editar-venta.component.html',
  styleUrls: ['./editar-venta.component.scss']
})
export class editarVentaComponent implements OnInit, AfterViewInit, OnDestroy {

  sending = false;
  selected: any = null;


  form = new FormGroup({
    id: new FormControl('', []),
    description: new FormControl(null, [])
  });

  item: any;
  tableData: any []=[];
  loadingRecords: boolean;
  dataSourceEmpresa: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<editarVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private snackBar: MatSnackBar,
    public dialog: MatDialog,
  
  ) {

  }
  loadRecords() {
    this.tableData.push(this.data.datos);

  }
  ngOnInit() {
    this.item = this.data.item

  }

  ngAfterViewInit() {}

  close(params: any = null) {
    this.dialogRef.close(params);
  }

  ngOnDestroy(): void {}
}
