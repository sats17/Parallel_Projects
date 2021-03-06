import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AlertService } from 'src/app/services/alert.service';
import { BankserviceService } from 'src/app/services/bankservice.service';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  withdrawForm: FormGroup
  submitted:boolean = false

  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private alertService: AlertService,
               private bankService: BankserviceService ) {
      this.formBuilder = formBuilder
   }

   ngOnInit() {

    this.withdrawForm = this.formBuilder.group({
      amount: ['',[
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[0-9]+')  // validates input is digit
      ]]
  });
  }

  get f() { return this.withdrawForm.controls; }

  onSubmit(){
    console.log("or chacha")
    this.submitted = true;

    // stop here if form is invalid
    if (this.withdrawForm.invalid) {
        console.log("invalid")
        return;
    }

    var amount = this.withdrawForm.get("amount").value
    console.log("afasfw"+amount)
    var isWithdraw = this.bankService.WithdrawAmount(amount);
    if(isWithdraw != -1){
      this.alertService.success('Withdraw successful , your current balance is '+isWithdraw, true);
      this.router.navigate(['/useractions']);
    }
    else{
      this.alertService.success('Withdraw Failed , Try again', true);
      this.router.navigate(['/useractions/withdraw']);
    }
    
    
  }
}
