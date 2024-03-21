import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturasRecordatoriosPagosPage } from './facturas-recordatorios-pagos.page';

describe('FacturasRecordatoriosPagosPage', () => {
  let component: FacturasRecordatoriosPagosPage;
  let fixture: ComponentFixture<FacturasRecordatoriosPagosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FacturasRecordatoriosPagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
