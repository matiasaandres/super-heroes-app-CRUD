
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  
  heroe: HeroeModel = new HeroeModel();


  constructor(private heroesServices: HeroesService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {

  const id:string = this.route.snapshot.paramMap.get('id');

if(id !== 'nuevo'){

this.heroesServices.obtenerHeroe(id).subscribe((resp : HeroeModel) =>{

this.heroe = resp;
this.heroe.id = id;

});


}

  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('formulario no valido');
      return;
    }

    Swal.fire({
    
      title:'Espere',
      text:'Guardar Información',
      icon:'info',
      allowOutsideClick:false
      
    });

    Swal.showLoading();

    let peticion : Observable<any>;


    if (this.heroe.id) {
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
      
    } else {
      peticion = this.heroesServices.crearHeroe(this.heroe);
    }
    peticion.subscribe(resp => {

      Swal.fire({

         title:this.heroe.nombre,
         text:'Se Actualizo Correctamente',
         icon:'success',


      });

    });
  }

  cargarHeroe(id :string){




  }
}
