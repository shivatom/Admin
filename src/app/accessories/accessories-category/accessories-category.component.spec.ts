import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesCategoryComponent } from './accessories-category.component';

describe('AccessoriesCategoryComponent', () => {
  let component: AccessoriesCategoryComponent;
  let fixture: ComponentFixture<AccessoriesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
