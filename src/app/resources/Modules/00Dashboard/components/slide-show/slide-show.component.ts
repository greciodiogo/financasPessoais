import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit, AfterViewInit {
  @ViewChild('slidesContainer') slidesContainer!: ElementRef;


  @Input() slides: any= []
  @Input() indicators: true
 
  currentIndex = 0;
  slideInterval = 8000; // 8 segundos

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngAfterViewInit(): void {
    this.slidesContainer.nativeElement.style.transition = 'transform 0.5s ease-in-out';
  }

  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateSlide();
    }, this.slideInterval);
  }

  updateSlide() {
    this.slidesContainer.nativeElement.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  // Métodos para renderizar os componentes Estatística e Últimos Movimentos
  // get estatisticaTemplate(): any {
  //   return this.estatisticaComponent.templateRef;
  // }

  // get movimentosTemplate(): any {
  //   return this.movimentosComponent.templateRef;
  // }
}
