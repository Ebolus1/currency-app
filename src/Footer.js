import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {  faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faGithub, faLinkedin, faUser)

class Footer extends React.Component {
   
  render() {
    return (
      <div className="footer">

       <a href="https://github.com/ebolus101">
         <FontAwesomeIcon icon={['fab', 'github']} className="socialIcons footerLinks" size="3x"/>     
       </a>
     </div>
    );
  }
}

export default Footer;
   
