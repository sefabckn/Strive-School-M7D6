import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { connect } from 'react-redux'
import { removeFromCartAction } from "../redux/actions";

// for providing read access (for the products array) let's create mapStateToProps
const mapStateToProps = (state) => ({
  products: state.cart.products,
  booksInStock: state.book.stock.length
})

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (index) => {
    console.log('index is', index)
    dispatch(removeFromCartAction(index))
  }
})

const Cart = ({ products, removeFromCart, booksInStock }) => (
  <Row>
    <Col sm={12}>
      <div>The main page has {booksInStock} products available</div>
      <ul style={{ listStyle: "none" }}>
        {products.map((book, i) => (
          <li key={i} className="my-4">
            <Button variant="danger" onClick={() => removeFromCart(i)}>
              <FaTrash />
            </Button>
            <img
              className="book-cover-small"
              src={book.imageUrl}
              alt="book selected"
            />
            {book.title}
          </li>
        ))}
      </ul>
    </Col>
    <Row>
      <Col sm={12} className="font-weight-bold">
        TOTAL:{" "}
        {products.reduce(
          (acc, currentValue) => acc + parseFloat(currentValue.price),
          0
        )}
      </Col>
    </Row>
  </Row>
);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
