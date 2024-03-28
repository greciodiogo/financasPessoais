import { Component, Input, OnInit } from '@angular/core';
import { FnService } from '@app/shared/services/fn.helper.service';
import { Chart } from 'chart.js';
import { LanguageService } from "@app/shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-grafico-pizza',
  templateUrl: './grafico-pizza.component.html',
  styleUrls: ['./grafico-pizza.component.css']
})
export class GraficoPizzaComponent implements OnInit {
  @Input() dashboard: any;

  public myChart: any = [];

  constructor(public configService: FnService, public languageservice: LanguageService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.chartts(this.dashboard);
    this.languageservice.currentLanguage$.subscribe((language) => {
      this.translate.setDefaultLang(language);
      this.translate.use(language);
      this.chartts(this.dashboard);
    });
  }

  get Pagamentos(): string {
    this.translate.setDefaultLang(localStorage.getItem("lang"));
    this.translate.use(localStorage.getItem("lang"));
    return this.translate.instant("principal.pagamentos");
  }
  get Dividas(): string {
    this.translate.setDefaultLang(localStorage.getItem("lang"));
    this.translate.use(localStorage.getItem("lang"));
    return this.translate.instant("principal.dividas");
  }

  get totaisemAOA(): string {
    this.translate.setDefaultLang(localStorage.getItem("lang"));
    this.translate.use(localStorage.getItem("lang"));
    return this.translate.instant("principal.total_em_ao");
  }

  public chartts(data) {
    var somas = [data.pagas, data.dividas];

    this.myChart = new Chart('myChartPie', {
      type: 'doughnut',
      data: {
        labels: [this.Pagamentos+' (' + this.configService.numberFormat(`${data.pagas}`) + ' AOA)', this.Dividas+'(' + this.configService.numberFormat(`${data.dividas}`) + ' AOA)'],
        datasets: [
          {
            data: somas,
            backgroundColor: [
              'rgba(2, 80, 124)',
              'rgb(171, 41, 27)',
            ],
            borderColor: [
              'rgba(2, 80, 124)',
              'rgb(171, 41, 27)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.textBaseline = 'bottom';
            ctx.font = '17px calibri';
          },
        },
        title: {
          display: true,
          text: this.totaisemAOA,
          fontSize: 16,
          padding: 20,
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgb(255, 99, 132)'
            }
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (tooltipItem, data) {
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                var label = data.labels[tooltipItem.index];
                return `${label}: ${datasetLabel}${tooltipItem.yLabel}`;
              }
            }
          }

        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  }

}
