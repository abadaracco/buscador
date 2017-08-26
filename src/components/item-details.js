import React, { Component } from 'react'
import axios from 'axios'

require('../styles/item-details.scss');


class ItemDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentDidMount() {

    // We fetch the item data from the server
    const detailsUrl = 'http://localhost:3000/api/items/' + this.props.params.id;

    axios.get(detailsUrl).then(res => {
      this.setState({data: res.data});
    });

  }

  render() {
    return(
      <div className="details-container">
        <div className="details-header">
          Aca van las categorias
        </div>
        <div className="info-container">
          <div className="image-container">
            {
              this.state.data && this.state.data.item && <img src={this.state.data.item.picture} />
            }



            <div className="description-container">
              Descripción del producto
              <div className="item-description">
                {this.state.data && this.state.data.item && this.state.data.item.description}
              </div>
            </div>
          </div>
          {
            this.state.data && this.state.data.item &&
            <div className="price-container">
              <div className="item-condition">{this.state.data.item.condition} - {this.state.data.item.sold_quantity} vendidos</div>

              <div className="item-title">{this.state.data.item.title}</div>

              <div className="item-price">${this.state.data.item.price.amount}</div>

              <button className="button-buy">Comprar</button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ItemDetails
