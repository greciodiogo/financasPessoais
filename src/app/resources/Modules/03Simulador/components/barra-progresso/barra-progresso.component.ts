import {
    Component, Input
  } from "@angular/core";

@Component({
    selector: "app-barra-progresso",
    templateUrl: "./barra-progresso.component.html",
    styleUrls: ["./barra-progresso.component.css"],
  })

export class BarraProgressoComponent {

    @Input() valorMinimo: number;
    @Input() valorMaximo: number;
    @Input() valorAtual: number;
  
    constructor() { }
  
    ngOnInit() {
    }
  
  }
  