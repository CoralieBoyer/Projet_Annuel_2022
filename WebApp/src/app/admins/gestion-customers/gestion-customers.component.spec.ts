import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCustomersComponent } from './gestion-customers.component';

describe('GestionCustomersComponent', () => {
  let component: GestionCustomersComponent;
  let fixture: ComponentFixture<GestionCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
