import { Component } from "react";
import productDummy from "../../../assets/product_dummy.svg";

class DataCardBig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Nombre Producto",
      id: 1,
      img: "default-image.png",
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/products/last");
    const lastResponse = await response.json();
    const name = lastResponse.lastProduct.name;
    const id = lastResponse.lastProduct.id;
    const img = lastResponse.lastProduct.img;
    this.setState({ name, id, img });
  }

  render() {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Last product in Data Dase
            </h6>
          </div>
          <div className="card-body">
            <div className="text-center">
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: "25rem" }}
                src={`http://localhost:3000/images/products/${this.state.img}`}
                alt="dummy"
              />
            </div>
            <p>{this.state.name}</p>
            <a
              target="_blank"
              rel="nofollow"
              href={`http://localhost:3000/products/${this.state.id}/detail`}
            >
              View product detail
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default DataCardBig;
