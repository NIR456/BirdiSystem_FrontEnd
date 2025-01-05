import { Component,OnInit,AfterViewInit} from '@angular/core';
import { EmployeeService } from './Services/employee.service';
import { Requestmodels } from 'src/app/Models/request.model';
import { TokenServiceService } from './Services/token-service.service';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'UI';
  constructor(private Employeeservice: EmployeeService) {
  }

  ngOnInit(): void {
    if(!this.hasToken()){
    this.GetEmployeeLoginToken(); 
    }
  }
  ngAfterViewInit(): void {
    
  }

  hasToken(): boolean {
   // const token = sessionStorage.getItem('authToken');
    let token = localStorage.getItem("authToken");
    return token !== null && token.trim() !== '';
  }

  GetEmployeeLoginToken() {
    let request = new Requestmodels();
    request.RequestUrl = 'api_employee/Employee/Login';
    request.RequestObject = {
      Username: 'nirmal',
      Password: '123'
    };
    this.Employeeservice.postData(request).subscribe(data => {
      if (data && data.responseStatus) {
       // sessionStorage.setItem('authToken', data.responseObject);
       // this.TokenServices.setToken(data.responseObject);
       localStorage.setItem('authToken',data.responseObject);
      }
    });
  }

}
