import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaConfigsComponent } from './conta-configs.component';

describe('ContaConfigsComponent', () => {
  let component: ContaConfigsComponent;
  let fixture: ComponentFixture<ContaConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
