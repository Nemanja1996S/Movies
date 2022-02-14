import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmkorisnikComponent } from './filmkorisnik.component';

describe('FilmkorisnikComponent', () => {
  let component: FilmkorisnikComponent;
  let fixture: ComponentFixture<FilmkorisnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmkorisnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmkorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
