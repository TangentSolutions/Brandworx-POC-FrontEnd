import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchesService } from './matches.service';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [
        CommonModule,
        DropdownDirective
    ],
    providers: [
        MatchesService
    ]
})
export class SharedModule {}