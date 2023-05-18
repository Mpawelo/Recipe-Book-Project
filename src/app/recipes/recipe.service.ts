import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";


@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Chicken Fillet',
      'Tasty butter chicken fillet',
      'https://izzycooking.com/wp-content/uploads/2021/04/Chicken-Fillets-5.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Butter', 1),
        new Ingredient('Spoon of salt', 1),
        new Ingredient('Spoon of pepper', 1)
      ]),
    new Recipe('Pasta with chicken',
      'Tasty pasta with chicken and sauce',
      'https://ocdn.eu/pulscms-transforms/1/gikk9kpTURBXy9mNWMzYzk4ODkzN2NjMzA2N2NjYzJkYzllNTQxYTg1OS5qcGeTlQMAzQGlzRTIzQuykwmmNDNiMDgyBpMFzQSwzQJ23gABoTAB/blyskawiczny-przepis-na-makaron-z-kurczakiem-nie-pozalujesz.jpg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Chicken', 1),
        new Ingredient('Garlic', 1),
        new Ingredient('Sour cream', 1)
      ])

  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);

  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
