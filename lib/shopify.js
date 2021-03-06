const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };
  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}
///////////////
export async function getProductsInCollection() {
  const query = `
  {
  collection(handle: "frontpage") {
    title
    products(first: 25) {
      edges {
        node {
          id
          title
          handle
          priceRange{minVariantPrice{amount}}
          images(first: 5) {
            edges {
              node {
                altText
                url
              }
            }
          }
        }
      }
    }
  }
}`;

  const response = await ShopifyData(query);

  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}
////////////

export async function getProduct(handle) {
  const query = `
  {
  product(handle: "${handle}") {
    id
    title
    handle
    description
    variants(first: 25) {
      edges {
        node {
          selectedOptions {
            name
            value
          }
          image{altText url}
          title
          id
          priceV2{amount}
        }
      }
    }
    options {
      name
      values
      id
    }
    images(first: 5) {
      edges {
        node {
          altText
          url
        }
      }
    }
  }
}
`;

  const response = await ShopifyData(query);

  const product = response.data.product ? response.data.product : [];

  return product;
}
///////////

export async function getAllProducts() {
  const query = `{
      products(first: 250) {
        edges {
          node {
            id
            handle
          }
        }
       
      }
    }`;

  const response = await ShopifyData(query);
  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}
