import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogObjectsComponent } from './catalog-objects.component';

describe('CatalogObjectsComponent', () => {
  let component: CatalogObjectsComponent;
  let fixture: ComponentFixture<CatalogObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
