import { Component, OnInit} from "@angular/core";
import {GoogleChart} from '../directives/angular2-google-chart.directive';
import { OrderService } from '../services/order.service';
import { Subscription } from "rxjs/Subscription";
import * as util from '../services/util.service';
declare var google:any;
declare var googleLoaded:any;
declare var d3: any;
@Component({
	moduleId: module.id,
	selector : 'order-book-chart',
	template:`
    	<div id="bid_chart" [chartData]="bid_ChartData" [chartOptions]= "bid_ChartOptions" chartType="AreaChart" GoogleChart></div>
		`
})

export class OrderBookChartComponent implements OnInit{
	
	public bid_ChartData = [
          ['Price', 'Volume', {role:'style'}],
          ];	
    public bid_ChartOptions = {
      title: 'Depth',
      legend: 'none',
      hAxis: {title: 'Price', gridlines: { count: 10 }},
      vAxis: {title: 'Cumulative Volume'}
    };

	constructor(private orderService: OrderService) { 

    }
    private orderbookSubscription: Subscription;
    
    ngOnInit(): void {
    	
    	this.getOrderBook();
	}
    
	public getOrderBook(): void {
		this.orderbookSubscription = this.orderService.getOrderBook().subscribe(
			data =>{
				var bidArray=data.order_book.bids;
				bidArray.sort(function(x, y){
   					return d3.ascending(x.price, y.price);
				})
				bidArray = util.formatArray(bidArray);
				bidArray = util.cumulativeArray(bidArray);
				for(let entry in bidArray){
					this.bid_ChartData.push([
						bidArray[entry].price, bidArray[entry].amount, '#ff0000'
					]);
				}
				var askArray=data.order_book.asks;
				askArray.sort(function(x,y){
					return d3.descending(x.price, y.price);
				});	
				askArray = util.formatArray(askArray);
				askArray = util.cumulativeArray(askArray);
				for(let entry in askArray){
					this.bid_ChartData.push([
						askArray[entry].price, askArray[entry].amount, '#808080'
					]);
				}

			}
		);
	}
}