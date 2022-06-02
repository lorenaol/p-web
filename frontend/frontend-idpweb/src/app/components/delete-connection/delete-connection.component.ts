import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Refugee} from "../../entities/refugee";
import {Location} from "../../entities/location";
import {LocationService} from "../../services/location.service";
import {RefugeeService} from "../../services/refugee.service";
import {Connection} from "../../entities/connection";
import {ConnectionService} from "../../services/connection.service";
@Component({
  selector: 'app-delete-connection',
  templateUrl: './delete-connection.component.html',
  styleUrls: ['./delete-connection.component.css']
})
export class DeleteConnectionComponent implements OnInit {

  nameUser = 'ADMINISTRATOR';

  announce: Location={};

  refugees: Refugee={};
  connection: Connection = {};
  addRefugee: Refugee={};
  selectedRefugee?: string;
  buttonDisabled?: boolean;

  constructor(private router: Router, private locationService: LocationService,  private connectService : ConnectionService,
              private refugeeService: RefugeeService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // eslint-disable-next-line no-console
      console.log(this.route.snapshot.params['id']);
      if (this.route.snapshot.params['id']) {
        this.connectService.find(this.route.snapshot.params['id']).subscribe((data: any) => {
          console.log(data.body)
          this.connection = data.body;
          this.announce = data.body.location;
          this.refugees = data.body.refugee;
          this.selectedRefugee = "  " + this.refugees.name + "                  " + this.refugees.nr;
          //   this.locationService.find(this.connection.location?.id!).subscribe((data2:any)=>{
          //     this.announce=data2.body;
          //   this.refugeeService.find(this.connection.refugee?.id!).subscribe((data3: any) => {
          //     this.refugees = data3.body;
          //     this.buttonDisabled = false;
          //   });
          // });


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
        });
      })
    });

  }

  delete() :void{

      this.refugees.accepted = false;
      this.announce.currNr = this.announce.currNr! - this.refugees.nr!;

      // this.connection.location  =this.announce;
      // this.connection.refugee = this.addRefugee;
      this.refugeeService.updateRefugee(this.refugees).subscribe((data1:any)=>{
        this.locationService.updateLocation(this.announce).subscribe((data2:any) => {
          this.connectService.deleteConnection(this.connection).subscribe((data: any) => {
            console.log(this.connection);
            this.router.navigate(['refugee-list']);
          });
        })
      });



  }
}

