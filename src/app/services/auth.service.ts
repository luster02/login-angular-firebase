import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  private api_KEY = 'yourapikey'
  userToken: string;
 


  constructor(private http: HttpClient) { 
    this.getToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  login( usuario: Usuario ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.URL}signInWithPassword?key=${this.api_KEY}`,
      authData
    ).pipe(
      map( res =>{
        this.saveToken( res['idToken'] )
        return res;
      })
    );
  }

  register( usuario: Usuario ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.URL}signUp?key=${this.api_KEY}`,
      authData
    ).pipe(
      map( res =>{
        this.saveToken( res['idToken'] )
        return res;
      })
    );
  }

  private saveToken(idToken : string) {
    this.userToken = idToken
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  getToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
  }

  isAuth(){
    if(this.userToken.length<2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const limitDate = new Date();
    limitDate.setTime(expira);

    if(limitDate>new Date()){
      return true
    }else{
      return false;
    }
   
  }

}
