import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import Input from '../components/Input';
import useForm from '../hooks/useForm';

const ADD_AUTHOR = gql`
    mutation CreateAuthor ($data:createAuthorInput!){
        createAuthor(data:$data){
            _id,
            first_name
        }
    }
`
function Singup({history}){
    const [SendSingup,{error}] =useMutation(ADD_AUTHOR)
    const catchSubmit = async (fields)=>{
        if(fields.password===fields.confirm_password){
            delete fields.confirm_password;
             await SendSingup({variables:{data:{...fields}}})
             error? alert("Hubo un errorsaso") :
             history.push('/login');
        }
        else{
            alert("Los Passwords no coiciden");
        }
    }
    const {inputs,handleInputChange,handleSubmit} = useForm(catchSubmit)
    return(
        <>
        <NavBar/>
        <Header/>
        <main className="container">
            <section className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
                <form onSubmit={handleSubmit}>
                    <Input name="first_name"
                    label="First Name"
                    placeholder="First Name"
                    type ="text"
                    value={inputs.first_name}
                    onChange={handleInputChange}
                    required
                     />
                    <Input name="last_name"
                    label="Last Name"
                    placeholder="Last Name"
                    type ="text"
                    value={inputs.las_name}
                    onChange={handleInputChange}
                    required
                     />
                    <Input name="email"
                    label="Email"
                    placeholder="Email"
                    type ="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    required
                     />
                     <Input name="password"
                    label="Password"
                    placeholder="Password"
                    type ="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    required
                     />
                     <Input name="confirm_password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type ="password"
                    value={inputs.confirm_password}
                    onChange={handleInputChange}
                    required
                     />
                <button type="submit" className="btn btn-primary"> Send</button>  
                </form>

            </div>
            </section>
        </main>
        </>
    );
}

export default Singup;