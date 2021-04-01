import { Component } from "react";
import Category from "./Category";

class DataCardBigCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategory: [
        {
          name: "n/a",
          products: "n/a",
        },
      ],
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/products");
    const categoryResponse = await response.json();

    const allCategory = [
      {
        name: categoryResponse.countByCategory[0].name,
        products: categoryResponse.countByCategory[0].products,
      },
      {
        name: categoryResponse.countByCategory[1].name,
        products: categoryResponse.countByCategory[1].products,
      },
      {
        name: categoryResponse.countByCategory[2].name,
        products: categoryResponse.countByCategory[2].products,
      },
      {
        name: categoryResponse.countByCategory[3].name,
        products: categoryResponse.countByCategory[3].products,
      },
      {
        name: categoryResponse.countByCategory[4].name,
        products: categoryResponse.countByCategory[4].products,
      },
      {
        name: categoryResponse.countByCategory[5].name,
        products: categoryResponse.countByCategory[0].products,
      },
      {
        name: categoryResponse.countByCategory[6].name,
        products: categoryResponse.countByCategory[6].products,
      },
    ];
    this.setState({ allCategory });
  }

  render() {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Categories in Data Base
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              {this.state.allCategory.map((elem, index) => {
                return (
                  <Category
                    key={index}
                    name={elem.name}
                    products={elem.products}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataCardBigCategory;
