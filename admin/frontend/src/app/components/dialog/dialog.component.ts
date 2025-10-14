import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnterDirective } from '../../directives/enter.directive';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    imports: [EnterDirective]
})
export class DialogComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() callback: Function = () => {};
  @Input() windowClass: string = '';

  constructor(@Inject(NgbActiveModal) public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close(result: any) {
    if (result) {
      this.activeModal.close('confirmed');
      this.callback();

    } else {
      this.activeModal.dismiss('not confirmed');
    }
  }


}
