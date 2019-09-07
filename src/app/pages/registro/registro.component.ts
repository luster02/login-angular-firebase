import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  constructor(public auth: AuthService,
              private router: Router
    ) { }

  ngOnInit() { 
    this.usuario = new Usuario();
  }

  onSubmit( form: NgForm ){
    if(form.invalid){ return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Wait please . . .'
    });
    Swal.showLoading();
    this.auth.register(this.usuario)
      .subscribe(res =>{
          console.log(res);
          Swal.close();
          this.router.navigateByUrl('/home');
      }, (err) =>{
        console.log(err.error.error.message);
        Swal.fire({
          type:'error',
          title: 'error sign in',
          text: err.error.error.message
        });
      });
  }

}
