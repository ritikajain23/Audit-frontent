import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklistEntity } from '../ChecklistEntity';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  constructor(private service:MemberService,private router: Router) {}
  auditName:any;
  selectedList:number[]=[];
  Questions!: ChecklistEntity[];

  ngOnInit(): void {
    const JsonObject = JSON.parse(this.service.getAuditTypeSelected().toString())
     this.auditName= JsonObject.auditName;
     this.service.viewQuestions(this.service.getToken(),this.auditName).subscribe((data: ChecklistEntity[]) => {
      console.log(JSON.parse(data.toString()));
      this.Questions=JSON.parse(data.toString());

      
    });
 
  }
  onCheckboxChange(event:any,id:number) {
    if(this.auditName=="Internal"){
   if(event.target.checked){
    this.Questions[id].response="YES";
    this.selectedList.push(id);
   }else{
    this.Questions[id].response="NO";
    this.selectedList.pop();
   }
  }else{
    if(event.target.checked){
      this.Questions[id%6].response="YES";
      this.selectedList.push(id);
     }else{
      this.Questions[id%6].response="NO";
      this.selectedList.pop();
     }
  }
  
  }

  onSubmit(){
   console.log(this.Questions)
   this.service.setQuestionsEntity(this.Questions);
    this.service.setActualNO(this.selectedList.length);
    this.router.navigate(['/project-details'])
  }

    




   
  }


