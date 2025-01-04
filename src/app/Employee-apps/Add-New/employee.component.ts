import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Requestmodels } from 'src/app/Models/request.model';

@Component({
  selector: 'app-Employee',
  templateUrl: './Employee.component.html',
  styleUrls: ['./Employee.component.sass']
})
export class EmployeeComponent implements OnInit, OnChanges {
  EmployeeForm: FormGroup;
  public IsUpdate: boolean = false;
  @Input() data: any;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,private Employeeservice: EmployeeService) {
    this.EmployeeForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      Designation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.data.id > 0){
      this.IsUpdate = true;
      this.SetFormData(this.data);
   }
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }


  SetFormData(d: any){
    this.EmployeeForm.controls['FirstName'].setValue(d.FirstName);
    this.EmployeeForm.controls['LastName'].setValue(d.LastName);
    this.EmployeeForm.controls['Email'].setValue(d.Email);
    this.EmployeeForm.controls['Designation'].setValue(d.Designation);
  }


  AddEmployeeDetails(){
    if(this.EmployeeForm.valid){
       this.AddEmployeeList(this.EmployeeForm.value);
    }
  }

  CloseModel() {
    this.activeModal.close(false);
  }

  AddEmployeeList(data: any){
    let request = new Requestmodels();
     let d = {
      Id: (this.data.id),
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      Designation: data.Designation
     }
     request.RequestObject = d;
    request.RequestUrl = 'api_employee/Employee/AddOrUpdateEmployeeList';

    this.Employeeservice.postData(request).subscribe(data => {
      if (data && data.responseStatus) {
        this.activeModal.close({update: true});
        this.IsUpdate = false;
      }
    }
    )
  }
}
