import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Refugee} from "../../entities/refugee";
import {RefugeeService} from "../../services/refugee.service";
import {ConnectionService} from "../../services/connection.service";
import {LocationService} from "../../services/location.service";

class DialogData {
}

@Component({
  selector: 'app-delete-refugee-dialog',
  templateUrl: './delete-refugee-dialog.component.html',
  styleUrls: ['./delete-refugee-dialog.component.css']
})
export class DeleteRefugeeDialogComponent implements OnInit {

  refugee: Refugee={};

  constructor(public dialogRef: MatDialogRef<DeleteRefugeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private refugeeService: RefugeeService,
              private connectionService: ConnectionService,
              private locationService: LocationService
              ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.refugee = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {

    this.connectionService.getConnectionRefugee(this.refugee.id!).subscribe(res=>{
      const a = res.body;
      if(res?.body){
      res.body!.location!.currNr = res.body!.location!.currNr! - res.body!.refugee?.nr!;
        this.connectionService.deleteConnection(a!).subscribe(res1=>{

          this.refugeeService.deleteRefugee(this.refugee).subscribe(res2=>{
            // this.locationService.find(res.body!.location!.id!).subscribe(data=>
            // {
            this.locationService.updateLocation(res.body?.location!).subscribe(data2=>{
              this.dialogRef.close();
            })

            // })

          });
        })
      //update location
        } else {
        this.refugeeService.deleteRefugee(this.refugee).subscribe(()=>{this.dialogRef.close();})
      }

    })


  }

}
