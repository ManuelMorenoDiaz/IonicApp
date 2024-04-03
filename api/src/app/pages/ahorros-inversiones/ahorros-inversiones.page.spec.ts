import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { AhorroInversionPage } from './ahorros-inversiones.page';


describe('AhorroInversionPage', () => {
  let component: AhorroInversionPage;
  let fixture: ComponentFixture<AhorroInversionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AhorroInversionPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AhorroInversionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
