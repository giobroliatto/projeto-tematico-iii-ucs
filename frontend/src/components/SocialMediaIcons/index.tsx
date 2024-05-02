import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const socialMedias = [faYoutube, faInstagram, faFacebook];

function SocialMediaIcons() {
    return(
        <ul className='socialMedias'>
            { socialMedias.map(socialMedia => (
                <li className='socialMedia'><FontAwesomeIcon icon={socialMedia} /></li>
            )) }
        </ul>
    )
}

export default SocialMediaIcons;