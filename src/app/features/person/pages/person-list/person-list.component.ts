import { Component, OnInit, Signal, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Router } from '@angular/router';
import { Pagination, Person } from 'src/app/core/models';
import { TableColumn } from 'src/app/share/models/TableColumn';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounce, interval } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  columns: Array<TableColumn> = [
    {
      Title: 'Id',
      Column: 'id',
      ColumnType: 'number',
      IsMainTitle: false,
      visible: false
    },
    {
      Title: 'Name',
      Column: 'name',
      ColumnType: 'number',
      IsMainTitle: true,
      visible: true
    },
    {
      Title: 'Age',
      Column: 'birthday',
      ColumnType: 'age',
      IsMainTitle: false,
      visible: true
    },
    {
      Title: 'Email',
      Column: 'email',
      ColumnType: 'text',
      IsMainTitle: false,
      visible: true
    },
    {
      Title: 'Occupation',
      Column: 'occupation',
      ColumnType: 'text',
      IsMainTitle: false,
      visible: true
    },
  ]
  paginationData: Signal<Pagination<Person[]>> = signal({data: [], count: 0});
  pageIndex: number = 0;
  pageSize: number = 3;
  filterForm: FormGroup = new FormGroup({
    search: new FormControl(""),
  });
  filterDebounceObs!: Subscription;
  
  constructor(private service: PersonService, private router: Router) { 
    this.renderTableData();
  }

  ngOnInit(): void {
    this.filterDebounceObs = this.filterForm.valueChanges
      .pipe(debounce(() => interval(500)))
      .subscribe(data => {
        this.renderTableData();
      });
  }

  new(): void {
    this.router.navigate(["/person-detail"]);
  }

  renderTableData() {
    this.paginationData = this.service.get(this.pageIndex,this.pageSize,this.filterForm.controls['search'].value);
  }

  edit(data: Person): void {
    this.router.navigate(["/person-detail"], { state: { id: data.id }});
  }

  delete(data: Person): void {
    this.service.delete(data.id);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.renderTableData();
  }
}
