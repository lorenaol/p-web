import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocationService} from "../../services/location.service";
import {Location} from "../../entities/location";
import {RefugeeService} from "../../services/refugee.service";

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.css']
})
export class AnnouncesComponent implements OnInit {

  nameUser = 'ADMINISTRATOR';

  announces?: Location[]= [];
    // = [
    // {title: "Ofer cazare in Cluj-Napoca", noPers: "2",
    //   description: "Ofer 5 locuri cazare intr-o casa in care nu locuieste nimeni momentan, situata in Tg-Jiu, Gorj, Strada 9 mai, nr. 217",
    //   user: {name: "DUTA ANA-MARIA", phone: "0734506218", email: "annamarriad@gmail.com"}},
    // {title: "Ofer cazare in Targu Jiu", noPers: "5",
    //   description: "Ofer 5 locuri cazare intr-o casa in care nu locuieste nimeni momentan, situata in Tg-Jiu, Gorj, Strada 9 mai, nr. 217",
    //   user: {name: "OLESCU LORENA", phone: "0737583957", email: "loernaolescu@gmail.com"}}
    // ];

  constructor(private router: Router, private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((data:any)=>{this.announces = data.body.filter((l:Location)=>this.ok(l));})
    // this.refugeeService.getRefugeeNotAccepted().subscribe((data.any)=>{this.re})
  }
  ok(x:Location) : boolean {
    return x.nr! > x.currNr!;
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

  clickViewAnnounce(a: Location): void {
    this.router.navigate(['/view-announce',a.id]);
  }

}
