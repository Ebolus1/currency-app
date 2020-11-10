import React from 'react';

const countryList = [
    "GBP", "CAD", "USD", "AUD", "BGN", "BRL", "CHF", "CNY", "CZK", "DKK", "EUR", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR"
]

class CurrencyConverter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            baseValue: 1,
            otherValue: 1,
            rates: [],
            base: 'GBP',
            other: 'GBP',
            baseMath: 1,
            otherMath: 1,
        }
        this.handleNumChangeBase = this.handleNumChangeBase.bind(this);
        this.handleNumChangeOther = this.handleNumChangeOther.bind(this);
        this.handleChangeBase = this.handleChangeBase.bind(this);
        this.handleChangeOther = this.handleChangeOther.bind(this);
        this.fetchRequest = this.fetchRequest.bind(this);
        this.handleMathBase = this.handleMathBase.bind(this);
        this.handleMathOther = this.handleMathOther.bind(this);

    }
    

    fetchRequest = () => {
        fetch('https://api.exchangeratesapi.io/latest?base='+ (this.state.base)).then((response) => {
    
         if (response.ok) {
          return response.json();
        }
        throw new Error('Request was either a 404 or 500');
         }).then((data) => {
                this.setState({ 
                    rates: data.rates,
                })
            this.setState({baseMath: this.state.rates[this.state.base]}, this.handleMathBase);
            this.setState({otherMath: this.state.rates[this.state.other]}, this.handleMathOther);
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChangeBase = (e) => {
        this.setState({base: e.target.value},this.fetchRequest,this.handleMathBase);     
    }

    handleChangeOther = (e) => {
        this.setState({other: e.target.value},this.fetchRequest,this.setState({otherMath: this.state.rates[this.state.other]}),this.handleMathOther);     
    }

    handleNumChangeBase = (e) => {
        this.setState({baseValue: e.target.value},this.handleMathBase);  
    }

    handleNumChangeOther = (e) => {
        this.setState({otherValue: e.target.value}, this.handleMathOther);  
    }

    handleMathBase = () => {
        console.log(this.state.otherMath);
        const calc1 = ((this.state.baseValue) * (this.state.otherMath));
        this.setState({otherValue: calc1});
    }

    handleMathOther = () => {
        const calc2 = ((this.state.otherValue) / (this.state.otherMath));
        this.setState({baseValue: calc2});

    }

    render() {
        return (
          <div id="converterOuterDiv">
            <div className="table-dark converterInnerDiv">
              <h1 id="curexchange">Currency Converter</h1>
              <hr></hr>
              <select className="phoneView" onChange={this.handleChangeBase}>
                {countryList.map((country) => <option key={country} label={country} value={country}></option>)}
              </select>
           
              <input onChange={this.handleNumChangeBase} className="phoneView" type="number" placeholder="Base Value" label="Value" value={this.state.baseValue}></input>
              <p className="phoneView cconverter">Converts To</p>
              <select className="phoneView" onChange = {this.handleChangeOther}>
                {countryList.map((country) => <option key={country} label={country} value={country}></option>)}
              </select>
              <input onChange={this.handleNumChangeOther} className="phoneView" type="number" placeholder="Exchange Value" label="Value" value={this.state.otherValue}></input>
            </div>
          </div>
        );  
    }
}

export default CurrencyConverter;