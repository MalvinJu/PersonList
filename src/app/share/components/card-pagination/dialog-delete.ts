import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogResponse } from "../../models/Dialog";

@Component({
    selector: 'dialog-delete',
    templateUrl: 'dialog-delete.html',
})
export class DialogDelete {
    constructor(
        public dialogRef: MatDialogRef<DialogDelete>,
        @Inject(MAT_DIALOG_DATA) public data: string,
    ) {}

    onClickCancel(): void {
        this.dialogRef.close(DialogResponse.Cancel);
    }

    onClickYes(): void {
        this.dialogRef.close(DialogResponse.Save);
    }
}