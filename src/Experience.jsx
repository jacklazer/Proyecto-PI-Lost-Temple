import { AvatarProvider } from "./context/AvatarContext";
import RoutesLostTemple from "./routes/RoutesLostTemple"
// import { Canvas, useFrame } from '@react-three/fiber';

const Experience = () => {
    return (
        <AvatarProvider>
            <RoutesLostTemple />
        </AvatarProvider>
    )
}

export default Experience;