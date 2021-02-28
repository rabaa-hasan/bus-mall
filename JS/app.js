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

for( let i = 0; i < productArray.length; i++ ) {
  new Product( productArray[i] );
}

function renderNewProduct() {
  let leftIndex = randomNumber( 0, Product.all.length - 1 );
  leftImage.src = Product.all[leftIndex].image;
  leftImage.alt = Product.all[leftIndex].name;
  leftProductIndex = leftIndex;

  let centerIndex;
  do {
    centerIndex = randomNumber( 0, Product.all.length - 1 );
  } while( leftIndex === centerIndex);
  centerImage.src = Product.all[centerIndex].image;
  centerImage.alt = Product.all[centerIndex].name;
  centerProductIndex = centerIndex;

  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Product.all.length - 1 );
  } while( leftIndex === rightIndex || leftIndex === centerIndex || centerIndex === rightIndex);

  rightImage.src = Product.all[rightIndex].image;
  rightImage.alt = Product.all[rightIndex].name;
  rightProductIndex = rightIndex;

  Product.all[leftIndex].shown++;
  Product.all[centerIndex].shown++;
  Product.all[rightIndex].shown++;
}

let button = document.getElementById( 'viewResults' );
button.style.visibility='hidden';


function handelClick( event ) {
  if( Product.counter <= clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'leftImage' || clickedElement.id === 'centerImage' || clickedElement.id === 'rightImage' ) {

      if( clickedElement.id === 'leftImage' ) {
        Product.all[leftProductIndex].clicks++;
      }

      if( clickedElement.id === 'centerImage' ) {
        Product.all[centerProductIndex].clicks++;
      }

      if( clickedElement.id === 'rightImage' ) {
        Product.all[rightProductIndex].clicks++;
      }

      Product.counter++;
      renderNewProduct();
      console.log(Product.all);
    }
  }
  else {
    button.style.visibility='visible';
    console.log( Product.all );
  }
}




imageSection.addEventListener( 'viewResult', handelClick );

// function viewResult() {
//   const parentElement = document.getElementById( 'viewResult' );
//   const ulElement = document.createElement( 'ul' );
//   parentElement.appendChild( ulElement );
//   for ( let i =0; i < Product.all.length; i++ ){
//     const liElement = document.createElement( 'li' );
//     ulElement.appendChild( liElement );
//     liElement.textContent = `${Product.all[i].name} has ${Product.all[i].clicks} clicks, and has been watched ${Product.all[i].shown}  times.`;
//   }
// }


// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

renderNewProduct();



