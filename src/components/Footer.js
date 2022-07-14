import React from 'react';
import './Footer.scss';
import ghIcon from '../icons/icon-gh.png';
import dsIcon from '../icons/icon-ds.png';
import vkIcon from '../icons/icon-vk.png';

export default function Footer() {
  return (
    <footer>
      <ul>
        <li className="footer-item">2022</li>
        <li className="footer-item">Kirill Cherepanov</li>
        <li className="footer-item">
          <span className="footer-item">
            <a
              className="footer-vk"
              href="https://vk.com/kcherepanov1/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={vkIcon} alt="icon-vk.png" />
            </a>
          </span>
          <span className="footer-item">
            <a
              className="footer-gh"
              href="https://github.com/kissMyUSSR/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={ghIcon} alt="icon-github.png" />
            </a>
          </span>
          <span className="footer-item">
            <a
              className="footer-ds"
              href="https://discordapp.com/users/292300959265062922"
              target="_blank"
              rel="noreferrer"
            >
              <img src={dsIcon} alt="icon discord" />
            </a>
          </span>
        </li>
      </ul>
    </footer>
  );
}
