import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent {
  @Input()
  saveButtonText: string = "Add New"

  @Input()
  deleteButtonText: string = "Delete"

  @Input()
  showDeleteButton: boolean = true;

  @Input()
  showSaveButton: boolean = true;

  @Input()
  isLoadingSave: boolean = false;

  @Input()
  isLoadingDelete: boolean = false;

  @Input()
  saveIconName: string = "save";

  @Input()
  deleteIconName: string = "delete";

  @Output() 
  onSaveActionClick = new EventEmitter();

  @Output() 
  onDeleteActionClick = new EventEmitter();

  @Output() 
  onCancelActionClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    if (this.isOnLoadingState()) {
      return;
    }
    this.onSaveActionClick.emit();
  }

  delete() {
    if (this.isOnLoadingState()) {
      return;
    }
    this.onDeleteActionClick.emit();
  }

  cancel() {
    if (this.isOnLoadingState()) {
      return;
    }
    this.onCancelActionClick.emit();
  }

  isOnLoadingState() {
    return this.isLoadingDelete || this.isLoadingSave;
  }
}
