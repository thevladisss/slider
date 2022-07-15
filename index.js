const sliderItem = document.querySelector(".carousel-slider");

function filterPrice(price) {
  const result = [...String(price)]
    .filter((char) => {
      if (char === ".") return char;
      else if (Number(char) == String(char)) {
        return char;
      }
    })
    .join("");
  return Number(result).toFixed(0);
}

const addProduct = (product) => {
  // Creating elements
  const item = document.createElement("figure");
  const itemImg = document.createElement("img");
  const itemInfo = document.createElement("div");
  const itemBrand = document.createElement("h4");
  const itemName = document.createElement("p");
  const itemPriceBlock = document.createElement("div");
  const itemPrice = document.createElement("p");
  // Adding info to product
  itemImg.src = product.imageUrl;
  itemImg.alt = product.name;
  itemBrand.textContent = product.brand;
  itemName.textContent = product.name;
  itemPrice.textContent = product.price;

  // Adding styles
  item.classList.add("carousel-item");
  itemImg.classList.add("carousel-item-img");
  itemInfo.classList.add("product-info");
  itemBrand.classList.add("product-brand");
  itemName.classList.add("product-name");
  itemPriceBlock.classList.add("price-block");
  //Adding to DOM

  // Adding item to Carousel
  item.append(itemImg);
  item.append(itemInfo);
  itemInfo.append(itemBrand);
  itemInfo.append(itemName);
  itemInfo.append(itemPriceBlock);

  product.price = `€${filterPrice(product.price)}`;
  product.listPrice = `€${filterPrice(product.listPrice)}`;
  if (product.listPrice > product.price) {
    const oldPrice = document.createElement("p");
    oldPrice.classList.add("product-old-price");
    oldPrice.textContent = product.listPrice;
    itemPriceBlock.append(oldPrice);
    const newPrice = document.createElement("p");
    newPrice.classList.add("product-price");
    newPrice.classList.add("product-discounted");
    newPrice.textContent = product.price;
    itemPriceBlock.append(newPrice);
  } else {
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("product-price");
    itemPrice.textContent = product.price;
    itemPriceBlock.append(itemPrice);
  }
  sliderItem.append(item);
};

const addLoader = async () => {
  const container = document.querySelector(".carousel-slider");
  const loaderDiv = document.createElement("div");
  const loaderImg = document.createElement("img");
  loaderDiv.classList.add("loader");
  loaderImg.classList.add("loaderImg");
  loaderImg.src = "./slick/ajax-loader.gif";
  loaderDiv.append(loaderImg);
  container.append(loaderDiv);
};
const disableLoader = () => {
  const container = document.querySelector(".carousel-slider");
  const loader = container.querySelector(".loader");
  loader.parentNode.removeChild(loader);
};

const fetchURL =
  "https://nosto-campaign-assets.s3.amazonaws.com/test-task/testtask-products.json";
const fetchProducts = async () => {
  try {
    addLoader();
    const data = await fetch(fetchURL);
    const { products } = await data.json();
    disableLoader();
    products.forEach(addProduct);
    $(sliderItem).slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
            infinite: false,
          },
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
};
fetchProducts();
