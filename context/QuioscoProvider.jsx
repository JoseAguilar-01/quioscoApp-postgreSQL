import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
	const [categorias, setCategorias] = useState([]);
	const [categoriaActual, setCategoriaActual] = useState({});
	const [producto, setProducto] = useState({});
	const [modal, setModal] = useState(false);
	const [pedido, setPedido] = useState([]);
	const [nombre, setNombre] = useState('');
	const [total, setTotal] = useState(0);

	const router = useRouter();

	useEffect(() => {
		const obtenerCategorias = async () => {
			try {
				const { data } = await axios('/api/categorias');

				setCategorias(data);
			} catch (error) {
				console.log(error);
			}
		};
		obtenerCategorias();
	}, []);

	useEffect(() => {
		setCategoriaActual(categorias[0]);
	}, [categorias]);

	const handleClickCategoria = (id) => {
		const categoria = categorias.filter((cat) => cat.id === id);

		setCategoriaActual(categoria[0]);

		router.push('/');
	};

	const handleSetProducto = (producto) => {
		setProducto(producto);
	};

	const handleChangeModal = () => {
		setModal(!modal);
	};

	const handleAgregarPedido = ({ categoriaId, ...producto }) => {
		if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
			// Actualizar la cantidad

			const pedidoActualizado = pedido.map((productoState) =>
				productoState.id === producto.id ? producto : productoState
			);

			setPedido(pedidoActualizado);
			toast.success('Cambios Guardados');
		} else {
			setPedido([...pedido, producto]);
			toast.success('Agregado al Pedido');
		}

		setModal(false);
	};

	const handleEditarCantidades = (id) => {
		const actualizarPedido = pedido.filter((producto) => producto.id === id);

		setProducto(actualizarPedido[0]);

		setModal(!modal);
	};

	const handleEliminarProducto = (id) => {
		const pedidoActualizado = pedido.filter((producto) => producto.id !== id);

		setPedido(pedidoActualizado);
		toast.success('Eliminado Correctamente');
	};

	useEffect(() => {
		const calculoTotal = pedido.reduce(
			(total, producto) => total + producto.precio * producto.cantidad,
			0
		);

		setTotal(calculoTotal);
	}, [pedido]);

	const colocarOrden = async (e) => {
		e.preventDefault();

		try {
			await axios.post('/api/ordenes', {
				pedido,
				nombre,
				total,
				fecha: Date.now().toString(),
			});

			setCategoriaActual(categorias[0]);
			setPedido([]);
			setNombre('');
			setTotal(0);

			toast.success('Pedido Realizado Correctamente');

			router.push('/');
		} catch (error) {
			console.log(error);
		}

		console.log(total);
	};

	return (
		<QuioscoContext.Provider
			value={{
				categorias,
				handleClickCategoria,
				categoriaActual,
				handleSetProducto,
				producto,
				handleChangeModal,
				modal,
				pedido,
				handleAgregarPedido,
				handleEditarCantidades,
				handleEliminarProducto,
				setNombre,
				nombre,
				colocarOrden,
				total,
			}}
		>
			{children}
		</QuioscoContext.Provider>
	);
};

export { QuioscoProvider };

export default QuioscoContext;
