import { Component } from '@angular/core';
import { addMonths, set } from 'date-fns';
import { ModalController } from '@ionic/angular';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import {Expense, SortOption} from '../../shared/domain';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-expense-overview',
  templateUrl: './expense-list.component.html',
})
export class ExpenseListComponent {
  date = set(new Date(), { date: 1 });
  readonly sortOptions: SortOption[] = [
    {label: 'Created at (newest first)', value: 'createdAt,desc'},
    {label: 'Created at (oldest first)', value: 'createdAt,asc'},
    {label: 'Date (newest first)', value: 'createdAt,desc'},
    {label: 'Date (oldest first)', value: 'createdAt,asc'},
    {label: 'Name (A-Z)', value: 'name,asc'},
    {label: 'Name (Z-A)', value: 'name,desc'},
  ];
  myForm: FormGroup;
  constructor(private readonly modalCtrl: ModalController) {
    this.myForm = new FormGroup({
      search: new FormControl(''),
      category: new FormControl(''),
      sort: new FormControl(''),
    });
  }

  addMonths = (number: number): void => {
    this.date = addMonths(this.date, number);
  };

  async openModal(expense?: Expense): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ExpenseModalComponent,
      componentProps: { expense: expense ? { ...expense } : {} },
    });
    modal.present();
    const { role } = await modal.onWillDismiss();
    console.log('role', role);
  }
}
