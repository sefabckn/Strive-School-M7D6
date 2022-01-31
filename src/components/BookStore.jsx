import { Component } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Col, Row } from "react-bootstrap";
import { connect } from 'react-redux'
import { getBooksAction } from "../redux/actions";

const mapStateToProps = state => ({
  // the array of books available for purchase
  booksInStock: state.book.stock,
  errorCode: state.book.errorCode
})

const mapDispatchToProps = dispatch => ({
  getBooks: () => {
    dispatch(getBooksAction())
  }
})

class BookStore extends Component {
  state = {
    // previously we were storing the array of fetched books in a local state
    // now we're doing it into the redux store!
    // books = []
    bookSelected: null,
  };

  componentDidMount = async () => {
    // from here I will just have to dispatch getBooksAction,
    // so the network call will happen and the books for the stock array
    // are going to be retrieved
    this.props.getBooks()
  };

  changeBook = (book) => this.setState({ bookSelected: book });

  render() {
    return (
      <Row>
        <Col md={4}>
          <BookList
            bookSelected={this.state.bookSelected}
            changeBook={this.changeBook}
            books={this.props.booksInStock}
            errorCode={this.props.errorCode}
          />
        </Col>
        <Col md={8}>
          <BookDetail
            bookSelected={this.state.bookSelected}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore);
// we'll need both functionalities: read & write
