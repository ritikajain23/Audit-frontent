import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  
  date!: Date;
  projectName:String='';
  managerName:String='';
  ownerName:String='';
  isSubmitted:boolean=false;

  checkoutForm = this.formBuilder.group({
    name: ['',Validators.required],
    manager: ['',Validators.required],
    owner:['',Validators.required],

  });
  constructor(private formBuilder:FormBuilder,private router:Router,private service:MemberService) { }
  
  ngOnInit(): void {

  }
  onSubmit(): void {
    
    this.isSubmitted=true;
    console.log(this.checkoutForm.value.manager);
    this.projectName=this.checkoutForm.value.name;
    this.managerName=this.checkoutForm.value.manager;
    this.ownerName=this.checkoutForm.value.owner;
    this.service.setProjectName(this.projectName);
    this.service.setManagerName(this.managerName);
    this.service.setOwnerName(this.ownerName);
    if(this.managerName!='' && this.ownerName!='' && this.projectName!=null && this.date!=null)
    this.router.navigate(['/severity']) ;

  }
  change(event:any){
    
    console.log(event.target.value)
    this.date=event.target.value;
    this.service.setDate(this.date);
  }
}
