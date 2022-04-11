import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Entry } from './entry.module';
import { CategoryService } from '../../categories/shared/category.service';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = 'api/entries'

  constructor(private http: HttpClient, private categoryservice: CategoryService) { }


  public getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataEntries)
    )
  }

  public getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataEntry)
    )
  }

  public create(entry: Entry): Observable<Entry> {



   return this.categoryservice.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataEntry)
        )
      })
    )
  }

  public update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    )
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));
    return entries;
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na requisição =>", error)
    return throwError(error)
  }

  private jsonDataEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  public getByMontAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthYear(entries, month, year))
    )
  }

  private filterByMonthYear(entries: Entry[], month: any, year: number) {
        return entries.filter(entry => {
          const entryData = moment(entry.date, "DD/MM/YYYY");
          const monthMatches = entryData.month() + 1 == month;
          const yearMatches = entryData.year() == month;

          if(monthMatches && yearMatches) return entry;
        })
  }
}
