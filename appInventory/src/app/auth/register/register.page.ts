import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Commons } from '../../commons';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formSignUp: FormGroup;

  constructor(
    private commons: Commons,
    private homeService: HomeService,
    private formBuilder: FormBuilder
  ) {
    // Declarar formulario de registro
    this.formSignUp = this.formBuilder.group({
      usrNombre: ['', [Validators.required]],
      usrMail: ['', [Validators.required]],
      usrNick: ['', [Validators.required]],
      ustPwd: ['', [Validators.required]],
    });
  }

  //* Regresar a la pagina anterior
  goBack() {
    this.commons.goTo('');
  }

  //* Limpiar formulario
  clearForm() {
    this.formSignUp.reset();
  }

  //* REGISTRAR USUARIO NUEVO
  async registUsr() {
    if (this.formSignUp.valid) {
      let params = this.formSignUp.value;
      const data = await this.homeService.createUser(params);
      data.subscribe(async (dt: any) => {
        const code = dt.code;
        if (code === 'SUCCESS') {
          this.clearForm();
          await this.commons
            .successAlert('Please contact your supplier to activate your user.')
            .then((r) => {
              this.commons.goTo('/login');
            });
        } else {
          await this.commons.errorAlert();
        }
      });
    } else {
      this.formSignUp.markAllAsTouched();
      await this.commons.infoAlert('There are incomplete fields!');
    }
  }
}
