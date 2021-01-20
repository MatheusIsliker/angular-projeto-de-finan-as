import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFilhoComponent } from './forms-filho.component';

describe('FormsFilhoComponent', () => {
  let component: FormsFilhoComponent;
  let fixture: ComponentFixture<FormsFilhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsFilhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsFilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
