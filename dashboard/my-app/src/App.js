import "./App.css";
import SideMenu from "./components/side-menu/SideMenu";
import Header from "./components/header/Header";
import { DataCardSmall } from "./components/data-cards/data-card-small/DataCardSmall"; //se pone entre {} caundo archivo de donde se exporta tiene varios exports
import DataCardBig from "./components/data-cards/data-card-big/DataCardBig";
import TableProducts from "./components/table-products/TableProducts";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smallCardsValues: [
        {
          title: "Products in Data Base",
          icon: "fa-clipboard-list",
          value: "n/a",
          color: "primary",
        },
        {
          title: "Amount in products",
          icon: "fa-dollar-sign",
          value: "n/a",
          color: "success",
        },
        {
          title: "Users quantity",
          icon: "fa-user-check",
          value: "n/a",
          color: "warning",
        },
      ],
    };
  }

  async queryProductsAPI(endpoint) {
    const response = await fetch(
      `http://localhost:3000/api/products/${endpoint}`
    );
    return await response.json();
  }
  async queryUsersAPI(endpoint) {
    const response = await fetch(`http://localhost:3000/api/users/${endpoint}`);
    return await response.json();
  }

  async getProductsCount() {
    const countResponse = await this.queryProductsAPI("count");
    return countResponse.count;
  }
  async getProductsTotalPrice() {
    const countResponse = await this.queryProductsAPI("total-price");
    return countResponse.totalPrice;
  }
  async getUsersCount() {
    const countResponse = await this.queryUsersAPI("count");
    return countResponse.count;
  }

  async updateData() {
    const smallCardsValues = [
      {
        title: "Products in Data Base",
        value: (await this.getProductsCount()).toString(),
        color: "primary",
        icon: "fa-clipboard-list",
      },
      {
        title: "Amount in products",
        value: "$ " + (await this.getProductsTotalPrice()).toString(),
        color: "success",
        icon: "fa-dollar-sign",
      },
      {
        title: "Users quantity",
        value: (await this.getUsersCount()).toString(),
        color: "warning",
        icon: "fa-user-check",
      },
    ];

    this.setState({
      smallCardsValues,
    });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <SideMenu />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>
                <div className="row">
                  {this.state.smallCardsValues.map((elem, index) => {
                    return (
                      <DataCardSmall
                        key={index}
                        title={elem.title}
                        value={elem.value}
                        icon={elem.icon}
                        color={elem.color}
                      />
                    );
                  })}
                </div>
                <div className="row">
                  <DataCardBig />
                  <DataCardBig />
                </div>
                <h1 className="h3 mb-2 text-gray-800">
                  All the products in the Database
                </h1>
                <TableProducts />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
