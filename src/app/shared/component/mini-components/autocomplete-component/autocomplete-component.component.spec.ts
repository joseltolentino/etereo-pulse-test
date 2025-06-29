import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponentComponent } from './autocomplete-component.component';

describe('AutocompleteComponentComponent', () => {
  let component: AutocompleteComponentComponent;
  let fixture: ComponentFixture<AutocompleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
