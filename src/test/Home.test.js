import React from 'react';
import {act} from 'recat-dom/test-utils'
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import createClient from './mockClient';
import gql from 'graphql-tag';
import Home from '../views/Home';
const ALL_POST = gql`
 query ALLPOST{
    listPosts{
         _id,
         title
     }
 }
`
const ALL_POST_MOCK = [
    {
        request: {
            quer: ALL_POST
        },
        result: {
            data: {
                listPosts: [
                    { _id: "2234567333", title: "Post 1" },
                    { _id: "4567543222", title: "Post 2" },
                    { _id: "3243242342", title: "Post 3" },
                ]
            }
        }
    }
]
const waitRequest =()=>new Promise(resolve=>setTimeout(resolve));

describe("<Home />", () => {

    it('Render Works', () => {
        const client = createClient(ALL_POST_MOCK);
        const component = mount(
            <ApolloProvider client={client}>
                <Router>
                    <Home />
                </Router>

            </ApolloProvider>);

        expect(component).toMatchSnapshot();
    })

    
    it('Render Posts Works',async () => {
        act(()=>{
            const testRequest = async ()=>{
        const client = createClient(ALL_POST_MOCK);
        await waitRequest();
        const component = mount(
            <ApolloProvider client={client}>
                <Router>
                    <Home />
                </Router>

            </ApolloProvider>);

        expect(component.find('.post-title')).toHaveLength(3);///.toMatchSnapshot();
        //expect(component.find('h4').text()).toBe('Loading...');
        }
        testRequest();
    })
    })
})