import Image from 'next/image';
import useQuiosco from '../hooks/useQuiosco';

const Categoria = ({ categoria }) => {
	const { nombre, icono, id } = categoria;

	const { handleClickCategoria, categoriaActual } = useQuiosco();

	return (
		<div
			className={`${
				categoriaActual?.id === id && 'bg-amber-400'
			} flex items-center p-5 gap-4 w-full border hover:bg-amber-400 transition-colors`}
		>
			<Image
				width={70}
				height={70}
				src={`/assets/img/icono_${icono}.svg`}
				alt={`Imagen Icono ${icono}`}
			/>
			<button
				type="button"
				className="text-2xl font-bold"
				onClick={() => {
					handleClickCategoria(id);
				}}
			>
				{nombre}
			</button>
		</div>
	);
};

export default Categoria;
