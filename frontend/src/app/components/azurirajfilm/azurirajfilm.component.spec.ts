import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajfilmComponent } from './azurirajfilm.component';

describe('AzurirajfilmComponent', () => {
  let component: AzurirajfilmComponent;
  let fixture: ComponentFixture<AzurirajfilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzurirajfilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajfilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
