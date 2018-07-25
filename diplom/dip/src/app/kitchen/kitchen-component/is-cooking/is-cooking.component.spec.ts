import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsCookingComponent } from './is-cooking.component';

describe('IsCookingComponent', () => {
  let component: IsCookingComponent;
  let fixture: ComponentFixture<IsCookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsCookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsCookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
