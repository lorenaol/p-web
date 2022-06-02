import {Component, Inject, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Refugee} from "../../entities/refugee";
import {RefugeeService} from "../../services/refugee.service";
import {ConnectionService} from "../../services/connection.service";


class DialogData {
}

@Component({
  selector: 'app-edit-refugee-dialog',
  templateUrl: './edit-refugee-dialog.component.html',
  styleUrls: ['./edit-refugee-dialog.component.css']
})
export class EditRefugeeDialogComponent implements OnInit {

  // nameRefugee = 'CALIN MARIUS DANIEL';
  // refugeeNoPers = '10';
  // refugeePhone = '+380(0512)347624';
  //
  // refugeeName = 'CALIN MARIUS DANIEL';

  // @Input() refugee : Refugee={};
  // @Output() editedCalue = new EventEmitter();
  refugee: Refugee={};

  constructor(public dialogRef: MatDialogRef<EditRefugeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private refugeeService: RefugeeService,
              private router: Router,
              private connectionService: ConnectionService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.refugee = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {

    this.refugeeService.updateRefugee(this.refugee).subscribe(res=>
      {
        this.dialogRef.close();
      }
    );


  }

  clickSeeConection(ref : any): void {
    this.connectionService.getConnectionRefugee(ref.id).subscribe((data:any) => {
      this.dialogRef.close();
      this.router.navigate(['/view-connection/'+data.body.id]);
    })

  }
}
