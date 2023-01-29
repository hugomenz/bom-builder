import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainCardComponent } from './components/main-card/main-card.component';
import { TableComponent } from './components/table/table.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ThemeComponent } from './components/theme/theme.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [AppComponent, MainCardComponent, TableComponent, ThemeComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
