const express = require('express');
const request = require('request');
const _ = require('lodash');

const result = {
  name: 'hello world search.js'
};

const author = {
  name: 'Alvaro',
  lastname: 'Badaracco'
}


module.exports = function (app) {
  app.route('/api/items')
    .get(function (req, res) {
      let url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.q;
      request(url, function (error, response, body) {

        // We build the response to send to the react app
        let newResponse = {
          author: author,
          items: []
        };
        body = JSON.parse(body);
        _.forEach(body.results, function (result) {
          let newResult = {
            id: result.id,
            title: result.title,
            price: {
              amount: result.price,
              currency: result.currency,
              decimals: result.decimals
            },
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping,
            address: result.address
          };

          newResponse.items.push(newResult);
        });

        res.send(newResponse);
      });

    });

  app.route('/api/items/:id')
    .get(function (req, res) {
      console.log('id', req.params.id);
      res.send(result);
    })
};

