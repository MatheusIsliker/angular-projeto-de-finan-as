import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.module'

export class InmemoryDataBase implements InMemoryDbService {


    createDb() {

        const categories: Category[] = [
            { id: 1, name: 'Moradia', description: 'Pagamentos de Conta da casa' },
            { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
            { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
            { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
            { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' }


        ];

        const entries: Entry[] = [
            { id: 1, name: 'Gás de cozinha', categoryId: categories[0].id, category: categories[0], paid: false, date: '14/03/2022', amount: '90,58', type: 'expense', paidText: 'Pedente' } as Entry,
            { id: 2, name: 'Luz', categoryId: categories[0].id, category: categories[0], paid: true, date: '01/03/2022', amount: '70,00', type: 'expense', paidText: 'Pago' } as Entry,
            { id: 3, name: 'Cartão digital', categoryId: categories[0].id, category: categories[0], paid: true, date: '15/03/2022', amount: '200,00', type: 'expense', paidText: 'Pago' } as Entry,
            { id: 4, name: 'Cartão físico', categoryId: categories[0].id, category: categories[0], paid: false, date: '10/03/2022', amount: '500,00', type: 'expense', paidText: 'Pedente' } as Entry,
            { id: 5, name: 'Youtube music', categoryId: categories[2].id, category: categories[2], paid: true, date: '08/03/2022', amount: '20,10', type: 'expense', paidText: 'Pago' } as Entry,
            { id: 6, name: 'Academia', categoryId: categories[2].id, category: categories[2], paid: true, date: '05/03/2022', amount: '100,00', type: 'revenue', paidText: 'Pago' } as Entry,
            { id: 7, name: 'Escola de música', categoryId: categories[2].id, category: categories[2], paid: false, date: '25/03/2022', amount: '200,00', type: 'revenue', paidText: 'Pedente' } as Entry,
            { id: 8, name: 'Aluguel', categoryId: categories[0].id, category: categories[0], paid: true, date: '30/03/2022', amount: '800,00', type: 'expense', paidText: 'Pago' } as Entry,
            { id: 9, name: 'Internet', categoryId: categories[0].id, category: categories[0], paid: false, date: '31/03/2022', amount: '150,00', type: 'expense', paidText: 'Pedente' } as Entry,
            { id: 10, name: 'Plano de celular', categoryId: categories[0].id, category: categories[0], paid: true, date: '15/03/2022', amount: '70,58', type: 'expense', paidText: 'Pago' } as Entry,
            { id: 11, name: 'Natação', categoryId: categories[2].id, category: categories[2], paid: true, date: '02/03/2022', amount: '100,00', type: 'revenue', paidText: 'Pago' } as Entry,
            { id: 12, name: 'Roupas', categoryId: categories[2].id, category: categories[2], paid: false, date: '09/03/2022', amount: '250,00', type: 'expense', paidText: 'Pedente' } as Entry,
            { id: 13, name: 'Água', categoryId: categories[0].id, category: categories[0], paid: true, date: '18/03/2022', amount: '60,58', type: 'expense', paidText: 'Pago' } as Entry,
            { id: 14, name: 'Netflix', categoryId: categories[2].id, category: categories[2], paid: false, date: '19/03/2022', amount: '25,58', type: 'expense', paidText: 'Pedente' } as Entry,
        ]

        return { categories, entries }




    }

}