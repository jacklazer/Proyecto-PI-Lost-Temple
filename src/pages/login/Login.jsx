import { useNavigate } from "react-router-dom";
import "./stylesLogin.css";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const startLevel1 = () => {
        navigate('/level1', {
            state: {
                firstTime: true
            }
        })
    }

    const auth = useAuth();
    const onHandleButtonLoginLevel1 = async () => {
        // const result = await auth.loginWithGoogle();
        // console.log(result);

        await auth.loginWithGoogle()
        .then((res)=>navigate('/level1'))
        .catch((error)=>console.error(error));
    }
    const onHandleButtonLoginLevel2 = async () => {
        // const result = await auth.loginWithGoogle();
        // console.log(result);

        await auth.loginWithGoogle()
        .then((res)=>navigate('/level2'))
        .catch((error)=>console.error(error));
    }

    return (
        <div className="container">
            <div className="logo-univalle">
                <img src="/assets/images/logo-univalle.png" alt="Logo Universidad del Valle" />
            </div>
            <div className="title-lost-temple">
                Bienvenido a<br/>Lost Temple
            </div>
            <div onClick={onHandleButtonLoginLevel1} className="button-start">
                <button>Level1</button>
            </div>
            <div onClick={onHandleButtonLoginLevel2} className="button-start">
                <button>Level2</button>
            </div>
        </div>
    );

}
