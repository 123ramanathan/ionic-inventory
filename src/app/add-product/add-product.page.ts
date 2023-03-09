import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  customAlertOptions:true | undefined
  productForm!: FormGroup;
  Submitted = false;
  productsobj: any = {};
  paramid: any;


  constructor(private fb: FormBuilder,private service:ProductService, private route: ActivatedRoute,
    private router: Router,private modalctrl:ModalController) {
      this.paramid = this.route.snapshot.params['data'];
      console.log(this.paramid)
      if (this.paramid) {
        this.getidProduct(this.paramid)
      }
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, ]],
      oldPrice: ['', Validators.required],
      category:['', Validators.required],
       description:[''],
    });
  }


  onSubmit() {
    
    console.log(this.productForm.value);
    if (this.paramid) {
      this.productForm.value.id = this.paramid
      this.service.updateProduct(this.productForm.value, this.paramid).subscribe(
        res => {
          console.log(res)
          this.modalctrl.dismiss();
          this.router.navigate(['/']);
        })
    }
    else {
      this.service.createProduct(this.productsobj).subscribe(res => {
        console.log(res)
        alert("success fully created")
        this.productForm.reset();
        this.modalctrl.dismiss();
      }, err => {
        alert("something worng")
      }
      )
      this.router.navigate(['/'])
    }
  }
  getidProduct(id: any) {
    this.service.getidProduct(id).subscribe(
      res => {
        console.log(res)
        this.productsobj = res
      })
  }

}
