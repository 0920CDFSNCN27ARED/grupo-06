export default function Products(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.price}</td>
      <td>
        <ul>{props.category}</ul>
      </td>
      <td>
        <ul>{props.color}</ul>
      </td>
      <td>{props.stock}</td>
    </tr>
  );
}
