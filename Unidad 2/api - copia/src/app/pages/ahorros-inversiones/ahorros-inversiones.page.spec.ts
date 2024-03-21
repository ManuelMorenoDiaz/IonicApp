import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AhorrosInversionesPage } from './ahorros-inversiones.page';

describe('AhorrosInversionesPage', () => {
  let component: AhorrosInversionesPage;
  let fixture: ComponentFixture<AhorrosInversionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AhorrosInversionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
