const express = require('express');
const request = require('request');
const _ = require('lodash');

const author = {
  name: 'Alvaro',
  lastname: 'Badaracco'
};

const conditionValue = {new: 'Nuevo', used: 'Usado'};


module.exports = function (app) {

  // Search endpoint
  app.route('/api/items')
    .get(function (req, res) {

      // We make the request to ML api with the query parameter received
      let url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.q;
      request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {

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
                currency: result.currency_id,
                decimals: parseInt(result.price.toString().split('.')[1], 10)
              },
              picture: result.thumbnail,
              // We translate the condition
              condition: conditionValue[result.condition],
              free_shipping: result.shipping.free_shipping,
              address: result.address
            };

            newResponse.items.push(newResult);
          });

          res.send(newResponse);
        } else {
          res.send(error);
        }

      });

    });

  // Item details endpoint
  app.route('/api/items/:id')
    .get(function (req, res) {

      // We make the requests to ML api with the id provided
      let detailsUrl = 'https://api.mercadolibre.com/items/' + req.params.id;
      let descriptionUrl = detailsUrl + '/description';
      request(detailsUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          request(descriptionUrl, function (descriptionError, descriptionResponse, descrptionBody) {
            if (!descriptionError && descriptionResponse.statusCode === 200) {

              body = JSON.parse(body);
              descrptionBody = JSON.parse(descrptionBody);

              // We build the response to send to the react app
              let newResponse = {
                author: author,
                item: {
                  id: body.id,
                  price: {
                    amount: body.price,
                    currency: body.currency_id,
                    decimals: parseInt(body.price.toString().split('.')[1])
                  },
                  picture: body.pictures[0].secure_url,
                  // We translate the condition
                  condition: conditionValue[body.condition],
                  sold_quantity: body.sold_quantity,
                  description: descrptionBody.plain_text
                }
              };

              res.send(newResponse);
            } else {
              res.send(descriptionError);
            }
          })
        } else {
          res.send(error);
        }
      })
    })
};
