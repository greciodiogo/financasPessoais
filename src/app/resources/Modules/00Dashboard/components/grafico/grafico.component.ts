import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '@app/shared/services/dashboard.service';
import { Chart } from 'chart.js';
import { LanguageService } from "@app/shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  @Input() dashboard: any;

  public loading: boolean = false;

  public anos = [];

  filtroPorPesquisarSeleccionado: any = {}

  public myChart: any = [];

  public facturas = [];

  public data_atual = new Date().getFullYear();

  constructor(public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.chartts(this.facturas);
    this.pushAnos();
    // this.languageservice.currentLanguage$.subscribe((language) => {
    //   this.translate.setDefaultLang(language);
    //   this.translate.use(language);
    //   this.chartts(this.facturas);
    // });
  }

  public pushAnos() {
    for (let i = this.data_atual; i >= 2019; i--) {
      this.anos.push(i);
    }
  }

  get meses(): string[] {
    // return this.translate.instant("principal.meses");
    return ["Janeiro", "Fevereiro", "Março","Abril","Maio"]
  }

  get TotaisFactPano(): string {
    // return this.translate.instant("principal.TotaisFactPano");
    return "Total de Transações em"
  }
  get Facturas(): string {
    // return this.translate.instant("navbar.Facturasoption");
    return "Meses"
  }

  public data = [30,7,40,9,5,30]

  public data2 = [20,10,20,18,10,6]

  public chartts(facturas) {

    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.meses,
        datasets: [
          {
            label: 'Despesas',
            data: this.data,
            borderCapStyle: 'round',
            borderColor: 'rgb(255 101 0 / 79%)',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            hideInLegendAndTooltip: false,
            pointBorderWidth: 1,
            fill: false
          },
          {
            label: 'Receitas',
            data: this.data2,
            borderCapStyle: 'round',
            borderColor: 'rgb(255 255 255 / 55%)',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            hideInLegendAndTooltip: false,
            pointBorderWidth: 1,
            fill: false
          },
        ],
      },
      options: {
        responsive: true,
        legend: { display: true },
        plugins: {
          legend: {
            position: 'top',
          },
        },
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: true,
        //       callback: function (value: number, index: number, values: number[]) {
        //         // Personalizar o formato dos números no eixo Y
        //         let qtdFact = this.dashboard?.totalTransacoes;

        //         if (qtdFact > 0) {
        //           if (Number.isInteger(value)) {
        //             return value.toFixed(0);
        //           } else {
        //             // Se não for um número inteiro, retorna null para não exibir
        //             return null;
        //           }
        //         } else {
        //           return value * 10;
        //         }

        //       }
        //     },
        //     gridLines: {
        //       color: '#254d53a6',
        //       zeroLineColor: '#254d53a6'  // Optional: make zero line transparent as well
        //     },

        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: this.Facturas + ' (Qtd)'
        //     }
        //   }],
        //   xAxes: [{
        //     ticks:{
        //     fontColor: 'white'
        //   },
        //   gridLines: {
        //     color: '#254d53a6',
        //     zeroLineColor: '#254d53a6'  // Optional: make zero line transparent as well
        //   },
        // }]
        // },
        title: {
          display: true,
          text: this.TotaisFactPano + ' ' + this.data_atual,
          fontColor: 'rgba(255, 255, 255, 0.8)',
          fontSize: 13,
          padding: 40,
        },
        

        animation: {
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = 'transparent';
            ctx.textBaseline = 'bottom';
            ctx.font = '15px calibri';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = facturas[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          },
        },
      },
    });
  }

  TrocarValorAno(event) {
    if (event.target.value != '') {
      this.data_atual = event.target.value;
      this.loading = true;
      this.dashboardService.getDashboardByClienteId(this.data_atual).subscribe((data) => {
        setTimeout(() => {
          this.chartts(this.data);
          this.loading = false;
        }, 2000);
      }, error => this.loading = false);
    }
  }
}
