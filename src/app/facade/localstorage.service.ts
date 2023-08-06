import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  localUser() {
    let user: any = localStorage.getItem('user');
    let token = JSON.parse(user).localId;
    return token;
  }
}
