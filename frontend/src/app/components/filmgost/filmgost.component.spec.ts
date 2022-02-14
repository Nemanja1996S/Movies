import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmgostComponent } from './filmgost.component';

describe('FilmgostComponent', () => {
  let component: FilmgostComponent;
  let fixture: ComponentFixture<FilmgostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmgostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmgostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
