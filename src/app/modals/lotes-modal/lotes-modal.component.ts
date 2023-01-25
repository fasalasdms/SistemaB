import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lotes-modal',
  templateUrl: './lotes-modal.component.html',
  styleUrls: ['./lotes-modal.component.scss']
})
export class LotesModalComponent implements OnInit {
  filteredOptions: any;

  loteForm = this._formBuilder.group({
    lote     : [, [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<LotesModalComponent>) { }

  ngOnInit(): void {
    this.filteredOptions = this.data.lotes;
  }

}
