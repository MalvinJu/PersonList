import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Pagination, Person } from 'src/app/core/models';
import { ToastService } from 'src/app/core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  persons: WritableSignal<Person[]>;

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService) 
  { 
      this.persons = signal([]);
      this.getInitialPersonData().subscribe(
        data => {
          this.persons.set(data);
        }
      )
  }

  public getById(id: number): Person {
    const selectedPerson = this.persons().find(person => person.id === id);
    if (!selectedPerson) return new Person();
    return selectedPerson;
  }

  public get(pageIndex: number, pageSize: number, search: string): Signal<Pagination<Person[]>> {
    if (!!search) {
      const lowerSearch = search.toLowerCase();
      const filterPersons = this.persons()
        .filter(person => person.email.toLowerCase().includes(lowerSearch) || person.name.toLowerCase().includes(lowerSearch) || person.occupation.toLowerCase().includes(lowerSearch));

      return computed(() => {
        return {
          data: filterPersons.slice((pageIndex) * pageSize, (pageIndex+1) * pageSize),
          count: filterPersons.length
        }
      })
    }
    else {
      return computed(() => {
        return {
          data: this.persons().slice((pageIndex) * pageSize, (pageIndex+1) * pageSize),
          count: this.persons().length
        }
      })
    }
  } 

  public add(person: Person): Person {
    try {
      person.id = this.getNewId();
      this.persons.mutate(values => values.push(person));
      this.toastService.show("Save successful");
    }
    catch(error) {
      console.log(error);
    }
    return person;
  }

  public edit(id: number, person: Person): Person {
    try {
      this.persons.mutate(values => {
        const existingPerson = values.find(value => value.id === id);
        if (!!existingPerson) {
          Object.assign(existingPerson, person);
        }
      })
      this.toastService.show(`Edit person ${person.name} successful`);
      return person;
    }
    catch(error) {
      console.log(error);
    }
    return person;
  }

  public delete(id: number) {
    try {
      this.persons.mutate(values => {
        const deletedIndex = values.findIndex(value => value.id === id);
        values.splice(deletedIndex,1);
      })
      this.toastService.show("Delete successful");
    }
    catch(error) {
      console.log(error);
    }
  }

  private getInitialPersonData(): Observable<Person[]> {
    return this.httpClient
      .get<Person[]>("/assets/persons.js", {
        responseType: 'json',
      })
      .pipe(
        catchError(res => this.handleError(res)),
      );
  }

  private handleError(err: any): Observable<any> {
    if (err == null) { return of([]); }
    console.log(err);
    this.toastService.show(err, "top", true, 5000, "warn");
    return of(err);
  }

  private getNewId(): number {
    const lastID = this.persons().flatMap(person => person.id).sort().reverse();
    if (lastID.length === 0) return 1
    else return lastID[0]+1;
  }
}
