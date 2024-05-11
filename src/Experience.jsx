import { AuthProvider } from "./context/AuthContext";
import { AvatarProvider } from "./context/AvatarContext";
import RoutesLostTemple from "./routes/RoutesLostTemple"
// import { Canvas, useFrame } from '@react-three/fiber';

const Experience = () => {
    return (
        <AuthProvider>
            <AvatarProvider>
                <RoutesLostTemple />
            </AvatarProvider>
        </AuthProvider>
    )
}

export default Experience;