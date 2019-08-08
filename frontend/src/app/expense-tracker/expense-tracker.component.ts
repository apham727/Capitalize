import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';



@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.css'], 
})


export class ExpenseTrackerComponent implements OnInit {
  public expensesLabels = ['Hotel', 'Transportation', 'Flight', 'Food', 'Attractions', 'Other'];
  public expensesMappings = new Map();
  
  public expensesData = [120, 150, 180, 90, 50, 40];
  public expensesType = 'pie';
  constructor() { }

  ngOnInit() {

  }

  updateExpenses() {
    this.expensesData
  }

}
