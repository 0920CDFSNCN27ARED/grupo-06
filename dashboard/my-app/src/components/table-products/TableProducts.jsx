import { Component } from "react";
import Products from "./Products";

class TableProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [
        {
          name: "n/a",
          description: "n/a",
          price: "n/a",
          category: "n/a",
          color: "n/a",
          stock: "n/a",
        },
      ],
    };
  }
  async componentDidMount() {
    const response = await fetch(`http://localhost:3000/api/products`);
    const prodResponse = await response.json();

    const allProducts = [
      {
        id: prodResponse.data[0].id,
        name: prodResponse.data[0].name,
        description: prodResponse.data[0].description,
        price: prodResponse.data[0].price,
        category: prodResponse.data[0].category.category,
        color: prodResponse.data[0].color,
        stock: prodResponse.data[0].stock,
      },

      {
        id: prodResponse.data[1].id,
        name: prodResponse.data[1].name,
        description: prodResponse.data[1].description,
        price: prodResponse.data[1].price,
        category: prodResponse.data[1].category.category,
        color: prodResponse.data[1].color,
        stock: prodResponse.data[1].stock,
      },
      {
        id: prodResponse.data[2].id,
        name: prodResponse.data[2].name,
        description: prodResponse.data[2].description,
        price: prodResponse.data[2].price,
        category: prodResponse.data[2].category.category,
        color: prodResponse.data[2].color,
        stock: prodResponse.data[2].stock,
      },
      {
        id: prodResponse.data[3].id,
        name: prodResponse.data[3].name,
        description: prodResponse.data[3].description,
        price: prodResponse.data[3].price,
        category: prodResponse.data[3].category.category,
        color: prodResponse.data[3].color,
        stock: prodResponse.data[3].stock,
      },
      {
        id: prodResponse.data[4].id,
        name: prodResponse.data[4].name,
        description: prodResponse.data[4].description,
        price: prodResponse.data[4].price,
        category: prodResponse.data[4].category.category,
        color: prodResponse.data[4].color,
        stock: prodResponse.data[4].stock,
      },
      {
        id: prodResponse.data[5].id,
        name: prodResponse.data[5].name,
        description: prodResponse.data[5].description,
        price: prodResponse.data[5].price,
        category: prodResponse.data[5].category.category,
        color: prodResponse.data[5].color,
        stock: prodResponse.data[5].stock,
      },
      {
        id: prodResponse.data[6].id,
        name: prodResponse.data[6].name,
        description: prodResponse.data[6].description,
        price: prodResponse.data[6].price,
        category: prodResponse.data[6].category.category,
        color: prodResponse.data[6].color,
        stock: prodResponse.data[6].stock,
      },
      {
        id: prodResponse.data[7].id,
        name: prodResponse.data[7].name,
        description: prodResponse.data[7].description,
        price: prodResponse.data[7].price,
        category: prodResponse.data[7].category.category,
        color: prodResponse.data[7].color,
        stock: prodResponse.data[7].stock,
      },
      {
        id: prodResponse.data[8].id,
        name: prodResponse.data[8].name,
        description: prodResponse.data[8].description,
        price: prodResponse.data[8].price,
        category: prodResponse.data[8].category.category,
        color: prodResponse.data[8].color,
        stock: prodResponse.data[8].stock,
      },
      {
        id: prodResponse.data[9].id,
        name: prodResponse.data[9].name,
        description: prodResponse.data[9].description,
        price: prodResponse.data[9].price,
        category: prodResponse.data[9].category.category,
        color: prodResponse.data[9].color,
        stock: prodResponse.data[9].stock,
      },
      {
        id: prodResponse.data[10].id,
        name: prodResponse.data[10].name,
        description: prodResponse.data[10].description,
        price: prodResponse.data[10].price,
        category: prodResponse.data[10].category.category,
        color: prodResponse.data[10].color,
        stock: prodResponse.data[10].stock,
      },
      {
        id: prodResponse.data[11].id,
        name: prodResponse.data[11].name,
        description: prodResponse.data[11].description,
        price: prodResponse.data[11].price,
        category: prodResponse.data[11].category.category,
        color: prodResponse.data[11].color,
        stock: prodResponse.data[11].stock,
      },
      {
        id: prodResponse.data[12].id,
        name: prodResponse.data[12].name,
        description: prodResponse.data[12].description,
        price: prodResponse.data[12].price,
        category: prodResponse.data[12].category.category,
        color: prodResponse.data[12].color,
        stock: prodResponse.data[12].stock,
      },
      {
        id: prodResponse.data[13].id,
        name: prodResponse.data[13].name,
        description: prodResponse.data[13].description,
        price: prodResponse.data[13].price,
        category: prodResponse.data[13].category.category,
        color: prodResponse.data[13].color,
        stock: prodResponse.data[13].stock,
      },
      {
        id: prodResponse.data[14].id,
        name: prodResponse.data[14].name,
        description: prodResponse.data[14].description,
        price: prodResponse.data[14].price,
        category: prodResponse.data[14].category.category,
        color: prodResponse.data[14].color,
        stock: prodResponse.data[14].stock,
      },
    ];

    this.setState({ allProducts });
  }

  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing={"0"}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Categories</th>
                  <th>Colors</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Categories</th>
                  <th>Colors</th>
                  <th>Stock</th>
                </tr>
              </tfoot>
              <tbody>
                {this.state.allProducts.map((elem, index) => {
                  return (
                    <Products
                      key={index}
                      name={elem.name}
                      description={elem.description}
                      price={`$  ${elem.price}`}
                      category={elem.category}
                      color={elem.color}
                      stock={elem.stock}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TableProducts;
