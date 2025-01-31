import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http=inject(HttpClient);
  constructor() { }

  getCategories() {
    return this.http.get<Category[]>("https://swiftkart-sh8l.onrender.com/category");
  }

  getCategoryById(id:string) {
    return this.http.get<Category[]>('https://swiftkart-sh8l.onrender.com/category/' + id);
  }

  addCategory(name:string) {
    return this.http.post("https://swiftkart-sh8l.onrender.com/category", {
      name: name,
    });
  }

  updateCategory(id: string, name: string) {
    return this.http.put("https://swiftkart-sh8l.onrender.com/category/" + id, {
      name: name,
    });
  }

  deleteCategoryById(id:string) {
    return this.http.delete('https://swiftkart-sh8l.onrender.com/category/' + id);
  }
}
