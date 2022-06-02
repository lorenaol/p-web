import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Refugee} from "../../entities/refugee";
import {Location} from "../../entities/location";
import {LocationService} from "../../services/location.service";
import {RefugeeService} from "../../services/refugee.service";
import {Connection} from "../../entities/connection";
import {ConnectionService} from "../../services/connection.service";
import {User} from "../../entities/user";
import {EditRefugeeDialogComponent} from "../edit-refugee-dialog/edit-refugee-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAnnounceComponent} from "../delete-announce/delete-announce.component";
import {EditAnnounceComponent} from "../edit-announce/edit-announce.component";

@Component({
  selector: 'app-view-announce',
  templateUrl: './view-announce.component.html',
  styleUrls: ['./view-announce.component.css']
})
export class ViewAnnounceComponent implements OnInit {

  nameUser = 'ADMINISTRATOR';

  // user: User = {id: 1234, name: "Ana", email: "anna@mail", password: "parola", phone: "0734506218", gender: "female"}
  // announce1: Location = {id: 321, title: "Ofer cazare in Cluj-Napoca", nr: 5,
  //   description: "Ofer 5 locuri cazare intr-o casa in care nu locuieste nimeni momentan, situata in Tg-Jiu, Gorj, Strada 9 mai, nr. 217",
  //   user: this.user, currNr: 0};

  announce: Location={};

  refugees: Refugee[]=[];
  connection: Connection = {};
  addRefugee: Refugee={};

  buttonDisabled?: boolean;

  constructor(private router: Router, private locationService: LocationService,  private connectService : ConnectionService,
              private refugeeService: RefugeeService,private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.nameUser = JSON.parse(localStorage.getItem("user")!).name;
    this.route.queryParams.subscribe(params => {
      // eslint-disable-next-line no-console
      console.log(this.route.snapshot.params['id']);
      if (this.route.snapshot.params['id']) {
        this.locationService.find(this.route.snapshot.params['id']).subscribe((data: any) => {
          this.announce = data.body;
          if(this.announce.currNr == this.announce.nr){
            this.buttonDisabled = true;
          }
          else{
          this.refugeeService.getRefugeeNotAccepted(this.announce.nr!-this.announce.currNr!).subscribe((data: any) => {
            this.refugees = data.body;
            this.buttonDisabled = false;
          });
          }
        });
      }
    });


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

  clickBack(): void {

  }

  clickMyAnnounces(): void {
    this.router.navigate(['/my-announces']);
  }

  clickAddAnnounce(): void {
    this.router.navigate(['/add-announce']);
  }

  connect():void {
    this.addRefugee.accepted = true;
    this.announce.currNr = this.announce.currNr! + this.addRefugee.nr!;

    // this.connection.location  =this.announce;
    // this.connection.refugee = this.addRefugee;
    this.refugeeService.updateRefugee(this.addRefugee).subscribe((data1:any)=>{
      this.connection.refugee = data1.body;
      this.locationService.updateLocation(this.announce).subscribe((data2:any) => {
        this.connection.location =data2.body;
        this.connectService.addConnection(this.connection).subscribe((data: any) => {
          console.log(this.connection);
          this.router.navigate(['/saved-connections']);
        });
      })
    });


    if(this.announce.currNr!= this.announce.nr){
      this.refugeeService.getRefugeeNotAccepted(this.announce.nr! - this.announce.currNr!).subscribe((data: any) => {
        this.refugees = [];
        this.refugees = data.body;
      });
    }
    else {
      this.buttonDisabled = true;
    }
  }

  delete(): void {
    // const dialogRef = this.dialog.open(DeleteAnnounceComponent, {
    //   height: '200px',
    //   width: '27%'
    // });
    // dialogRef.afterClosed().subscribe(res => {
    //   console.log(res);
    // })
    this.locationService.deleteLocation(this.announce).subscribe((data3:any)=>{
      this.router.navigate(['/my-announces']);
    });
  }

  edit(): void {
    const dialogRef = this.dialog.open(EditAnnounceComponent, {data:this.announce,
      height: '700px',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }
}
