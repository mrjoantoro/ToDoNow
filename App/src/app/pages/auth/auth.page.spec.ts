import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AuthPage } from './auth.page';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // If the user object returned by the login method from firebaseSvc does not have a name, it should still set the user in local storage and navigate to the home page, but should show a toast message welcoming the user with a default message instead of the name.
  it('should set user in local storage and navigate to home page, and show toast message with default welcome message when user object does not have a name', function() {
    // Arrange
    const utilsSvcMock = jasmine.createSpyObj('UtilsService', ['presentToast', 'setElementInLocalStorage', 'routerLink']);
    const firebaseSvcMock = jasmine.createSpyObj('FirebaseService', ['login']);
    const res = {
      user: {
        uid: '123',
        email: 'johndoe@example.com'
      }
    };
    const user = {
      uid: '123',
      name: 'Guest',
      email: 'johndoe@example.com'
    };
    const formValue = {
      email: 'johndoe@example.com',
      password: 'password123'
    };
    const authPage = new AuthPage(firebaseSvcMock, utilsSvcMock);
    authPage.form.setValue(formValue);
    firebaseSvcMock.login.and.returnValue(Promise.resolve(res));

    // Act
    authPage.submit();

    // Assert
    expect(utilsSvcMock.presentToast).toHaveBeenCalledWith({
      message: `Te damos la bienvenida ${user.name}`,
      duration: 1500,
      color: 'primary',
      icon: 'person-outline',
      mode: 'ios'
    });
    expect(utilsSvcMock.setElementInLocalStorage).toHaveBeenCalledWith('user', user);
    expect(utilsSvcMock.routerLink).toHaveBeenCalledWith('/tabs/home');
  });
});
