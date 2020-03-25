const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 3333;

const app = express();

app.use(express.static(path.join(__dirname, '../public')));


const galleryProxy = createProxyMiddleware({target: 'http://localhost:3004', changeOrigin: true});
app.use('/seeAllPhotos', galleryProxy);
// app.use('/seeAllPhotos/:photoId', galleryProxy);


const restaurantProxy = createProxyMiddleware({target: 'http://localhost:8000', changeOrigin: true});
app.use('/currentRestaurant', restaurantProxy);
app.use('/restaurant', restaurantProxy);

const dishesProxy = createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true});
app.use('/popularDishes/**', dishesProxy);

const reviewsProxy = createProxyMiddleware({target: 'http://localhost:3003', changeOrigin: true});
app.use('/api/restaurants/**', reviewsProxy);
app.use('/api/restaurant/**', reviewsProxy);



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});