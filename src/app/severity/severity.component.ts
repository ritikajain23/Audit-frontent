import { Component, OnInit } from '@angular/core';
import { AuditResponse } from '../AuditResponse';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.css']
})
export class SeverityComponent implements OnInit {
  status!:String;
  duration!:String;
  constructor(private service:MemberService ) {}

  ngOnInit(): void {
    
    this.service.getSeverity(this.service.getToken()).subscribe((data: AuditResponse) => {
      console.log(data);
      console.log(data.projectExecutionStatus);
      this.status=data.projectExecutionStatus;
      this.duration=data.remedialActionDuration;
    });

  }

}
