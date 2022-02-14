import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledfilmaComponent } from './pregledfilma.component';

describe('PregledfilmComponent', () => {
  let component: PregledfilmaComponent;
  let fixture: ComponentFixture<PregledfilmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledfilmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledfilmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
