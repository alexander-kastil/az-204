import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './core/login/login.component';
import { MsalAuthFacade } from './auth/state/auth.facade';

describe('AppComponent', () => {
  let auth: any;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj(['isAuthenticated']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, LoginComponent],
      providers: [{ provide: MsalAuthFacade, useValue: auth }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Passion for Food!'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Passion for Food!');
  });

  it('should display the login screen when not auth', () => {
    auth.isAuthenticated.and.returnValue(of(false));
    fixture.detectChanges();
    const login = fixture.debugElement.queryAll(By.directive(LoginComponent));
    expect(login.length).toEqual(1);
    console.log(fixture.debugElement.nativeElement.outerHTML);
  });

  it('should not display the login screen when auth', () => {
    auth.isAuthenticated.and.returnValue(of(true));
    fixture.detectChanges();
    const login = fixture.debugElement.queryAll(By.directive(LoginComponent));
    expect(login.length).toEqual(0);
    console.log(fixture.debugElement.nativeElement.outerHTML);
  });
});
