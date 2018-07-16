import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertoComponent } from './enterto.component';

describe('EntertoComponent', () => {
  let component: EntertoComponent;
  let fixture: ComponentFixture<EntertoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
