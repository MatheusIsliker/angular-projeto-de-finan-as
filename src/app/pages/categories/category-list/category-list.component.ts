import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public categoreis: Category[] = [];

  constructor(private categoryservice: CategoryService) { }

  ngOnInit(): void {
    this.categoryservice.getAll().subscribe(
      categoreis => this.categoreis = categoreis,
      error => alert('Error a o carregar a lista')
    )
  }


  public deletarCategorias(category): any {

    const mustDelete = confirm('Deseja realmente excluir este item?')

    if (mustDelete) {
      this.categoryservice.delete(category.id).subscribe(
        () => this.categoreis = this.categoreis.filter(element => element != category),
        () => alert('Error a o excluir')
      )
    }
  }

}
