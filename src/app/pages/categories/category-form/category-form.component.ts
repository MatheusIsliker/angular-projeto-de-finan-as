import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";
import { switchMap } from "rxjs/operators";
import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  public currentAction: string;
  public categoryForm: FormGroup;
  public pageTitle: string;
  public serverErrorMessages: string[] = null;
  public submittingForm: boolean = false;
  public category: Category = new Category();

  constructor(private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory()
  }

  ngAfterContentChecked(): void {
    this.setPageTitle()

  }

  public submitForm(): any {

    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createCategory()
    } else {
      this.updateCategory()
    }
  }


  private setCurrentAction(): any {

    if (this.router.snapshot.url[0].path == "new") {

      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private buildCategoryForm(): void {

    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  private loadCategory(): any {
    if (this.currentAction == "edit") {
      this.router.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category
          this.categoryForm.patchValue(category) // binds loaded data to CategoryForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      )
    }
  }

  private setPageTitle(): any {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova categoria"
    } else {
      const categoryName = this.category.name || ''
      this.pageTitle = "Editando Categoria: " + categoryName
    }
  }


  private createCategory(): any {

    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSucess(category),
        error => this.actionsForError(error)
      )
  }

  private updateCategory(): any {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    
    this.categoryService.update(category).subscribe(
      category => this.actionsForSucess(category),
      error => this.actionsForError(error)
    )
  }


  private actionsForSucess(category: Category): any {
    toastr.success("Solicitação processada com sucesso!");

    this.route.navigateByUrl("categories", { skipLocationChange: true }).then(
      () => this.route.navigate(["categories", category.id, "edit"])
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
}
