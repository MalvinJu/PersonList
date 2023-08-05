import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgePipe } from './pipes/age.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardPaginationComponent } from './components/card-pagination/card-pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDelete } from './components/card-pagination/dialog-delete';

@NgModule({
  declarations: [
    AgePipe,
    FormButtonComponent,
    CardPaginationComponent,
    DialogDelete
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    FormButtonComponent,
    CardPaginationComponent
  ]
})
export class ShareModule { }
