import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajfilmComponent } from './dodajfilm.component';

describe('DodajfilmComponent', () => {
  let component: DodajfilmComponent;
  let fixture: ComponentFixture<DodajfilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajfilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajfilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
