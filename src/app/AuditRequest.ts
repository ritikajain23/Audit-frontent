import { AuditDetails } from "./AuditDetails";
import { ChecklistEntity } from "./ChecklistEntity";


export class AuditRequest{

     projectName!:String;
	 projectManagerName!:String;
	 applicationOwnerName!:String;
	 auditDetails!: AuditDetails;
     questionsEntity!:ChecklistEntity;

}