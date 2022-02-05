import { Component, OnInit, Input } from '@angular/core';
import { AlphaVantageService } from '../alpha-vantage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  public currency: string;

  public rate: string;

  constructor(private alphaVantageService: AlphaVantageService) {}

  ngOnInit() {
    try {
      const rateData = [];
      this.alphaVantageService.get(this.currency).subscribe((result) => {
        if (result) {
          rateData.push(result);
        }
        this.rate =
          rateData[0]['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      });
      setInterval(() => {
        this.alphaVantageService.get(this.currency).subscribe((result) => {
          if (result) {
            rateData[0] = result;
          }
          this.rate =
            rateData[0]['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        });
      }, 60000);
    } catch (e) {
      return;
    }
  }
}
