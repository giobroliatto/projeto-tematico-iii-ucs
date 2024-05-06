import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const socialMedias = [
    { icon: faYoutube, url: 'https://www.youtube.com/@caxiaslixozero5980/videos' },
    { icon: faInstagram, url: 'https://www.instagram.com/caxiaslixozero/' },
    { icon: faFacebook, url: 'https://www.facebook.com/caxiaslixozero/' },
];

function SocialMediaIcons() {
    return (
        <ul className='socialMedias'>
            {socialMedias.map((socialMedia, index) => (
                <li
                    key={index}
                    className={`socialMedia ${getSocialMediaClass(index)}`}
                >
                    <a
                        href={socialMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={socialMedia.icon} />
                    </a>
                </li>
            ))}
        </ul>
    );
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
