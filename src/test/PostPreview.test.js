import React from 'react';
import {shallow} from 'enzyme';
import PostPreview from '../components/PostPreview';


describe('<PostPreview/>',()=>{
    it('Simple render works',()=>{
        const component = shallow(<PostPreview/>);
        expect(component).toMatchSnapshot();
    })

    it('Render whit props Works',()=>{
        const component =shallow(<PostPreview _id={'32323232'} title={'Post prueba'} />
        )

        expect(component.find('.post-title').text()).toBe('Post prueba')
    })

})