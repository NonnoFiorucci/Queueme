import React from 'react';
import FaqCompany from './company';
import faqOperator from './operator';
import faqUser from './company';
import {Route} from 'react-router-dom';






function FAQ() {
    return (
      <div style={{textAlign:"center"}}>
          <h1> FAQ </h1>
          <br/> <br/>
          <Route path={'/faq/company'} component={FaqCompany} />
          <Route path={'/faq/operator'} component={faqOperator} />
          <Route path={'/faq/user'} component={faqUser} />
      
    </div>
    );
}

export default FAQ;