// import React, { useEffect, useState } from 'react';
// // include the props passed to the component for later use
// import styled from 'styled-components';
// import Button from '../components/Button';
// import { useMutation, useApolloClient, gql } from '@apollo/client';

// const SIGNUP_USER = gql`
//   mutation signUp($email: String!, $username: String!, $password: String!) {
//     signUp(email: $email, username: $username, password: $password)
//   }
// `;

// const Wrapper = styled.div`
//   border: 1px solid #f5f4f0;
//   max-width: 500px;
//   padding: 1em;
//   margin: 0 auto;
// `;
// const Form = styled.form`
//   label,
//   input {
//     display: block;
//     line-height: 2em;
//   }

//   input {
//     width: 100%;
//     margin-bottom: 1em;
//   }
// `;

// const SignUp = props => {
//     const client = useApolloClient();
//   // set the default state of the form
//   const [values, setValues] = useState();
//   const [signUp,{loading,error}]=useMutation(SIGNUP_USER,{
//       onCompleted:data=>{
//         localStorage.setItem('token', data.signUp);
//         client.writeData({data:{isLoggedIn:true}})

//         props.history.push('/');

//       }
//   });
//   // update the state when a user types in the form
//   const onChange = event => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value
//     });
//   };

//   useEffect(() => {
//     // update the document title
//     document.title = 'Sign Up — Notedified';
//   });
//   return (
//     <Wrapper>
//       <h2>Sign Up</h2>
//       <Form
//         onSubmit={event => {
//           event.preventDefault();
//           signUp({
//               variables:{
//                   ...values
//               }
//           });
//         }}
//       >
//         <label htmlFor="username">Username:</label>
//         <input
//           required
//           type="text"
//           name="username"
//           placeholder="username"
//           onChange={onChange}
//         />
//         <label htmlFor="email">Email:</label>
//         <input
//           required
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={onChange}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           required
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={onChange}
//         />
//         <Button type="submit">Submit</Button>
//       </Form>
//     </Wrapper>
//   );
// };
// export default SignUp;

// rfactored code with UserForm

import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';
const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;
const SignUp = props => {
  useEffect(() => {
    // update the document title
    document.title = 'Sign Up — Notedified';
  });
  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // store the token
      localStorage.setItem('token', data.signUp);
      // update the local cache
      client.writeData({ data: { isLoggedIn: true } });
      // redirect the user to the homepage
      props.history.push('/');
    }
  });
  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/* if the data is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display a error message*/}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};
export default SignUp;
