import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioServiceService } from '../usuario-service.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  constructor(private usuarioService:UsuarioServiceService,private router:Router) { }

  ngOnInit() {

  }

  guardarUsuario(){

    const password = this.usuario.password;
    const secretKey = 'mi_clave_secreta';

    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();\
    this.usuario["password"]=encryptedPassword;

    this.usuarioService.guardarUsuario(this.usuario).subscribe(dato =>{
      console.log(dato);
      this.irAListaUsuario();
    }, error => console.log(error));
  }

  irAListaUsuario(){
    this.router.navigate(['/usuarios']);
  }
  onSubmit(){
    this.guardarUsuario();

  }

}
