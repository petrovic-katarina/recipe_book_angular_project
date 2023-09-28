import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { LoggingService } from "../logging.service";

@NgModule({
  declarations: [AlertComponent, LoadingSpinnnerComponent, PlaceholderDirective, DropdownDirective],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent, LoadingSpinnnerComponent, PlaceholderDirective, DropdownDirective, CommonModule],
  entryComponents: [AlertComponent],
  providers: [LoggingService]
})

export class SharedModule {

}