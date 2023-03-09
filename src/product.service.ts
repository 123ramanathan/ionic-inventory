import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL = "http://localhost:3000/posts"
  constructor(private http: HttpClient) { }
  getProductList() {
    return this.http.get<any>(this.URL)
  }
  createProduct(data: any) {
    return this.http.post<any>(this.URL, data)
  }
  updateProduct(data: any, id: any) {
    return this.http.put<any>(this.URL + '/' + id, data)
  }
  deleteProduct(id: number) {
    return this.http.delete<any>(this.URL + '/' + id)
  }
  getidProduct(id: any) {
    return this.http.get<any>(this.URL + '/' + id)
  }

}
