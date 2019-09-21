import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: 'Hombre',
    aceptar: false
  };

  paises = [
    {
    codigo: 'CRI',
    nombre: 'Costa Rica',
  },
  {
    codigo: 'ESP',
    nombre: 'España'
  }
];

sexos = ['Hombre', 'Mujer', 'Sin definir'];
  constructor() { }

  ngOnInit() {
  }

  guardar(formulario: NgForm) {
    console.log('Formulario posteado');
    console.log('formulario', formulario);
    console.log('valores', formulario.value);
    console.log('usuario', this.usuario);
  }

}
