import React from 'react';
import Chart from 'chart.js';
import { Redirect } from 'react-router-dom';

const countryList = [
    "GBP", "CAD", "USD", "AUD", "BGN", "BRL", "CHF", "CNY", "CZK", "DKK", "EUR", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR"
]

class HChart extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            base: 'GBP',
            other: 'GBP',
        }
     this.chartRef = React.createRef();
     this.handleChangeBase = this.handleChangeBase.bind(this);
     this.handleChangeOther = this.handleChangeOther.bind(this);
     this.buildChart = this.buildChart.bind(this);
     this.getHistoricalRates = this.getHistoricalRates.bind(this);

    }

    componentDidMount() {
        const base = this.state.base;
        const other = this.state.other;
    }


    handleChangeBase = (e) => {
         this.setState({base: e.target.value},this.getHistoricalRates, this.buildChart);
    }

    handleChangeOther = (e) => {
         this.setState({other: e.target.value},this.getHistoricalRates,this.buildChart);        
    }

    buildChart = (labels, data, label) => {
        const chartRef = this.chartRef.current.getContext("2d");
        if (typeof this.chart !== "undefined") {
          this.chart.destroy();
        }
        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: label,
                data,
                fill: false,
                tension: 0,
                borderColor: 'rgb(66,135,245)'
              }
            ]
          },
          options: {
            responsive: true,
          }
        })
      }

    getHistoricalRates = (base, other) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
        fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${this.state.base}&symbols=${this.state.other}`).then((response) => {

        if (response.ok) {
            return response.json();
          }
          throw new Error('Request was either a 404 or 500');
           }).then(data => {
          if (data.error) {
            throw new Error(data.error);
          }
          const chartLabels = Object.keys(data.rates);
          const chartData = Object.values(data.rates).map(rate => rate[this.state.other]);
          const chartLabel = `${this.state.base}/${this.state.other}`;
          this.buildChart(chartLabels, chartData, chartLabel);
        })
        .catch(error => console.error(error.message));
    }

    
    
    render () {
        return (
            <div>
                <div className="welcomeOuter">
                    <div className="welcomeInner table-dark">
                        <h1 id="chartheading" className="table-dark">Historical Currency Rate Comparison</h1>
                        <hr></hr>
                        <p className="table-dark">Chart displays the past 30 days of currency rates selected</p>
                        <p className="table-dark phoneView">Base Currency:</p>
                        <select className="phoneView" onChange={this.handleChangeBase}>
                            {countryList.map((country) => <option key={country} label={country} value={country}></option>)}
                        </select>
                        <p className="table-dark phoneView">Comparison Currency:</p>
                        <select className="phoneView" onChange={this.handleChangeOther}>
                            {countryList.map((country) => <option key={country} label={country} value={country}></option>)}
                        </select>
                        <div>
                            <canvas ref={this.chartRef} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default HChart;