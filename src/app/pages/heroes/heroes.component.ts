import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  listaHeroes: HeroeModel[] = [];
  loading: boolean = false;

  constructor(private heroeService: HeroesService) {}

  ngOnInit(): void {
    this.loading = false;
    this.heroeService.obtenerHeroes().subscribe((resp) => {
      this.listaHeroes = resp;
      this.loading = true;
    });
  }

  borrarHeroe(heroe: HeroeModel, index :number) {
   
   Swal.fire({

title:'¿Está Seguro?',
text:`Está seguro que desea eliminar a ${heroe.nombre}`,
icon:'question',
showConfirmButton:true,
showCancelButton:true
}).then(resp =>{

  if(resp.value){

    this.listaHeroes.splice(index, 1);
    this.heroeService.eliminarHeroe(heroe.id).subscribe();
    


  }

});
   
   
   
  
  }
}
