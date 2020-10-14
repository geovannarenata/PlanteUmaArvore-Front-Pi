
import { Router } from '@angular/router';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  privacidade: boolean

  

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string
  

  


  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private router: Router
  ) { }

  ngOnInit() {

    let token = localStorage.token

    if (token == '') {
      this.router.navigate(['/login'])
      alert('Faça o login antes de entrar no feed...')
    }

    window.scroll(0, 0)

    this.findAllPostagens()
    this.findAllTemas()
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  publicar() {
    
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    
    if (this.postagem.descricao == null || this.postagem.tema == null) {
      alert('Preencha todos os campos antes de publicar!')
    } else {
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        this.postagem = new Postagem()
        alert('Postagem realizada com sucesso!')
        this.findAllPostagens()
      })
    }
  }


  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }



 /* findByPrivacidadePostagem() {
    if (this.privacidade === true || this.privacidade === false  ) {
      this.findByPrivacidadePostagem()
    } else {
      this.postagemService.getByPrivacidadePostagem(this.postagem.privacidade).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }*/
}