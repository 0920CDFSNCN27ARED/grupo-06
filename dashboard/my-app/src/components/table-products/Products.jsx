export default function Products(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.price}</td>
      <td>
        <ul>
          {props.category.map((category, i) => (
            <li key={category + i}>{category}</li>
          ))}
        </ul>
      </td>
      <td>
        <ul>
          {props.color.map((color, i) => (
            <li key={color + i}>{color}</li>
          ))}
        </ul>
      </td>
      <td>{props.stock}</td>
    </tr>
  );
}
