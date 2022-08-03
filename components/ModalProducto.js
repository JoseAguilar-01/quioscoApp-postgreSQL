import useQuiosco from '../hooks/useQuiosco';
import Image from 'next/image';
import { formatearDinero } from '../helpers';
import { useState, useEffect } from 'react';

const ModalProducto = () => {
	const [cantidad, setCantidad] = useState(1);
	const [edicion, setEdicion] = useState(false);

	const { handleChangeModal, producto, handleAgregarPedido, pedido } =
		useQuiosco();

	const { imagen, nombre, precio, id } = producto;

	useEffect(() => {
		// Comprobar si el modal actual existe en el pedido
		if (pedido.some((pedidoState) => pedidoState.id === id)) {
			const productoEdicion = pedido.find(
				(pedidoState) => pedidoState.id === id
			);

			setEdicion(true);
			setCantidad(productoEdicion.cantidad);
		}
	}, [producto, pedido]);
	return (
		<div className="md:flex gap-10">
			<div className="w-1/3">
				<Image
					width={300}
					height={400}
					alt={`Imagen Producto ${nombre}`}
					src={`/assets/img/${imagen}.jpg`}
				/>
			</div>

			<div className="w-2/3">
				<div className="flex justify-end">
					<button onClick={handleChangeModal}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-9 w-9"
							fill="none"
							viewBox="0 0 24 24"
							stroke="red"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>

				<h2 className="text-3xl font-bold mt-5">{nombre}</h2>
				<p className="mt-5 font-black text-5xl text-amber-500">
					{formatearDinero(precio)}
				</p>

				<div className="flex gap-4 mt-5">
					<button
						type="button"
						onClick={() => {
							if (cantidad > 1) {
								setCantidad(cantidad - 1);
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>

					<p className="text-4xl">{cantidad}</p>

					<button
						type="button"
						onClick={() => {
							if (cantidad < 10) {
								setCantidad(cantidad + 1);
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>

				<button
					type="button"
					onClick={() => handleAgregarPedido({ ...producto, cantidad })}
					className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-5 py-2 mt-5 rounded uppercase"
				>
					{edicion ? 'Guardar cambios' : 'Agregar al pedido'}
				</button>
			</div>
		</div>
	);
};

export default ModalProducto;
