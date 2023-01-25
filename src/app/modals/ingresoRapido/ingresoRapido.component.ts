import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingresoRapido',
  templateUrl: './ingresoRapido.component.html',
  styleUrls: ['./ingresoRapido.component.scss']
})

export class IngresoRapidoComponent implements OnInit {

  cedulaForm = this._formBuilder.group({
    nit: [, Validators.required],
    tipoIdentificacion: [, []],
    apellido1: ['', Validators.required],
    apellido2: ['', ],
    nombre1: ['', Validators.required],
    nombre2: ['', ],
    fechaCumpleanio:['',]
  });

  constructor(public dialogRef: MatDialogRef<IngresoRapidoComponent>,private _formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  close(){
    console.log(this.cedulaForm.value)
    this.dialogRef.close(this.cedulaForm.value)
  }
}
