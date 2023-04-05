import style from './Footer.module.css'
import { HiOutlineArrowSmUp } from 'react-icons/hi';
import { FaReact, FaCss3Alt } from 'react-icons/fa'
import { SiRedux, SiTypescript, SiMongodb, SiJavascript } from 'react-icons/si'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className={style.containerFooter}>
      <button className={style.arrowContainer} onClick={scrollToTop}>
        <HiOutlineArrowSmUp />
      </button>

      <div className={style.iconContainer}>
        <p className={style.iconsP}>React</p>
        <FaReact className={style.reactIcon} />
        <p className={style.iconsP}>Redux</p>
        <SiRedux className={style.reactIcon} />
        <p className={style.iconsP}>TypeScript</p>
        <SiTypescript className={style.reactIcon} />
      </div>
      <div className={style.iconContainer}>
        <p className={style.iconsP}>JavaScript</p>
        <SiJavascript className={style.reactIcon} />
        <p className={style.iconsP}>CSS</p>
        <FaCss3Alt className={style.reactIcon} />
        <p className={style.iconsP}>MongoDB</p>
        <SiMongodb className={style.reactIcon} />
      </div>
      <p className={style.copyright}> &copy; 2023 Appdoptame</p>
    </footer>


  )

}

export default Footer;