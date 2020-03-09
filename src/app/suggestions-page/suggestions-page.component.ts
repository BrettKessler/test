import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ContactService } from '../services/contact-service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-suggestions-page',
  templateUrl: './suggestions-page.component.html',
  styleUrls: ['./suggestions-page.component.scss']
})
export class SuggestionsPageComponent implements OnInit {
  contactUs: FormGroup;

  constructor(public contact: ContactService, private router: Router) { }

  ngOnInit() {

    this.contactUs = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
    
  }

  onContactUs(){
    this.contact.onSubmitContactForm(this.contactUs.value);
    this.router.navigate(['/'])
  }

}
