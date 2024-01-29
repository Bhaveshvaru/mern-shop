import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { data } from '../data/data'

const HomeScreen = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  return (
    <>
      <h2>Latest Products</h2>
      {data ? (
        <Loader></Loader>
      ) : 'error' ? (
        <Message variant='danger'>'error'</Message>
      ) : (
        <Row>
          {data.map((product) => (
            <Col key={product._id} sm={12} md={6} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
