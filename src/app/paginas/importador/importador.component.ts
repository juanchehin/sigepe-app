import { Component, OnInit } from '@angular/core';
import { PersonaService, UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-importador',
  templateUrl: './importador.component.html',
  styles: []
})
export class ImportadorComponent implements OnInit {

  excelSubir: File | null = null;
  activarSpinner = false;
  botonImportar = false;



  constructor(
    private personaService: PersonaService
  ) {
   }

  ngOnInit() {
    this.activarSpinner = false;
    this.botonImportar = false;
  }

// ==================================================
// Carga el excel desde el formulario
// ==================================================
  enviarExcel(files: FileList) {
    this.botonImportar = true;
    this.excelSubir = files.item(0);
}

// ==================================================
//
// ==================================================

subirArchivo() {
  this.activarSpinner = true;
  this.botonImportar = false;

  this.personaService.postFile(this.excelSubir).subscribe(data => {

    this.activarSpinner = false;
    if(data === true){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Importacion exitosa',
        showConfirmButton: false,
        timer: 2000
      });
    }else{

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error en la subida',
      });

    }
    });
}

}
