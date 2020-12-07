import React, { Component } from 'react'
import axios from 'axios'
import FontAwesome from  'react-fontawesome';
import barrios from './barrios'
require('../styles/header.scss');
const _ = require('lodash');

class Header extends Component {
  constructor(props) {
    super(props);
    this.barrios = barrios;

    this.state = {
      searchInput: '',
      operation: '',
      selectBarrio: false,
      showButton: false,
      showRadio: false,
      showReset: false,
    };
    this.selectedBarrios = [];
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSelectBarrio = this.onSelectBarrio.bind(this);
    this.selectNuevoBarrio = this.selectNuevoBarrio.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.restartState = this.restartState.bind(this);
  }

  handleSubmit = () => {
    let barrios = [];
    _.each(this.selectedBarrios, (barrio) => {
      let newBarrio = {
        q: this.state.searchInput,
        OPERATION: this.state.operation,
        city: barrio.filters.city,
      }
      if (barrio.filters.bedrooms !== "") {
        newBarrio.BEDROOMS = barrio.filters.bedrooms  + "-"  + barrio.filters.bedrooms ;
      }
      if (barrio.filters.bathrooms !== "") {
        newBarrio.FULL_BATHROOMS = barrio.filters.bathrooms + "-"  + barrio.filters.bathrooms;
      }
      if (barrio.filters.maxPrice) {
        newBarrio.price = barrio.filters.minPrice + "-" + barrio.filters.maxPrice;
      }
      barrios.push(newBarrio);
    })

    this.props.onSubmit(barrios);
    this.setState({
      showReset: true,
    })
  };

  onChangeValue = (event) => {
    console.log(event.target.value);
    this.setState({
      searchInput: event.target.value,
      showRadio: true,
    })
  }

  onChangeRadio = (event) => {
    console.log(event.target.value);
    this.setState({
      operation: event.target.value,
      showButton: true,
    })
  }

  onSelectBarrio = (event) => {
    let barrio = _.find(this.barrios,['id', event.target.value])
    let newBarrio = {
      name: barrio.name,
      filters: {
        city: barrio.id,
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathrooms: "",
      }
    }
    console.log(newBarrio);
    this.selectedBarrios.push(newBarrio);
    this.setState({
      selectBarrio: false,
      showButton: true,
    })
  }

  restartState = () => {
    this.selectedBarrios = [];
    this.setState({
       searchInput: '',
       operation: '',
       selectBarrio: false,
       showButton: false,
       showRadio: false,
    });
  }

  selectNuevoBarrio = () => {
    this.setState({
      selectBarrio: true,
      showButton: false,
    })
  }

  render() {
    return(
      <div>
        <div className="header-container">
          <div className="header-logo">
            <img src={require('../images/Logo_ML@2x.png')}/>
          </div>
          <div className="header-title">
            ¡Encontrá tu próximo hogar!
          </div>
        </div>
        <div className="type-selection">
          <div className="type-title">Estoy buscando:</div>
          <div className="check-div" onChange={this.onChangeValue}>
            <input type="radio" value="casa" name="busqueda"/> Casa
            <input type="radio" value="apartamento" name="busqueda"/> Apartamento
          </div>
        </div>

        {this.state.showRadio && <div className="type-selection">
          <div className="type-title">Quiero:</div>
          <div className="operation-div" onChange={this.onChangeRadio}>
            <input type="radio" value="242075" name="compra"/> Comprar
            <input type="radio" value="242073" name="alquiler"/> Alquilar
          </div>
        </div>}

        {this.selectedBarrios.map((barrio) => {
          return <div className="barrio-container">
            <div>
              {barrio.name}
            </div>
            <div className="input-wrapper">
              <label htmlFor="minprice" className="input-label">Precio mínimo $ </label>
              <input type="number" id="minprice" name="minprice" className="price-input" onChange={(event) => {barrio.filters.minPrice = event.target.value}} />

              <label htmlFor="maxprice" className="input-label">Precio máximo $ </label>
              <input type="number" id="maxprice" name="maxprice" className="price-input" onChange={(event) => {barrio.filters.maxPrice = event.target.value}} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="bedrooms" className="input-label">Cantidad de dormitorios</label>
              <input type="number" id="bedrooms" name="bedrooms" min="0" max="20" onChange={(event) => {barrio.filters.bedrooms = event.target.value}} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="bathrooms" className="input-label">Cantidad de baños</label>
              <input type="number" id="bathrooms" name="bathrooms" min="0" max="20" onChange={(event) => {barrio.filters.bathrooms = event.target.value}}/>
            </div>
          </div>
        })}

        {this.state.showButton && <button className="add-button" onClick={this.selectNuevoBarrio}>Elegir nuevo barrio</button>}
        {this.state.selectBarrio &&
            <div className="barrios">
              <label htmlFor="cars" className="input-label">Agregar barrio</label>

              <select name="cars" id="cars" value="" onChange={this.onSelectBarrio}>
                <option value="">Elegir</option>
                {this.barrios.map((barrio) => {
                  return <option value={barrio.id}>{barrio.name}</option>
                })}
              </select>
            </div>
        }
        {(this.selectedBarrios.length > 0) &&
        <button className="search-button" onClick={this.handleSubmit}>Buscar</button>}
        {this.state.showReset &&
        <button className="search-button" onClick={this.restartState}>Nueva búsqueda</button>}

      </div>
    )
  }
}

export default Header

