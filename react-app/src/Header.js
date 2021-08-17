import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

const Header = ({ title, width, height }) => {
    
    return (
        <header>
            <h1>{title}</h1>
            {width < 768 ? <FaMobileAlt /> 
                : width < 992 ? <FaTabletAlt /> 
                    : <FaLaptop /> 
            }
        </header>
    )
}

Header.defaultProps = {
    title: "Default Title"
}

export default Header;
