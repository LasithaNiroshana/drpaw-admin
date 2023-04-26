import { Component,OnInit,AfterViewInit,AfterContentChecked,ChangeDetectorRef } from '@angular/core';
import {ClinicService} from '../../../common/clinic.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmCancelComponent} from '../../../doctors/confirm-cancel/confirm-cancel.component';
import {SalesAgentsService} from '../../../common/sales-agents.service';
import { from, Observable, Subscriber } from 'rxjs';
import { DatePipe } from '@angular/common';


//Interface for payment details
export interface ClinicDetails {
  name: string;
  is_multi_doc:number;
  address:string;
  city:string;
  logo:any;
  active:number;
  province:string;
  district:string;
  br_no:string;
  contact_person:string;
  landline:string;
  mobile: string;
  email:string;
  website:string;
  bank_name:string;
  bank_acc_holder:string;
  bank_acc_no:string;
  bank_branch:string;
  bank_branch_code:string;
  sale:number;
}

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})

export class AddClinicComponent implements OnInit,AfterViewInit,AfterContentChecked{
  // firstFormGroup = this.formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this.formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // thirdFormGroup = this.formBuilder.group({
  //   thirdCtrl: ['', Validators.required],
  // });
  // fourthFormGroup = this.formBuilder.group({
  //   fourthCtrl: ['', Validators.required],
  // });

  clinic:ClinicDetails={
    name: "",
    is_multi_doc:0,
    address:"",
    city:"",
    logo:null,
    active:0,
    province:"",
    district:"",
    br_no:"",
    contact_person:"",
    landline:"",
    mobile: "",
    email:"",
    website:"",
    bank_name:"",
    bank_acc_holder:"",
    bank_acc_no:"",
    bank_branch:"",
    bank_branch_code:"",
    sale:1
  }

  salesA:any=[];
  files: File[] = [];
  image:any;
  clinicLogo:any;

  constructor(private clinicService:ClinicService,private snackbar:MatSnackBar,private dialog:MatDialog,private salesAgents:SalesAgentsService,private formBuilder: FormBuilder,private cdr:ChangeDetectorRef){
    this.cdr.detach();
  }
  
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    //Obtaining sales agents 
    this.salesAgents.getSalesAgentList().subscribe((res:any)=>{
      this.salesA=res;
    });
  }

  ngOnInit() {}
 
 //Removing the file
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
 
  //Open snackbar 
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

  //Adding image file
    onFileChanged(event:any){
      this.image = event.target.files[0] as File;
      console.log(this.image.name);
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.clinic.logo = reader.result;
      };
    }

  //Adding a clinic
  async onSubmit(){
    var formdata = new FormData();

    if(this.image!=null){
      const response = await fetch(this.clinic.logo);
      const blob = await response.blob();
      formdata.append("logo",blob,this.image.name);
    }

    formdata.append("name", this.clinic.name);
    formdata.append("address", this.clinic.address);
    formdata.append("city", this.clinic.city);
    formdata.append("active",this.clinic.active.toString());
    formdata.append("sale",this.clinic.sale.toString());
    formdata.append("mobile", this.clinic.mobile);
    formdata.append("email", this.clinic.email);
    formdata.append("website", this.clinic.website);
    formdata.append("province", this.clinic.province);
    formdata.append("district", this.clinic.district);
    formdata.append("br_no", this.clinic.br_no);
    formdata.append("contact_person", this.clinic.contact_person);
    formdata.append("landline", this.clinic.landline);
    formdata.append("bank_acc_holder", this.clinic.bank_acc_holder);
    formdata.append("bank_name", this.clinic.bank_name);
    formdata.append("bank_acc_no", this.clinic.bank_acc_no);
    formdata.append("bank_branch", this.clinic.city);
    formdata.append("bank_branch_code", this.clinic.bank_branch_code);
    formdata.append("is_multi_doc", this.clinic.is_multi_doc.toString());

        if(
      this.clinic.name!=""
      &&
      this.clinic.address!=""
      &&
      this.clinic.city!=""
      &&
      this.clinic.district!=""
      &&
      this.clinic.province!=""
      &&
      this.clinic.mobile!=""
      // &&
      // this.clinic.email!=""
      &&
      this.clinic.active!=null
      &&
      this.clinic.bank_name!=""
      &&
      this.clinic.bank_acc_holder!=""
      &&
      this.clinic.bank_acc_no!=""
      &&
      this.clinic.bank_branch!=""
      // &&
      // this.clinic.bank_branch_code!=""
    ){
      this.clinicService.SaveClinic(formdata).subscribe({
        complete: () => this.openSnackBar('New clinic added successfully','OK'),
        error: (e) => this.openSnackBar('Error occured while adding new clinic!'+ e,'OK'),
      });
      this.dialog.closeAll();
      
    }
  else{
       this.openSnackBar('One or more fields missing!','OK'); 
  }
  }

  cancelConfirm(){
    // this.dialog.open(ConfirmCancelComponent);
  }
  
}
