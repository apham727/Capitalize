import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.css'], 
})


export class ExpenseTrackerComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public expensesLabels = ['Hotel', 'Transportation', 'Flight', 'Food', 'Attractions', 'Other'];
  public expensesMappings = new Map();
  public amountToAdd;
  public amountCategory;

  public hotels = 150;
  public transportation = 75;
  public flight = 200;
  public food = 50;
  public attractions = 200;
  public other = 100;



  public expensesData = [this.hotels, this.transportation, this.flight, this.food, this.attractions, this.other];
  public expensesType = 'pie';
  constructor() { }

  ngOnInit() {

  }
  public barChartOptions = {
    responsive: true
  };
  updateChart(){
    if (this.amountCategory == undefined) alert("Please select a category.");
    if (this.amountToAdd == undefined) alert ("Please enter an amount.");
    this.expensesData[this.amountCategory] += this.amountToAdd;
    this.chart.chart.update();
  }

}
