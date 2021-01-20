import { Component, OnInit, DoCheck, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from '../service/estados.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, DoCheck {

  public cadastro: any = 'faça seu cadastro'

  public forms: FormGroup;

  public recebeDados: Array<any> = [];

  public jogos: Array<Teste> = [

    {jogo : 'Mario World', top: 'sim' },
    {jogo : 'Mario World 2', top: 'sim' },
    {jogo : 'zelda a link to past', top: 'sim' },
    {jogo : 'Super Mario kart', top: 'sim' },
    {jogo : 'Donkey kong country', top: 'sim' },
    {jogo : 'Donkey kong country 2: Diddy´s kongs quests', top: 'sim' },

  ]
  
  public jogosPlay: Array<Teste> = [

    {jogo : 'Crash bandicoot 1', top: 'sim' },
    {jogo : 'Crash bandicoot 2', top: 'sim' },
    {jogo : 'Crash bandicoot 3', top: 'sim' },
    {jogo : 'Spryo', top: 'sim' },
    {jogo : 'whinim eleven', top: 'sim' },
  ]

  public value = this._value

  constructor(private formbuilder: FormBuilder, private readonly estadoBr: EstadosService, private ngzone: NgZone) {

    ngzone.runOutsideAngular(() => {

      setInterval(() => this.value = this._value, 1)
    })
  }

  ngOnInit(): void {


    this.estadoBr.estadoService().subscribe((res) => {

      this.recebeDados = res;

    })

    this.forms = this.formbuilder.group({
      email: [null, [Validators.email, Validators.required]],
      senha: [null, [Validators.required, Validators.maxLength(10)]],
      estado: [null, Validators.required]
    })

    console.log(this.forms)
  }

  ngDoCheck() {

    this.value = this._value;
  }

  private get _value(): number {

    return Math.floor(Math.random() * 10)
  }
}

export interface Teste {


  jogo: any;
  top: any
}