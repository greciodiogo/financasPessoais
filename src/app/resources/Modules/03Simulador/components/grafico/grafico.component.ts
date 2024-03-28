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

  constructor(public dashboardService: DashboardService, public languageservice: LanguageService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.chartts(this.facturas);
    this.pushAnos();
    this.languageservice.currentLanguage$.subscribe((language) => {
      this.translate.setDefaultLang(language);
      this.translate.use(language);
      this.chartts(this.facturas);
    });
  }

  public pushAnos() {
    for (let i = this.data_atual; i >= 2019; i--) {
      this.anos.push(i);
    }
  }

  get meses(): string[] {
    return this.translate.instant("principal.meses");
  }

  get TotaisFactPano(): string {
    return this.translate.instant("principal.TotaisFactPano");
  }
  get Facturas(): string {
    return this.translate.instant("navbar.Facturasoption");
  }

  public chartts(facturas) {

    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.meses,
        datasets: [
          {
            label: '# Facturas',
            data: facturas,
            borderColor: 'rgba(0, 188, 212, 0.75)',
            backgroundColor: 'rgba(0, 188, 212, 0.3)',
            pointBorderColor: 'rgba(0, 188, 212, 0)',
            pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
            hideInLegendAndTooltip: true,
            pointBorderWidth: 1,
            fill: true
          },
        ],
      },
      options: {
        responsive: true,
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value: number, index: number, values: number[]) {
                // Personalizar o formato dos números no eixo Y
                let qtdFact = facturas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

                if (qtdFact > 0) {
                  if (Number.isInteger(value)) {
                    return value.toFixed(0);
                  } else {
                    // Se não for um número inteiro, retorna null para não exibir
                    return null;
                  }
                } else {
                  return value * 10;
                }

              }
            },

            display: true,
            scaleLabel: {
              display: true,
              labelString: this.Facturas + ' (Qtd)'
            }
          }]
        },
        title: {
          display: true,
          text: this.TotaisFactPano + ' ' + this.data_atual,
          fontSize: 14,
          padding: 57,
        },

        animation: {
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
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
          this.chartts(data?.qtdFacturasMes);
          this.loading = false;
        }, 2000);
      }, error => this.loading = false);
    }
  }
}
