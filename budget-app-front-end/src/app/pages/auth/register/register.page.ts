import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirm_password: new FormControl("", Validators.required),
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.commonService.getLoader().then((loader) => {
      loader.present();
      this.authService.register(this.registerForm.value).subscribe(
        (res: any) => {
          loader.dismiss();
          console.log(res);
          this.commonService.getAlert("Success", res.message).then((alert) => {
            alert.present();
            alert.onDidDismiss().then((alertRes) =>{
              this.router.navigate(["/login"]);
            })
          });
        },
        (error:any) => {
          this.commonService.getToast(error.error.error,3000,'bottom').then(toast =>{
            toast.present();
          })
          loader.dismiss();
          console.log(error);
        }
      );
    });
  }
}
