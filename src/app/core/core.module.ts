import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from "ngx-tabs";

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    AppRoutingModule,
    TabsModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    
  ]
})
export class CoreModule {}
