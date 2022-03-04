import React,{useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom"
import {Form,Button,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader"
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
    let history = useNavigate()
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister)
    const {loading , error , userInfo} = userRegister
    //setting the state 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')


    const redirect = history.search ? history.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])

    // sunmit handler 
    const submitHandler = (e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage("Password do not match")
        }else {
            dispatch(register(name,email,password))
        }
       
        

    }

  return (
      <FormContainer>
          <h1>Sign Up</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>

          <Form.Group className='mb-2' controlId='name'>
                  <Form.Label>
                    Name
                  </Form.Label>
                  <Form.Control type='name' placeholder='Enter name'
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}} >
                  </Form.Control>
              </Form.Group>


              <Form.Group controlId='email'>
                  <Form.Label>
                    Email Address
                  </Form.Label>
                  <Form.Control type='email' placeholder='Enter email'
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}} >
                  </Form.Control>
              </Form.Group>

              <Form.Group className='mb-2' controlId='password'>
                  <Form.Label>
                    Password
                  </Form.Label>
                  <Form.Control type='password' placeholder='Enter password'
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}} >
                  </Form.Control>
              </Form.Group>

              <Form.Group className='mb-2' controlId='confirmPassword'>
                  <Form.Label>
                   Confirm  Password
                  </Form.Label>
                  <Form.Control type='password' placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e)=>{setConfirmPassword(e.target.value)}} >
                  </Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='pt-2'>
                  Sign Up
              </Button>
          </Form>
          <Row className='py-3'>
              <Row>
                  <Col>
                  Already Have an Account? 
                  <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}
                  > Login</Link>
                  </Col>
              </Row>

          </Row>
      </FormContainer>
  );
};

export default RegisterScreen;
