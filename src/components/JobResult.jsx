import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import { addToFav, removeFromFav } from "../store/actions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'

/* const mapStateToProps = (s) => s;

const mapDispatchToProps = (dispatch) => ({
  addToFavourites: (company) => dispatch(addToFav(company)),
  removeFromFavourites: (company) => dispatch(removeFromFav(company)),
}); */


const JobResult = ({ data }) => {
  const favourites = useSelector((s) => s.favourites);
  const dispatch = useDispatch()

  const isFav = favourites.elements.includes(data.company_name);
  console.log(isFav, favourites);
  
  const toggleFavourite = () => {
    isFav
      ? dispatch(removeFromFav(data.company_name))
      : dispatch(addToFav(data.company_name));
  };

  return (
    <Row
      className="mx-0 mt-3 p-3"
      style={{ border: "1px solid #00000033", borderRadius: 4 }}
    >
      <Col xs={3} className="d-flex">
        {isFav ? (
          <StarFill
            color="gold"
            size={16}
            className="me-4 my-auto"
            onClick={toggleFavourite}
          />
        ) : (
          <Star
            color="gold"
            size={16}
            className="me-4 my-auto"
            onClick={toggleFavourite}
          />
        )}
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={9}>
        <Link to={{ pathname: data.url }} target="_blank">
          {data.title}
        </Link>
      </Col>
    </Row>
  );
}

export default JobResult;
