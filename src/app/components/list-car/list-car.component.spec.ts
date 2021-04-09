import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarComponent } from './list-car.component';

describe('ListCarComponent', () => {
  let component: ListCarComponent;
  let fixture: ComponentFixture<ListCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
