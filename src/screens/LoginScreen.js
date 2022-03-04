import React,{useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom"
import {Form,Button,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader"
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    let history = useNavigate()
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading , error , userInfo} = userLogin
    //setting the state 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const redirect = history.search ? history.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])

    // sunmit handler 
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(login(email,password))
        //DISPATCH LOGIN

    }

  return (
      <FormContainer>
          <h1>Sign In</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
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
              <Button type='submit' variant='primary' className='pt-2'>
                  Sign In 
              </Button>
          </Form>
          <Row className='py-3'>
              <Row>
                  <Col>
                  New Customer? 
                  <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}
                  >Register</Link>
                  </Col>
              </Row>

          </Row>
      </FormContainer>
  );
};

export default LoginScreen;
