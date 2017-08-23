import React, { Component } from 'react'
import dataitem from '../item-data.js'

require('../styles/item-details.scss');


class ItemDetails extends Component {
  state = {
    categories: ["Celulares y Teléfonos", "Celulares y Smartphones", "iPhone"]
  };

  render() {
    return(
      <div className="details-container">
        <div className="details-header">
          Aca van las categorias
        </div>
        <div className="info-container">
          <div className="image-container">
            <img src={dataitem.pictures[0].secure_url} />

            <div className="description-container">
              Descripción del producto
              <div className="item-description">
                {dataitem.description}
              </div>
            </div>
          </div>
          <div className="price-container">
            <div className="item-condition">{dataitem.condition} - {dataitem.sold_quantity} vendidos</div>
            <div className="item-title">{dataitem.title}</div>
            <div>${dataitem.price}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDetails
