import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TableColumn } from '../../models/TableColumn';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponse } from '../../models/Dialog';
import { DialogDelete } from './dialog-delete';

@Component({
  selector: 'app-card-pagination',
  templateUrl: './card-pagination.component.html',
  styleUrls: ['./card-pagination.component.scss']
})
export class CardPaginationComponent<T> implements OnInit {
  @Input()
  tableColumns: Array<TableColumn> = [];

  @Input()
  tableData: Array<any> = [];

  @Input()
  dataLength: number = 0;

  @Input()
  isLoading: boolean = false;

  @Input()
  pageSize: number = 10;

  @Output() 
  onPageChange = new EventEmitter<PageEvent>();

  @Output() 
  onCellClick = new EventEmitter<T>();

  @Output() 
  onDeleteActionClick = new EventEmitter<T>();

  @Output() 
  onEditActionClick = new EventEmitter<T>();

  filterDebounceObs!: Subscription;
  displayedTableColumns: Array<TableColumn> = [];
  mainTitleColumn: string = "";

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.displayedTableColumns = this.tableColumns.filter(column => column.visible && !column.IsMainTitle);
    this.mainTitleColumn = this.tableColumns.filter(column => column.IsMainTitle)[0].Column;
  }

  onEditActionCellClick(rowData: T) {
    this.onEditActionClick.emit(rowData);
  }

  onDeleteActionCellClick(rowData: any) {
    const dialogRef = this.dialog.open(DialogDelete, {
      data: rowData[this.mainTitleColumn],
    });
    dialogRef.afterClosed().subscribe((result: DialogResponse) => {
      if (result === DialogResponse.Save) {
        this.onDeleteActionClick.emit(rowData);
      }
    });
  }

  announcePageChange(event: PageEvent) {
    this.onPageChange.emit(event);
  }
}
