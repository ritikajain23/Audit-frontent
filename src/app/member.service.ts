import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChecklistEntity } from './ChecklistEntity';
import { AuditRequest } from './AuditRequest';
import { AuditResponse } from './AuditResponse';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) { }
  msg: string = '';
  loggedIn = false;
  auditTypeSelected: String='';
  actualNO!: number;
  ownerName!:String;
  projectName!:String;
  managerName!:String;
  date!:Date;
  questionsEntity!:ChecklistEntity[];
  fullDate!:String;
  userName!:String;
  setUserName(userName:String){this.userName=userName}
  getUserName(){return this.userName}
  setToken(tkn: string) { this.msg = tkn }
  getToken() { return this.msg }
  setLog(log: boolean) { this.loggedIn = log }
  getLog() { return this.loggedIn }
  setAuditTypeSelected(type:String){this.auditTypeSelected=type;}
  getAuditTypeSelected(){return this.auditTypeSelected}
  getActualNO(){return this.actualNO}
  setActualNO(actualNO:number){this.actualNO=actualNO;}
  getOwnerName(){return this.ownerName;}
  setOwnerName(ownerName:String){this.ownerName=ownerName}
  getProjectName(){return this.projectName}
  setProjectName(projectName:String){this.projectName=projectName}
  getManagerName(){return this.managerName}
  setManagerName(managerName:String){this.managerName=managerName}
  getDate(){return this.date}
  setDate(date:Date){this.date=date}
  getQuestionsEntity(){return this.questionsEntity}
  setQuestionsEntity(questionsEntity:ChecklistEntity[]){this.questionsEntity=questionsEntity}

  public generateToken(request: any) {
    let url = "http://localhost:8400/auth/authenticate";
    return this.httpClient.post<string>(url, request, { responseType: 'text' as 'json' });
  }

  public viewQuestions(token: any, auditType: String):Observable<ChecklistEntity[]>{
    let tokenStr = "Bearer " + token;
    let url = `http://localhost:9120/getChecklist`;
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/json; charset=utf-8').set('Authorization', tokenStr);
    let request={
      "auditType":auditType
    }
   return this.httpClient.post<ChecklistEntity[]>(url,request ,{'headers':headers,responseType: 'text' as 'json'});
  }

  public getSeverity(token:any):Observable<AuditResponse>{
    let tokenStr = "Bearer "+token;
    let url = `http://localhost:9092/ProjectExecutionStatus`;
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/json; charset=utf-8').set('Authorization', tokenStr);
    console.log(this.projectName);
    console.log(this.managerName);
    console.log(JSON.parse(this.auditTypeSelected.toString()).auditName);
    
    this.fullDate=this.date.getFullYear()+"-"+this.date.getMonth()+"-"+this.date.getDay()+"T02:50:12.208Z";

    console.log(this.fullDate);
    console.log(this.questionsEntity);
    let request={
      "projectName":this.projectName,
      "projectManagerName":this.managerName,
      "applicationOwnerName":this.ownerName,
      "auditDetails":{
          "auditType":JSON.parse(this.auditTypeSelected.toString()).auditName,
          "auditDate":this.fullDate,
          "questionsWithResponse":this.questionsEntity
      }
    }
    return this.httpClient.post<AuditResponse>(url,request,{'headers':headers});
  }
}