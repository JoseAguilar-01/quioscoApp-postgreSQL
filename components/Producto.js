import Image from 'next/image';
import { formatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

const Producto = ({ producto }) => {
	const { nombre, imagen, precio } = producto;

	const { handleSetProducto, handleChangeModal } = useQuiosco();

	return (
		<div className="border p-3">
			<Image
				width={300}
				height={400}
				src={`/assets/img/${imagen}.jpg`}
				alt={`Imagen Platillo ${nombre}`}
			/>
			<div className="p-5">
				<h3 className="text-2xl font-bold">{nombre}</h3>
				<p className="mt-5 font-black text-4xl text-amber-500">
					{formatearDinero(precio)}
				</p>
				<button
					type="button"
					className="bg-indigo-600 hover:bg-indigo-800 w-full uppercase text-white font-bold mt-5 p-3 rounded transition-colors"
					onClick={() => {
						handleSetProducto(producto);
						handleChangeModal();
					}}
				>
					Agregar
				</button>
			</div>
		</div>
	);
};

export default Producto;
