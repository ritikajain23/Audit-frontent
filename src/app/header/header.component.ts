import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login!:Boolean;

  constructor(private service:MemberService,private router:Router) { }
  
  ngOnInit(): void {
    this.login=this.service.getLog();
  }
  onClick(){
    this.service.setLog(false);
    this.router.navigate(['/login'])
  }
}
