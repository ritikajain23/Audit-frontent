import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-audit-type',
  templateUrl: './audit-type.component.html',
  styleUrls: ['./audit-type.component.css']
})
export class AuditTypeComponent implements OnInit{
  isSubmitted = false;
  Audit: any = ['SOX', 'Internal'];
  userName!:String;
  constructor(public fb: FormBuilder, private router: Router,
    private service:MemberService){
    
    }
  auditForm = this.fb.group({
    auditName: ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.userName=this.service.getUserName();
    this.router.canceledNavigationResolution='computed';
  }
  changeAudit(e: any) {
    this.auditName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get auditName() {
    return this.auditForm.get('auditName');
  }
  onSubmit(): void {
    this.isSubmitted = true;
    const auditSelect=this.auditForm.value;
    if (!this.auditForm.valid) {
      false;
    } else {
      console.log(JSON.stringify( auditSelect));
            
            this.service.setAuditTypeSelected(JSON.stringify( auditSelect));
            this.router.navigate(['/checklist']) ;
      
    }
  }
}


