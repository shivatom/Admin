import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesNewComponent } from './accessories-new.component';

describe('AccessoriesNewComponent', () => {
  let component: AccessoriesNewComponent;
  let fixture: ComponentFixture<AccessoriesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
