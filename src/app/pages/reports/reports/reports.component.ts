import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../../entries/shared/entry.module';
import { EntryService } from '../../entries/shared/entry.service';
import   currencyFormatter from 'currency-formatter'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public expenseTotal: any = 0;
  public revenueTotal: any = 0;
  public balance: any = 0;
  public expenseChartData: any;
  public revenueChartData: any;
  public chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  public categories: Category[] = [];
  public entries: Entry[] = [];
  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;


  constructor(private categoryService: CategoryService, private entryService: EntryService ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => this.categories = categories)
  }

  public generateReports(): any {
         const month = this.month.nativeElement.value;
         const year = this.year.nativeElement.value;

         if(!month || !year) {
             alert('Você precisa selecionar o mês e o ano para gerar os relatórios')
         } else {
           this.entryService.getByMontAndYear(month, year).subscribe(this.setValues.bind(this))
         }
  }

  private setValues(entries: Entry[]): any  {
        this.entries = entries;
        this.calculateBalance();
        this.setChartData();
  }

  private calculateBalance(): any {
         let expensiveTotal = 0;
         let revenueTotal = 0;
         this.entries.forEach(entry => {
           if(entry.type == 'revenue') {
                revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'}) 
           } else {
                expensiveTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'}) 
           }
         });

         this.expenseTotal  = currencyFormatter.format(expensiveTotal, { code: 'BRL'});
         this.revenueTotal  = currencyFormatter.format(revenueTotal, { code: 'BRL'});
         this.balance = currencyFormatter.format(revenueTotal - expensiveTotal, { code: 'BRL'})
  }

    private setChartData(): any {

      this.revenueChartData = this.getChartData('revenue', 'Grafico de Receitas',  '#9CCC65'),
      this.expenseChartData = this.getChartData('revenue', 'Grafico de Depesas',  '#e03131')
    }

    private getChartData(entryType: string, title: string, color: string): any {
      const chartData = [];
      this.categories.forEach(categories => {
        // filtering entries by category and type
        const filteringEntries  = this.entries.filter(
          entry => (entry.categoryId  == categories.id) && (entry.type == entryType) 
        );

        // if found entries, then sum entries amount and add to chartData
        if(filteringEntries.length > 0) {
             const totalAmount = filteringEntries.reduce(
               (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL'}), 0
             )

             chartData.push({
               categoryName: categories.name,
               totalAmount: totalAmount
             })
        }
      });
           return {
             labels: chartData.map(item => item.categoryName),
             datasets: [{
               label: title, 
               backgroundColor: color,
               data: chartData.map(item => item.totalAmount)
             }]
           }
    }
}
