import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
    let history = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  if (!shippingAddress) {
    history('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
        <Form.Check type="radio" label="PayPal or Credit Card" id="paypal" name="paymentMethod" value="PayPal" checked 
         onChange={(e)=>{setPaymentMethod(e.target.value) }} >
        </Form.Check>
        </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-4'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
