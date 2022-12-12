import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.commonService.getLoader().then((loader) => {
      loader.present();
      this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          localStorage.setItem("token", JSON.stringify(res));
          this.authService.getUser().subscribe(
            (user: any) => {
              loader.dismiss();
              console.log(user);
              this.authService.currentUser.next(user?.data);
              if (user?.data?.verifiedAt == null) {
                this.commonService
                  .getAlert("Oops", "Your Email is Not Verified")
                  .then((alert) => {
                    alert.present();
                  });
              } else {
                this.commonService
                  .getToast("Login Successfully!", 3000, "bottom")
                  .then((toast) => {
                    toast.present();
                    this.router.navigate(["/tabs/home"]);
                  });
              }
            },
            (error) => {
              loader.dismiss();
              console.log(error);
            }
          );
        },
        (error) => {
          this.commonService
            .getToast("Login error!", 3000, "bottom")
            .then((toast) => {
              toast.present();
            });
          loader.dismiss();
        }
      );
    });
  }
}
