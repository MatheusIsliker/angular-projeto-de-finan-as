import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.module';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  public entries: Entry[] = [];

  constructor(private entryservice: EntryService) { }

  ngOnInit(): void {
    this.entryservice.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Error a o carregar a lista')
    )
  }


  public deletarEntry(entry): any {

    const mustDelete = confirm('Deseja realmente excluir este item?')

    if (mustDelete) {
      this.entryservice.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert('Error a o excluir')
      )
    }
  }

}
