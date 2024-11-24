import React from "react";

function useMousePosition() {
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

	React.useEffect(() => {
		const updateMousePosition = (ev: MouseEvent) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY });
		};

		window.addEventListener("mousemove", updateMousePosition);

		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);

	return [mousePosition.x, mousePosition.y];
};

export default useMousePosition;
