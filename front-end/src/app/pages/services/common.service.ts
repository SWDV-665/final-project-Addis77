import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, ModalController, PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private popoverCtrl: PopoverController
  ) {}

  public getLoader(spnr: any = 'bubbles', msg = '', css = '', bdd = false) {
    return this.loadingCtrl.create({
      spinner: spnr,
      message: 'Please wait ...',
      cssClass: css,
      backdropDismiss: bdd,
    });
  }

  public getToast(msg: any, dur: any, pos: any, css = '') {
    return this.toastCtrl.create({
      message: msg,
      duration: dur,
      position: pos,
      cssClass: css,
    });
  }

  public getPopover(cmp: any, cmpProps: any, css: any, bdd = false, ev?: any) {
    return this.popoverCtrl.create({
      component: cmp,
      componentProps: cmpProps,
      cssClass: css,
      backdropDismiss: bdd,
      event: ev,
    });
  }

  public getModal(cmp: any, cmpProps: any, css = '', bdd = false) {
    return this.modalCtrl.create({
      component: cmp,
      componentProps: cmpProps,
      cssClass: css,
      backdropDismiss: bdd,
    });
  }

  public getAlert(title: any, msg: any, css = '', bdd = false) {
    return this.alertController.create({
      header: title,
      message: msg,
      cssClass: css,
      backdropDismiss: bdd,
      buttons: ['OK'],
    });
  }

  public getConfirmAlert(title: any, msg: any, css?: any, bdd = false) {
    const alert = this.alertController.create({
      header: title,
      message: msg,
      cssClass: css,
      backdropDismiss: bdd,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.alertController.dismiss({ role: 'positive' });
          },
        },
        {
          text: 'No',
          handler: () => {
            this.alertController.dismiss({ role: 'negative' });
          },
        },
      ],
    });
    return alert;
  }

  public getConfirmToast(msg: any, pos: any, css = '') {
    return this.toastCtrl.create({
      message: msg,
      position: pos,
      cssClass: css,
      buttons: [
        {
          text: 'Yes',
          role: 'positive',
          handler: () => {
            this.toastCtrl.dismiss();
          },
        },
        {
          text: 'No',
          role: 'negative',
          handler: () => {
            this.toastCtrl.dismiss();
          },
        },
      ],
    });
  }
}
