import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPartnerComponent } from './profil-partner.component';

describe('ProfilPartnerComponent', () => {
  let component: ProfilPartnerComponent;
  let fixture: ComponentFixture<ProfilPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
