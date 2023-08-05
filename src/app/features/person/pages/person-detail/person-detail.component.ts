import { Component } from '@angular/core';
import { FormKind, Person } from 'src/app/core/models';
import { PersonService } from '../../services/person.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent {
  formKind: FormKind = FormKind.New;
  id: number = 0;

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    birthday: new FormControl(new Date(), Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    occupation: new FormControl(''),
  });
  FormType = FormKind;

  constructor(private service: PersonService,
    private router: Router,
    private location: Location
  ) 
  { 
    const state = this.router.getCurrentNavigation()!.extras.state!;
    if (!!state) {
      this.formKind = FormKind.Edit;
      this.id = state['id'];
    }

    if (this.formKind === FormKind.Edit) {
      this.form.setValue(this.service.getById(this.id));
    }
  }

  ngOnInit(): void {

  }

  save(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid || this.form.pristine) return;

    if (this.formKind === FormKind.New) {
      this.service.add(this.form.getRawValue() as Person);
    }
    else {
      this.service.edit(this.id, this.form.getRawValue() as Person)
    }
    this.router.navigate(["/"]);
  }

  delete(): void {
    this.service.delete(this.id);
    this.router.navigate(["/"]);
  }
  
  cancel(): void {
    this.location.back();
  }

  // @HostListener('window:beforeunload')
  // canDeactivate(): Observable<boolean> | boolean {
  //   return this.form.pristine;
  // }
}
