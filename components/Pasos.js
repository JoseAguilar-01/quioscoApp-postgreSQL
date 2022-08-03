import { useRouter } from 'next/router';

const pasos = [
	{ paso: 1, nombre: 'Menú', url: '/' },
	{ paso: 2, nombre: 'Resumen', url: '/resumen' },
	{ paso: 3, nombre: 'Datos y Total', url: '/total' },
];

const Pasos = () => {
	const router = useRouter();

	const handleCalcularProgreso = () => {
		let valor = 0;

		if (router.pathname === '/') {
			valor = 5;
		}
		if (router.pathname === '/resumen') {
			valor = 45;
		}
		if (router.pathname === '/total') {
			valor = 100;
		}

		return valor;
	};

	return (
		<>
			<div className="flex justify-between mb-5">
				{pasos.map((paso) => (
					<button
						onClick={() => {
							router.push(paso.url);
						}}
						className="text-2xl font-bold"
						key={paso.paso}
						type="button"
					>
						{paso.nombre}
					</button>
				))}
			</div>

			<div className="bg-gray-100 mb-10">
				<div
					className="rounded-full bg-amber-400 text-xs leanding-none h-2 text-center text-white"
					style={{ width: `${handleCalcularProgreso()}%` }}
				></div>
			</div>
		</>
	);
};

export default Pasos;
