import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { User } from '../models/user.models';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Can successfully login with valid email and password
  it('should successfully login with valid email and password', function() {
    const user: User = {
      uid: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    };
    
    spyOn(auth, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve());

    firebaseService.login(user);

    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(user.email, user.password);
  });
});
