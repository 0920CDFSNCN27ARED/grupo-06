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
          value: "278",
          color: "primary",
        },
        {
          title: "Amount in products",
          icon: "fa-dollar-sign",
          value: "$546.456",
          color: "success",
        },
        {
          title: "Users quantity",
          icon: "fa-user-check",
          value: "83",
          color: "warning",
        },
      ],
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/products/count");
    const count = await response.json();

    const smallCardsValues = [
      {
        title: "Products in Data Base",
        icon: "fa-clipboard-list",
        value: count,
        color: "primary",
      },
      {
        title: "Amount in products",
        icon: "fa-dollar-sign",
        value: "$546.456",
        color: "success",
      },
      {
        title: "Users quantity",
        icon: "fa-user-check",
        value: "83",
        color: "warning",
      },
    ];
    this.setState({ smallCardsValues });
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
