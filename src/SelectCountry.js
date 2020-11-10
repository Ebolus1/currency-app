import React, { Component } from 'react';


const countryList = [
    "GBP", "CAD", "USD", "AUD", "BGN", "BRL", "CHF", "CNY", "CZK", "DKK", "EUR", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "ZAR"
]


class SelectCountry extends React.Component {
  render() {
    return (
        <select>
            {countryList.map((country) => <option onChange={this.handleBaseChange}key={country} label={country} value={country}></option>)}
        </select>
    )
  }
}
export default SelectCountry;
