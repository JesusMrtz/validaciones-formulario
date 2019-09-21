import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {
  forma: FormGroup;
  usuario: any = {
    nombreCompleto: {
      nombre: 'Jesus',
      apellido: 'Martinez'
    },
    correo: 'jesusmrtztorres@gmail.com',
    pasatiempos: ['correr', 'dormir', 'comer']
  };

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({
      nombreCompleto: new FormGroup(
          {
            nombre: new FormControl('',
            [
              Validators.required,
              Validators.minLength(5)
            ]),
            apellido: new FormControl('', 
            [
              Validators.required,
              this.noMartinez
            ]),
          }
        ),
        correo: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ]),
        pasatiempos: new FormArray([
          new FormControl('correr', Validators.required)
        ]),
        username: new FormControl('', Validators.required, this.existeUsuario),
        password1: new FormControl('', Validators.required),
        password2: new FormControl()
    });

    // this.forma.setValue(this.usuario);
    this.forma.controls.password2.setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    this.forma.controls.username.valueChanges
    .subscribe( data => {
      console.log(data);
    });

    this.forma.controls.username.statusChanges
    .subscribe( data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    /*
    this.forma.reset({
      nombreCompleto: {
        nombre: '',
        apellido: ''
      },
      correo: ''
    });
    */

    // this.forma.controls['correo'].setValue('jajaja@jajaja.com');
  }

  noMartinez(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'martinez') {
      return {
        nomartinez: true
      };
    }

    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    let forma: any = this;
    if (control.value !== forma.controls.password1.value) {
      return {
        noiguales: true
      };
    }

    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value == 'jmartinez') {
            resolve( {
              existe: true
            });
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );

    return promesa;
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls.pasatiempos).push(
      new FormControl('dormir', Validators.required)
    );
  }

}
