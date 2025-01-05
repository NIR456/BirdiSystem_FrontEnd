import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './Employee-apps/Employee-List/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './Employee-apps/Add-New/employee.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenServiceService } from './Services/token-service.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
    }),  
    AppRoutingModule,
    
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenServiceService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
