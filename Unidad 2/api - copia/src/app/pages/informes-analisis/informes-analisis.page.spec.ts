import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformesAnalisisPage } from './informes-analisis.page';

describe('InformesAnalisisPage', () => {
  let component: InformesAnalisisPage;
  let fixture: ComponentFixture<InformesAnalisisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformesAnalisisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
