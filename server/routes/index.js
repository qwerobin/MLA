var express = require('express');
var router = express.Router();
const NodeCache = require( "node-cache" );
const MLACache = new NodeCache();
const https = require('https');

const BASE_URL = 'https://api.mercadolibre.com';
const ITEMS_URL = '/sites/MLA';

var dataItem

router.get('/api/items', (req, res) => {
  https.get(BASE_URL+ITEMS_URL+'/search?q='+req.query.q, (resp) => {
    let data = '';
  
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    resp.on('end', () => {
      const resolve = JSON.parse(data);
      
      let items = [];
      let categories = [];

      resolve.filters.map(function(cat) {
        cat.values.map(function(obj) {
          categories = obj.path_from_root;
        })
      })

      success = MLACache.set( "categories", categories );
      success = MLACache.set( "dataSearch", req.query.q );
     
      resolve.results.map(function(elem) {
          items.push(
            {
              'id': elem.id,
              'title': elem.title,
              'price': {
                'currency': elem.currency_id,
                'amount': elem.price,
                'decimals': elem.id,
              },
              'picture': elem.thumbnail,
              'condition': elem.condition,
              'free_shipping': elem.shipping.free_shipping,
              'store_pick_up': elem.shipping.store_pick_up,
              'location': {
              'state_name': elem.address.state_name,
              'city_name': elem.address.city_name,
              }
            }
          )
      });

      const resolveModified = {
        'author': {
          'name': 'Jairo',
          'lastname': 'Pinzon'
        },
        'categories': categories,
        'items': items
      };

      res.send(resolveModified); 
    });
  
  }).on("error", (err) => {
    handlingError(err);
  });
});

router.get('/api/items/:id', (req, res) => {
  https.get(BASE_URL+'/items/'+req.params.id, (resp) => {
    let data = '';
    let description
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const resolve = JSON.parse(data);
      let pictures = [];
      let categories = [];

      resolve.pictures.map(function(pic) {
        pictures.push(pic.secure_url);
      })

      const resolveModified = {
        'author': {
          'name': 'Jairo',
          'lastname': 'Pinzon'
        },
        'categories': categories,
        'item': {
          'id': resolve.id,
          'title': resolve.title,
          'amount': resolve.price,
          'price': {
            'currency': resolve.currency_id,
            'amount': resolve.price,
            'decimals': resolve.price,
          },
          'picture': pictures,
          'condition': resolve.condition,
          'free_shipping': resolve.shipping.free_shipping,
          'sold_quantity': resolve.sold_quantity,
          'description': description,
          'dataToSerch': ''
          }
      };
      _doCallDescription(resolveModified, resolve.id, res);
  
    }).on("error", (err) => {
      handlingError(err);
    });
  });
});



////----------------------------------------
function _doCallDescription(_obj, _id, _res) {
  https.get(BASE_URL+'/items/'+_id+'/description', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const resolveDesc = JSON.parse(data);
      _obj.item.description = resolveDesc.plain_text;

      cats = MLACache.get( "categories" );
      dSearch = MLACache.get( "dataSearch" );
      if ( cats == undefined ){
        _doCallCategories(_obj, _id, _res);
      } else {
        _obj.categories = cats;
        _obj.dataToSerch = dSearch;
        _res.send(_obj);
      }
    });
  }).on("error", (err) => {
    handlingError(err);
  });



////-------------------------
function _doCallCategories(_obj, _id, _res) {
  https.get(BASE_URL+ITEMS_URL+'/search?q='+_id, (resp) => {
    let data = '';
    let categories = [];

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const resolve = JSON.parse(data);

      resolve.filters.map(function(cat) {
        cat.values.map(function(obj) {
          categories = obj.path_from_root;
        })
      })

      _obj.categories = categories;
      _res.send(_obj);

    });
  }).on("error", (err) => {
    handlingError(err);
  });
  }
}


/////---------------------
function handlingError() {
  router.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(err.status).send({message: err.clientMessage});
    res.redirect('/error');
  });
}

module.exports = router