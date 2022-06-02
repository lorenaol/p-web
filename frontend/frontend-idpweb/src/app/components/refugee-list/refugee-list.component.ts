import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Refugee} from "../../entities/refugee";
import {RefugeeService} from "../../services/refugee.service";
import {MatDialog} from "@angular/material/dialog";
import {EditRefugeeDialogComponent} from "../edit-refugee-dialog/edit-refugee-dialog.component";
import {DeleteRefugeeDialogComponent} from "../delete-refugee-dialog/delete-refugee-dialog.component";

@Component({
  selector: 'app-refugee-list',
  templateUrl: './refugee-list.component.html',
  styleUrls: ['./refugee-list.component.css']
})
export class RefugeeListComponent implements OnInit {


  nameUser = 'ADMINISTRATOR';

  refugees: Refugee[]=[];
  constructor(private router: Router,
              public dialog: MatDialog,
              private refugeeService: RefugeeService) { }

  ngOnInit(): void {
    this.refugeeService.getRefugee().subscribe((res:any)=>{
      this.refugees = res.body!;
    })

  }

  clickAnnounces(): void {
    this.router.navigate(['/announces']);
  }

  clickAddRefugee(): void {
    this.router.navigate(['/add-refugee']);
  }

  clickListRefugee(): void {
    this.router.navigate(['/refugee-list']);
  }

  clickSavedConnections(): void {
    this.router.navigate(['/saved-connections']);
  }

  clickViewProfile(): void {
    this.router.navigate(['/profile']);
  }

  clickLogout(): void {
    localStorage.removeItem("user");
    this.router.navigate(['/']);
  }

  clickEditDialog(ref:any): void {
    const dialogRef = this.dialog.open(EditRefugeeDialogComponent,{data:ref ,
      height: '550px',
      width: '27%'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  clickDeleteDialog(ref:any): void {
    const dialogRef = this.dialog.open(DeleteRefugeeDialogComponent, {data:ref,
      height: '200px',
      width: '27%'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
      console.log(res);
    })
  }

}
