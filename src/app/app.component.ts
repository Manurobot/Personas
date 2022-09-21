import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Persona } from './app';
import { AppService } from './app.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'prueba';

  personas: Persona[] = [];

  displayedColumns: string[] = ['Nombre', 'Edad', 'Sexo', 'Documento'];

  nombreForm = new FormControl('', [Validators.required]);
  edadForm = new FormControl(0, [Validators.required]);
  sexoForm = new FormControl('', [Validators.required]);
  nombreNuevoForm = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  isImageSaved: boolean = false;
  cardImageBase64: string = '';

  isImageSaved_Nuevo: boolean = false;
  cardImageBase64_Nuevo: string = '';

  data = new Array<any>();

  personasNombre = [];

  constructor(private appService: AppService, private router: Router) {}

  consultaPersonas() {
    this.appService.getPersonas().subscribe({
      next: (res) => {
        this.personas = res.results[0].Personas;
        localStorage.setItem('personas', JSON.stringify(this.personas));
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  CreateBase64String_Nuevo(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64_Nuevo = imgBase64Path;
          this.isImageSaved_Nuevo = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  abrirArchivo(ev: any) {
    ev.preventDefault();
    const element: HTMLElement = document.getElementById(
      'Screen'
    ) as HTMLElement;
    element.click();
  }

  abrirArchivo_Nuevo(ev: any) {
    ev.preventDefault();
    const element: HTMLElement = document.getElementById(
      'ScreenNuevo'
    ) as HTMLElement;
    element.click();
  }

  guardarDocumento() {
    const nombre = this.nombreForm.value;

    if(this.nombreForm.value == '')
    {
      Swal.fire('No has seleccionado un nombre en la lista de Personas.')

    }else if(this.cardImageBase64 == '') {

      Swal.fire('No has subido una imagen.')

    }else {
    const personaDoc = this.personas.filter((x) => x.Nombre == nombre);

    personaDoc[0].Documento = this.cardImageBase64;

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha guardado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    this.nombreForm = new FormControl('');
    this.cardImageBase64 = '';
  }

  }

  guardarPersona() {

    if(this.nombreNuevoForm.value == ''||this.edadForm.value == 0 || this.sexoForm.value == '' || this.cardImageBase64_Nuevo =='')
    {
      Swal.fire('Deben llenar los datos.')
    }else {
      this.personas.push({
        Nombre: this.nombreNuevoForm.value,
        Edad: this.edadForm.value,
        Sexo: this.sexoForm.value,
        Documento: this.cardImageBase64_Nuevo,
      });
      localStorage.removeItem('personas');
      localStorage.setItem('personas', JSON.stringify(this.personas));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      this.borrarForm();
    }

  }

  abrirImagen(documento: any) {
    Swal.fire({
      imageUrl: documento,
      imageWidth: 500,
      imageAlt: 'Persona',
      confirmButtonText: 'Cerrar',
    });
  }


  borrarForm()
  {
    this.nombreNuevoForm = new FormControl('');
    this.edadForm = new FormControl(0);
    this.sexoForm = new FormControl('');
    this.cardImageBase64_Nuevo = '';


  }

  ngOnInit(): void {
    this.consultaPersonas();

    this.nombreForm = new FormControl('');
  }
}
