import { Float, Html, Text } from "@react-three/drei";

const WellcomeText = (props) => {
    return (
        // <Html 
        // className='wellcome-text'
        // position={props.position} 
        // center
        // distanceFactor={12}>
        //     <h1> Lost Temple </h1>
        // </Html>

        // <Html >
        //     <h1> Lost Temple </h1>
        //     <h2> Press any button to continue </h2>
        // </Html>

        <Float 
        speed={1.5}
        rotationIntensity={0.01}
        floatIntensity={0.5}
        floatingRange={[1, 2]}>
            <Text
                position={props.position}
                fontSize={10}
                color='black'
                textAlign='center'>
                    Lost Temple
            </Text>
        </Float>
    )
}


export default WellcomeText;
