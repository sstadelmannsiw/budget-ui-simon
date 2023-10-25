import { Component } from '@angular/core';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { ModalController } from '@ionic/angular';
import {Category, CategoryCriteria} from '../../shared/domain';
import {CategoryService} from "../category.service";
import {ToastService} from "../../shared/service/toast.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  categories: Category[] | null = null;
  readonly initialSort = 'name,asc';
  lastPageReached = false;
  loading = false;
  searchCriteria: CategoryCriteria = { page: 0, size: 25, sort: this.initialSort };
  constructor(private readonly modalCtrl: ModalController,
  private readonly categoryService: CategoryService,
  private readonly toastService: ToastService) {}

  async openModal(category?: Category): Promise<void> {
    const modal = await this.modalCtrl.create({ component: CategoryModalComponent });
    modal.present();
    const { role } = await modal.onWillDismiss();
    console.log('role', role);
  }
}
