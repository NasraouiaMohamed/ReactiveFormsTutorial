import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MustMatch } from './helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }
  submitted = false;
  modalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit(template: TemplateRef<any>): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value));
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  setValueFunction(): void{
    this.signupForm.controls.fullName.setValue('change single control');
  }

  patchValueFunction(): void{
    this.signupForm.patchValue({
      fullName: 'Mohamed Nasraouia',
      email: 'Nasme107@gmail.com',
      password: '123456',
      confirmPassword: '123456'
    });
  }

}
