import React from 'react';
import FaqCompany from './company';
import faqOperator from './operator';
import faqUser from './user';
import {Route} from 'react-router-dom';


import '../../../styles/style.css'




function FAQ() {
    return (
      <div className="faq" >
          <h1> FAQ </h1>
          <br/> <br/>
          <Route path={'/faq/company'} component={FaqCompany} />
          <Route path={'/faq/operator'} component={faqOperator} />
          <Route path={'/faq/user'} component={faqUser} />
      
    </div>
    );
}

export default FAQ;