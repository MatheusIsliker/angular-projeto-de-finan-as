import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from "../shared/entry.module";
import { EntryService } from "../shared/entry.service";
import { switchMap } from "rxjs/operators";
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import toastr from 'toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  public currentAction: string;
  public entryForm: FormGroup;
  public pageTitle: string;
  public serverErrorMessages: string[] = null;
  public submittingForm: boolean = false;
  public entry: Entry = new Entry();
  public imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }
  public ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }
  public categories: Array<Category>

  constructor(private entryService: EntryService,
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private category: CategoryService
  ) { }

  ngOnInit(): void {

    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry()
    this.loadCategories()
  }

  ngAfterContentChecked(): void {
    this.setPageTitle()

  }

  public submitForm(): any {

    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createEntry()
    } else {
      this.updateEntry()
    }
  }

  // get typeOptions(): Array<any> {
  //   return Object.entries(Entry.types).map(
  //     ([value, text]) => {
  //       return {
  //         text: text,
  //         value: value
  //       }
  //     }
  //   )
  // }

  private setCurrentAction(): any {

    if (this.router.snapshot.url[0].path == "new") {

      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private buildEntryForm(): void {

    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    })
  }

  private loadEntry(): any {
    if (this.currentAction == "edit") {
      this.router.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get("id")))
      ).subscribe(
        (entry) => {
          this.entry = entry
          this.entryForm.patchValue(entry) // binds loaded data to EntryForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      )
    }
  }

  private setPageTitle(): any {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de novo lançamento"
    } else {
      const entryName = this.entry.name || ''
      this.pageTitle = "Editando Lançamento: " + entryName
    }
  }


  private createEntry(): any {

    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(entry)
      .subscribe(
        entry => this.actionsForSucess(entry),
        error => this.actionsForError(error)
      )
  }

  private updateEntry(): any {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry).subscribe(
      entry => this.actionsForSucess(entry),
      error => this.actionsForError(error)
    )
  }


  private actionsForSucess(entry: Entry): any {
    toastr.success("Solicitação processada com sucesso!");

    this.route.navigateByUrl("entries", { skipLocationChange: true }).then(
      () => this.route.navigate(["entries", entry.id, "edit"])
    )
  }


  private actionsForError(error): any {

    toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor, por favor tente mais tarde."]
  }

  private loadCategories(){
    this.category.getAll().subscribe(
      categories => this.categories = categories
    )
  }
}
