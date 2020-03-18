import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SuppliesService } from '../services/supplies.service';
import { _ } from 'underscore';
import {Router} from "@angular/router"

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  supplyList: FormGroup;
  pickupList: FormGroup;
  pickupLoading: boolean = false;
  submitLoading: boolean = false;
  supplyArray: any;
  singleSupplyItem: any;
  constructor(private supplyService: SuppliesService, private router: Router) { }

  ngOnInit() {
    this.supplyList = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      zipCode: new FormControl('', [Validators.required]),
      supplyDescription: new FormControl('', [Validators.required]),
      suppliesNeeded: new FormControl('', [Validators.required])
    });
    this.pickupList = new FormGroup({
      pickupName: new FormControl('', [Validators.required]),
      pickupEmail: new FormControl('', [Validators.required]),
      pickupPhoneNumber: new FormControl('', [Validators.required])
    });
    this.supplyService.onGetSupplyLists().subscribe((data: any) => {
      this.supplyArray = data.data;
    })
  }

  get f() { return this.supplyList.controls; }
  get d() { return this.pickupList.controls; }

  onSupplySubmit(){
    if (this.supplyList.invalid) {
      console.log('invalid');
      return;
  }
    this.submitLoading = true;
    return this.supplyService.onSubmitSupplies(this.supplyList.value).subscribe(data => {
      this.submitLoading = false;
      location.reload()
    })
    
  }

  onSupplyClick(value){
     const itemNeeded = _.where(this.supplyArray, {_id: value});
     this.singleSupplyItem = itemNeeded[0];
  }

  onPickupSubmit(value) {
    if (this.pickupList.invalid) {
      console.log('hello')
      return;
    }
    this.pickupLoading = true;
    const pickupData = {
      id: value,
      pickupList: this.pickupList.value,
      pickupInfo: this.singleSupplyItem
    }
    this.router.navigate(['']);
    return this.supplyService.onPickupSupplies(pickupData).subscribe(data => {
      this.pickupLoading
      location.reload()
    })
  }
}
