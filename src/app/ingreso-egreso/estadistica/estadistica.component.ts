import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    setTimeout( () => {
      this.subscription = this.store.select('ingresoEgreso')
              .subscribe( ingresoEgreso => {
                this.contarIngresoEgreso( ingresoEgreso.items );
              });
    }, 500);
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {

      if ( item.tipo === true ) {
        this.cuantosIngresos ++;
        this.ingresos += item.cantidad;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.cantidad;
      }

    });

    this.doughnutChartData = [ this.ingresos, this.egresos ];

  }

}
