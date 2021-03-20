import Products from "./Products";

export default function TableProducts(props) {
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
              <Products
                name="Tiger Nixon"
                description="System Architect"
                price="$120,800"
                category={["Categoria 01", "Category 02"]}
                color={["Red", "Blue", "Green"]}
                stock="243"
              />
              <Products
                name="Jane Doe"
                description="Fullstack developer"
                price="$320,800"
                category={["Categoria 01", "Category 02", "Category 03"]}
                color={["Red", "Blue", "Green"]}
                stock="245"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
