// make all parts as one DYNAMIC_DIRECTIVES 
import { forwardRef }   from '@angular/core';
import {UserComponent} from './user.component'
import {ListComponent} from './list.component'

export const DYNAMIC_DIRECTIVES = [
  forwardRef(() => ListComponent),
  forwardRef(() => UserComponent)
];

// module itself
import { NgModule }      from '@angular/core';
import { CommonModule }  from "@angular/common";
import { FormsModule }   from "@angular/forms";

@NgModule({
  imports:      [ 
      CommonModule,
      FormsModule
  ],
  declarations: [
      DYNAMIC_DIRECTIVES
  ],
  exports: [
      DYNAMIC_DIRECTIVES,
      CommonModule,
      FormsModule
  ]
})
export class PartsModule {

    static forRoot()
    {
        return {
            ngModule: PartsModule,
            providers: [ ], // not used here, but if singleton needed
        };
    }
}