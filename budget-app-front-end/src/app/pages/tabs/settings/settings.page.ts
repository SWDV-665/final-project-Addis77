import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentUser:any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  this.authService.currentUser.subscribe(res =>{
    this.currentUser =res;
    console.log(this.currentUser);
  })
  }

}
