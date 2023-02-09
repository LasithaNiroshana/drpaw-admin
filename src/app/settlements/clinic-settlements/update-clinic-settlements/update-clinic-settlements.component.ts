import { Component } from '@angular/core';

@Component({
  selector: 'app-update-clinic-settlements',
  templateUrl: './update-clinic-settlements.component.html',
  styleUrls: ['./update-clinic-settlements.component.scss']
})
export class UpdateClinicSettlementsComponent {
  files: File[] = [];


  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
 
 
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
 
}
