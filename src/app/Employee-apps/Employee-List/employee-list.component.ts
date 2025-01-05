import { Component, OnInit,AfterViewInit} from '@angular/core';
import { EmployeeComponent } from '../Add-New/employee.component';
import { EmployeeService } from '../../Services/employee.service';
import { Requestmodels } from 'src/app/Models/request.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
//import { TokenServiceService } from 'src/app/Services/token-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit,AfterViewInit {
  public EmployeeListData: Array<any> = [];
  public editdata: Array<any> = [];
  public EmployeeListdataForSearch: Array<any> = [];
  public page: number = 1;
  
  constructor(
    private Employeeservice: EmployeeService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
   // private TokenServices:TokenServiceService
    
  ) {}

  ngOnInit(): void {
   // this.GetEmployeeLoginToken();
    
  }

  ngAfterViewInit(): void {
   // let token = this.TokenServices.getToken();
   // if(token != null){
   setTimeout(()=>{this.GetEmployeeListData();},200)
   // }
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
        
      }
    });
  }

  AddEmployeeDetails(Id: number = 0) {
    const modalRef = this.modalService.open(EmployeeComponent);
    modalRef.componentInstance.data = { 
      id: Id,
      FirstName: (this.editdata.length > 0 ? this.editdata[0].firstName : ''),
      LastName: (this.editdata.length > 0 ? this.editdata[0].lastName : ''),
      Email: (this.editdata.length > 0 ? this.editdata[0].email : ''),
      Designation: (this.editdata.length > 0 ? this.editdata[0].designation : '')
    };
    modalRef.result.then(x => {
      if (x?.update) {
        this.GetEmployeeListData();
        this.editdata = [];
        if (Id > 0) {
          this.toastrService.success('Update Successfully!', '');
        } else {
          this.toastrService.success('Added Successfully!', '');
        }
      }
    });
  }

  GetEmployeeListData() {
    let request = new Requestmodels();
    request.RequestUrl = 'api_employee/Employee/GetEmployeeListData';
    this.Employeeservice.getData(request).subscribe(data => {
      if (data && data.responseStatus) {
        if (data.responseObject.length >= 0) {
          this.EmployeeListData = data.responseObject;
          this.EmployeeListdataForSearch = data.responseObject;
        } else {
          this.toastrService.error(data.ResponseMessage, '');
        }
      }
    });
  }

  EditEmployee(Id: number = 0) {
    this.editdata = this.EmployeeListData.filter(x => x.id == Id);
    this.AddEmployeeDetails(Id);
  }

  DeleteEmployee(Id: number = 0) {
    let request = new Requestmodels();
    request.RequestUrl = 'api_employee/Employee/RemoveEmployeeList?Id=' + Id;
    this.Employeeservice.getData(request).subscribe(data => {
      if (data && data.responseStatus) {
        this.GetEmployeeListData();
        this.toastrService.success('Deleted Successfully!', '');
      } else {
        this.toastrService.error(data.ResponseMessage, '');
      }
    });
  }

  SearchEmployeeList(event: any) {
    let EmployeeListData = this.EmployeeListdataForSearch;
    let searchtext = event.target.value;
    if (searchtext !== "") {
      this.EmployeeListData = EmployeeListData.filter(x => 
        x.firstName.toLowerCase().startsWith(searchtext.toLowerCase()) ||
        x.lastName.toLowerCase().startsWith(searchtext.toLowerCase())
      );
    } else {
      this.EmployeeListData = this.EmployeeListdataForSearch;
    }
  }
}
