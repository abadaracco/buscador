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
    .post(function (req, res) {

      // We make the request to ML api with the query parameter received
      let url = 'http://localhost:8080/inmuebles/search';
      request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {

          // We build the response to send to the react app
          let newResponse = {
            author: author,
            items: [],
            categories: []
          };
          body = JSON.parse(body);

          // We build the categories array
          let categories = _.find(body.filters, function (filter) {
            return filter.id === 'category';
          });
          if (categories) {
            _.forEach(categories.values[0].path_from_root, function (category) {
              newResponse.categories.push(category.name)
            });
          }

          // We build each result item
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
          request(descriptionUrl, function (descriptionError, descriptionResponse, descriptionBody) {
            if (!descriptionError && descriptionResponse.statusCode === 200) {

              body = JSON.parse(body);
              descriptionBody = JSON.parse(descriptionBody);

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
                  description: descriptionBody.plain_text,
                  categories: []
                }
              };

              let categoriesUrl = 'https://api.mercadolibre.com/categories/' + body.category_id;
              request(categoriesUrl, function (categoryError, categoryResponse, categoryBody) {
              if (!categoryError && categoryResponse.statusCode === 200) {

                // We build the categories array for the item
                categoryBody = JSON.parse(categoryBody);
                _.forEach(categoryBody.path_from_root, function (category) {
                  newResponse.item.categories.push(category.name)
                });
                res.send(newResponse);
              } else {
                res.send(categoryError);
              }
              });
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
