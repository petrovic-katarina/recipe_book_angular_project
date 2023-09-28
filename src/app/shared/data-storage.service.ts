import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const apiKey = 'AIzaSyBSA9J0s5gffZWFEGiSYd6KRhDNyaWcWzE';

    this.http.put(
      `https://ng-course-recipe-book-ba940-default-rtdb.firebaseio.com/recipes.json?auth=${apiKey}`,
      recipes
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>('https://ng-course-recipe-book-ba940-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
