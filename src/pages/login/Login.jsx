import { useNavigate } from "react-router-dom";
import "./stylesLogin.css";

export default function Login() {

    const navigate = useNavigate();

    const startLevel1 = () => {
        navigate('/level1', {
            state: {
                firstTime: true
            }
        })
    }

    return (
        <div className="container">
            <div className="logo-univalle">
                <img src="/assets/images/logo-univalle.png" alt="Logo Universidad del Valle" />
            </div>
            <div className="title-lost-temple">
                Bienvenido a<br/>Lost Temple
            </div>
            <div onClick={startLevel1} className="button-start">
                <button>Level1</button>
            </div>
        </div>
    );

}
