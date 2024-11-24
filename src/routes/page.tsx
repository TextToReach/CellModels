import { useRef, useState } from "react";
import { Canvas, Color, MeshProps } from "@react-three/fiber";
import "./style.scss";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { useDrag } from '@use-gesture/react'


function Box(props: MeshProps, size: [width: number, height: number, depth: number], color?: Color, scale?: number, position?: [number, number, number]) {
	const meshRef = useRef<Mesh>() as React.Ref<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>;

	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={scale ?? 1}
			position={position}
		>
			<boxGeometry args={size} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
}

function App() {

	const [totalX, setTotalX] = useState(0) // 0-200
	const [totalY, setTotalY] = useState(0)

	const [oldRotationX, setOldRotationX] = useState(0) // 500
	const [oldRotationY, setOldRotationY] = useState(0)

	const [rotationX, setRotationX] = useState(0)
	const [rotationY, setRotationY] = useState(0)

	const Objects = [
		(scale: number, position?: [number, number, number]) => Box({ position: [0, 0, 0], rotation: [rotationY / 50, 0, rotationX / 50, "XYZ"] }, [2, 3, 1], "red", scale, position),
		(scale: number, position?: [number, number, number]) => Box({ position: [0, 0, 0], rotation: [rotationY / 50, 0, rotationX / 50, "XYZ"] }, [3, 1, 2], "blue", scale, position),
		(scale: number, position?: [number, number, number]) => Box({ position: [0, 0, 0], rotation: [rotationY / 50, 0, rotationX / 50, "XYZ"] }, [1, 1, 1], "green", scale, position)
	]

	const [objectIndex, setObjectIndex] = useState(0)

	const Drag = () => useDrag(({ movement: [mx, my] }) => {
		setTotalX(mx)
		setTotalY(my)

		setRotationX(oldRotationX + totalX)
		setRotationY(oldRotationY + totalY)
	})

	const [scale, setScale] = useState(1)
	

	const [objectX, setObjectX] = useState(0)
	const [objectY, setObjectY] = useState(0)
	const [objectZ, setObjectZ] = useState(0)
	return (

		<div id="wrapper" className="flex h-full flex-col">
			<div id="controls" className="h-32 w-full flex *:mx-4 mt-2 *:flex-1">
				<div className="field">
					<span>Camera X</span>
					<input type="range" min="-5" max="5" step={0.1} className="range" value={objectX} onChange={e => setObjectX(Number(e.target.value))}/>
				</div>
				<div className="field">
					<span>Camera Y</span>
					<input type="range" min="-5" max="5" step={0.1} className="range" value={objectY} onChange={e => setObjectY(Number(e.target.value))}/>
				</div>
				<div className="field">
					<span>Camera Z</span>
					<input type="range" min="-5" max="5" step={0.1} className="range" value={objectZ} onChange={e => setObjectZ(Number(e.target.value))}/>
				</div>
			</div>
			<div id="container"
				className="size-full flex select-none flex-col"
				onWheel={e => { console.log(scale); setScale(scale - (e.deltaY / 1000)) }}
				onContextMenu={e => e.preventDefault()}
			>

				<Canvas
					{...Drag()()}
					onMouseUp={() => {
						setOldRotationX(rotationX)
						setOldRotationY(rotationY)
						setTotalX(0)
						setTotalY(0)
					}} style={{ touchAction: "none" }}>
					<ambientLight intensity={Math.PI / 2} />
					<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
					<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
					{Objects.at(objectIndex % Objects.length)!(scale, [objectX, objectY, objectZ])}
				</Canvas>

				<div id="Buttons" className="flex justify-center *:w-[30%]">
					<div className="*:flex-1 flex *:bg-black *:text-white *:rounded *:mx-2">
						<button onClick={() => { setObjectIndex(objectIndex + 1) }}>Next</button>
						<button onClick={() => { setObjectIndex(objectIndex - 1) }}>Previous</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
