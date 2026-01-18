import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's no hash (like #about), scroll to top
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            // If there is a hash, small delay to allow content to render then scroll to hash
            setTimeout(() => {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 0);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
