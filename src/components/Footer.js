import React from 'react';
import './Footer.scss';
import ghIcon from '../icons/icon-gh.png';
import dsIcon from '../icons/icon-ds.png';
import vkIcon from '../icons/icon-vk.png';

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__container">
        <li className="footer__item footer__year">2022</li>
        <li className="footer__item footer__name">Kirill Cherepanov</li>
        <li className="footer__item footer__links">
          <span className="footer__icon">
            <a
              className="footer__vk"
              href="https://vk.com/kcherepanov1/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={vkIcon} className="footer_link-img" alt="icon-vk.png" />
            </a>
          </span>
          <span className="footer__icon">
            <a
              className="footer__gh"
              href="https://github.com/kissMyUSSR/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={ghIcon}
                className="footer_link-img"
                alt="icon-github.png"
              />
            </a>
          </span>
          <span className="footer__icon">
            <a
              className="footer__ds"
              href="https://discordapp.com/users/292300959265062922"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={dsIcon}
                className="footer_link-img"
                alt="icon discord"
              />
            </a>
          </span>
        </li>
      </ul>
    </footer>
  );
}
