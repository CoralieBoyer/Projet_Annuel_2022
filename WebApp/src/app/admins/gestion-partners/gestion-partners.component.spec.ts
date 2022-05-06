import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPartnersComponent } from './gestion-partners.component';

describe('GestionPartnersComponent', () => {
  let component: GestionPartnersComponent;
  let fixture: ComponentFixture<GestionPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
