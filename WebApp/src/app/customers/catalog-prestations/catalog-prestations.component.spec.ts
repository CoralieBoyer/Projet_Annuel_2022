import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPrestationsComponent } from './catalog-prestations.component';

describe('CatalogPrestationsComponent', () => {
  let component: CatalogPrestationsComponent;
  let fixture: ComponentFixture<CatalogPrestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPrestationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPrestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
