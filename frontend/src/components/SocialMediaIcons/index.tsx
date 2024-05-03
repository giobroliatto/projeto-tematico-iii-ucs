import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const socialMedias = [faYoutube, faInstagram, faFacebook];

function SocialMediaIcons() {
    return(
        <ul className='socialMedias'>
            {socialMedias.map((socialMedia, index) => (
                <li
                    key={index}
                    className={`socialMedia ${getSocialMediaClass(index)}`}>
                    <FontAwesomeIcon icon={socialMedia} />
                </li>
            ))}
        </ul>
    )
}

function getSocialMediaClass(index: number) {
    switch (index) {
        case 0:
            return 'youtube-class';
        case 1:
            return 'instagram-class';
        case 2:
            return 'facebook-class';
        default:
            return '';
    }
}

export default SocialMediaIcons;