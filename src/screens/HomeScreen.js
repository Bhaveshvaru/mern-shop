import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { data } from '../data/data'
console.log(data)

const HomeScreen = () => {
  return (
    <>
      <h2>Latest Products</h2>
      {
        <Row>
          {data.map((product) => (
            <Col key={product._id} sm={12} md={6} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      }
    </>
  )
}

export default HomeScreen
