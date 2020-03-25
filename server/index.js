const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));


const galleryProxy = createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true});
app.use('/seeAllPhotos/**', galleryProxy);

const restaurantProxy = createProxyMiddleware({target: 'http://localhost:8000', changeOrigin: true});
app.use('/currentRestaurant', restaurantProxy);
app.use('/restaurant', restaurantProxy);

const dishesProxy = createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true});
app.use('/getCompany', dishesProxy);
app.use('/getItems', dishesProxy);
app.use('/getPhotos', dishesProxy);
app.use('/getReviews', dishesProxy);

const reviewsProxy = createProxyMiddleware({target: 'http://localhost:3003', changeOrigin: true});
app.use('/api/restaurants/**', reviewsProxy);
app.use('/api/restaurant/**', reviewsProxy);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});