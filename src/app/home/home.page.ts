import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/product.service';
import { AddProductPage } from '../add-product/add-product.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  displayedColumns: string[] = ['id', 'productName', 'price', 'oldPrice', 'category','description', 'action'];

  length: number = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  productlist:any
  constructor(private service:ProductService,private modalctrl:ModalController) {}
  ngOnInit(): void {
    this.getAllemployeeList()

  }
  async openModal() {
    const modal = await this.modalctrl.create({
      component: AddProductPage,
      cssClass: 'custom-modal-css',
    });
    return await modal.present();
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllemployeeList() {
    this.service.getProductList().subscribe(res => {
      console.log(res);
      this.productlist = res;
      this.dataSource = new MatTableDataSource(this.productlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  deleteEmployee(id: any) {
    this.service.deleteProduct(id).subscribe((res) => {
    this.getAllemployeeList()
    })
  }

}

