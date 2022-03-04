import React, { useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const ProductScreen = () => {
  let { id } = useParams()
  let history = useNavigate()
  const [qty, setQty] = useState(1)
  const productDetails = useSelector((state) => state.productDetails)
  const { product, error, loading } = productDetails
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  //handler
  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`)
  }

  return (
    <div>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value)
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductScreen
