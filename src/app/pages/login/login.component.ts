import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  remind = false;

  constructor(public auth: AuthService,
              private router: Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.remind = true;
    }
  }

  login(form: NgForm){
    if( form.invalid ){return;}
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Wait please . . .'
    });
    Swal.showLoading();
    this.auth.login(this.usuario)
      .subscribe(res =>{
        console.log(res)
        Swal.close();
        if(this.remind){
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      }, (err) =>{
        console.log(err.error.error.message)
        Swal.fire({
          type:'error',
          title: 'error sign in',
          text: err.error.error.message
        })
      })
  }

}
