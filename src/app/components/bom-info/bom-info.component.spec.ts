import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomInfoComponent } from './bom-info.component';

describe('BomInfoComponent', () => {
  let component: BomInfoComponent;
  let fixture: ComponentFixture<BomInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
