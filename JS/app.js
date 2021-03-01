'use strict';
let productArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];

const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

let leftProductIndex = 0;
let centerProductIndex = 0;
let rightProductIndex = 0;
const clickCounter = 25;

function Product(url) {
  this.image = `./img/${url}`;
  this.name = url.split('.')[0];
  this.clicks = 0;
  this.shown = 0;

  Product.all.push(this);
}


Product.all = [];
Product.counter = 0;

for (let i = 0; i < productArray.length; i++) {
  new Product(productArray[i]);
}

function renderNewProduct() {
  let leftIndex = randomNumber(0, Product.all.length - 1);
  leftImage.src = Product.all[leftIndex].image;
  leftImage.alt = Product.all[leftIndex].name;
  leftProductIndex = leftIndex;

  let centerIndex;
  do {
    centerIndex = randomNumber(0, Product.all.length - 1);
  } while (leftIndex === centerIndex);
  centerImage.src = Product.all[centerIndex].image;
  centerImage.alt = Product.all[centerIndex].name;
  centerProductIndex = centerIndex;

  let rightIndex;
  do {
    rightIndex = randomNumber(0, Product.all.length - 1);
  } while (leftIndex === rightIndex || leftIndex === centerIndex || centerIndex === rightIndex);

  rightImage.src = Product.all[rightIndex].image;
  rightImage.alt = Product.all[rightIndex].name;
  rightProductIndex = rightIndex;

  Product.all[leftIndex].shown++;
  Product.all[centerIndex].shown++;
  Product.all[rightIndex].shown++;
}


let button = document.getElementById( 'viewResults' );
button.style.visibility='hidden';


function handelClick(event) {
  if (Product.counter < clickCounter) {
    const clickedElement = event.target;
    if (clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'centerImage') {
      if (clickedElement.id === 'leftImage') {
        Product.all[leftProductIndex].clicks++;
      }
      if (clickedElement.id === 'rightImage') {
        Product.all[rightProductIndex].clicks++;
      }
      if (clickedElement.id === 'centerImage') {
        Product.all[centerProductIndex].clicks++;
      }
      Product.counter++;
      renderNewProduct();
      console.log(Product.counter);
      console.log(Product.all);
    }
  }else{
    button.style.visibility = 'visible';
    removeHandler();
  }
}
imageSection.addEventListener( 'click', handelClick);


function viewResults(){
  const parentElement = document.getElementById( 'results' );
  const ulElement = document.createElement( 'ul' );
  parentElement.appendChild( ulElement );
  for ( let i =0; i < Product.all.length; i++ ){
    const liElement = document.createElement( 'li' );
    ulElement.appendChild( liElement );
    liElement.textContent = `${Product.all[i].name} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].shown}  times.`;
  }
}

function removeHandler() {
  document.getElementById( 'imageSection' ).removeEventListener( 'click', handelClick );
}

function renderChart(){
  let productsNames = [];
  let productsClicks = [];
  let productsViews =[];
  for(let i = 0 ; i < Product.all.length ; i++){
    let productName = Product.all[i].name;
    productsNames.push(productName);
    let productLikes = Product.all[i].clicks;
    productsClicks.push(productLikes);
    let productView = Product.all[i].shown;
    productsViews.push(productView);
  }
  let ctx = document.getElementById('chart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsNames,
      datasets: [{
        label: '# of Votes',
        data: productsClicks,
        backgroundColor: 'rgba(138, 43, 226, 0.2)',
        borderColor: 'rgba(138, 43, 226, 1)',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: productsViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

renderNewProduct();
