import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-campo',
  templateUrl: './editar-campo.component.html',
  styleUrls: ['./editar-campo.component.scss']
})

export class EditarCampoComponent implements OnInit {

  campoForm = this._formBuilder.group({
    campo     : [this.data.valorCampo , [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<EditarCampoComponent>,private _formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
