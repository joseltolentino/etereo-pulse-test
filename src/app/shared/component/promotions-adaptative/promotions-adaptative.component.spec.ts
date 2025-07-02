import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsAdaptativeComponent } from './promotions-adaptative.component';

describe('PromotionsAdaptativeComponent', () => {
  let component: PromotionsAdaptativeComponent;
  let fixture: ComponentFixture<PromotionsAdaptativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionsAdaptativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsAdaptativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
