import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserComponent } from './current-user.component';

describe('CurrentUserComponent', () => {
  let component: CurrentUserComponent;
  let fixture: ComponentFixture<CurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CurrentUserComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
