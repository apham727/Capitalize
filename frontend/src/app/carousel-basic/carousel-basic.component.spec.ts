import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBasicComponent } from './carousel-basic.component';

describe('CarouselBasicComponent', () => {
  let component: CarouselBasicComponent;
  let fixture: ComponentFixture<CarouselBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
