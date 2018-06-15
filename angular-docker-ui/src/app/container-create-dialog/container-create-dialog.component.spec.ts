import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCreateDialogComponent } from './container-create-dialog.component';

describe('ContainerCreateDialogComponent', () => {
  let component: ContainerCreateDialogComponent;
  let fixture: ComponentFixture<ContainerCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
