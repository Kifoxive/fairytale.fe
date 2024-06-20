import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// import { getApplicationIsOverlayShown } from "../../redux/selectors/applicationSelectors";

export const useHandleFixedHeaderMenu = () => {
    // const [isHovered, setIsHovered] = useState(false);
    // const isContactOverlayShown = useSelector(getApplicationIsOverlayShown);
    // const [isFixed, setIsFixed] = useState(false);
    // const [isVisible, setIsVisible] = useState(false);
    // const [isLanguageSwitchOpen, setIsLanguageSwitchOpen] = useState(false);
    // let lastScroll = 0;
    // const handleScroll = useCallback(() => {
    //   if (isContactOverlayShown) {
    //     return;
    //   }
    //   const currentScroll = window.scrollY;
    //   if (lastScroll > currentScroll) {
    //     setIsVisible(true);
    //     setIsLanguageSwitchOpen(false);
    //   }
    //   if ((lastScroll < currentScroll || currentScroll === 0) && !isHovered) {
    //     setIsVisible(false);
    //     setIsFixed(currentScroll > 100);
    //   }
    //   lastScroll = currentScroll;
    // }, [lastScroll, isContactOverlayShown, isHovered, isVisible]);
    // useEffect(() => {
    //   handleScroll();
    //   document.addEventListener("scroll", handleScroll);
    //   return () => document.removeEventListener("scroll", handleScroll);
    // }, []);
    // return { isVisible, isFixed, isLanguageSwitchOpen, setIsLanguageSwitchOpen, setIsHovered };
};
