import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordForm:FormGroup;
  constructor(private authService: AuthService,
    private commonServices: CommonService, private router: Router) { 
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
      confirm_password: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.passwordForm.value);
    this.commonServices.getLoader().then((loader) => {
      loader.present();
      this.authService.updatePassword(this.passwordForm.value).subscribe(
        (token: any) => {
          loader.dismiss();
          localStorage.setItem('token',JSON.stringify(token));
          this.router.navigateByUrl('tabs/home')
          this.commonServices
            .getToast("Password Updated Successfully", 3000, "bottom")
            .then((toast) => {
              toast.present();
            });
        },
        (error) => {
          loader.dismiss();
          this.commonServices
            .getToast(error.error.error, 3000, "bottom")
            .then((toast) => {
              toast.present();
            });
        }
      );
    });
  }
}
