import { CommonService } from "./../../services/common.service";
import { AuthService } from "src/app/pages/services/auth.service";
import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  currentUser: any;
  constructor(
    private authService: AuthService,
    private commonServices: CommonService
  ) {
    this.profileForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", Validators.required),
    });
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUser = user;
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
      });
    }
  }

  ngOnInit() {}
  ionViewWillEnter() {}
  onSubmit() {
    console.log(this.profileForm.value);
    this.commonServices.getLoader().then((loader) => {
      loader.present();
      this.authService.updateUser(this.profileForm.value).subscribe(
        (profile: any) => {
          loader.dismiss();
          this.authService.currentUser.next(profile?.data);
          localStorage.setItem('currentUser',JSON.stringify(profile?.data));
          this.commonServices
            .getToast("Profile Updated Successfully", 3000, "bottom")
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
