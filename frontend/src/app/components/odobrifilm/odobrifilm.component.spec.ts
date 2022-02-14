import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdobrifilmComponent } from './odobrifilm.component';

describe('OdobrifilmComponent', () => {
  let component: OdobrifilmComponent;
  let fixture: ComponentFixture<OdobrifilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdobrifilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdobrifilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
