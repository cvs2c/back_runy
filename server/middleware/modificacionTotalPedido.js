import Pedido from "../models/Pedido.js";
import PedidoProducto from "../models/PedidoProducto.js";

const modificacionTotal = async (req, res, next) => {

	const { pedidoId } = req.body;
	try {
		const totalPrecios = await PedidoProducto.sum("precio", {
			where: {
				pedidoId: pedidoId,
			},
		});
		const pedido = await Pedido.update(
			{
				total: totalPrecios,
			},
			{
				where: {
					id: pedidoId,
				},
			}
		);
		// res.status(201).json({
		// 	Status: "success",
		// 	data: result,
		// });
	} catch (error) {
		res.status(500).json({
			Status: "error",
			data: error,
		});
		
	}
//   const { pedidoId, total } = req.body;

//   try {
// 		const pedido = await Pedido.update(
// 		  {
// 		    total: total,
// 		  },
// 		  {
// 		    where: {
// 		      id: pedidoId,
// 		    },
// 		  }
// 		);
//   } catch (error) {
// 	return res.status(500).json({
//          Status: "error",
//              data: error,
//            });
//   }
  //   const { pedidoId, precio } = req.body;
  //   try {
  //     const pedido = await Pedido.findOne({
  //       where: {
  //         id: pedidoId,
  //       },
  //     });
  //     if (!pedido) {
  //       return res.status(404).json({
  //         errors: ["El pedido no existe"],
  //       });
  //     } else {
  //       const monto = pedido.dataValues.total;
  //       try {
  //         // Sumar el precio del último elemento del carrito al monto actual
  //         const nuevoMonto = monto + precio;
  //         // Actualizar el total del pedido con el nuevo monto
  //         const result = await Pedido.update(
  //           {
  //             total: nuevoMonto,
  //           },
  //           {
  //             where: {
  //               id: pedidoId,
  //             },
  //           }
  //         );
  //         // Asegúrate de que no se haya enviado ya una respuesta al cliente
  //         if (!res.headersSent) {
  //           next();
  //         }
  //       } catch (error) {
  //         return res.status(500).json({
  //           Status: "error",
  //           data: error,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     return res.status(500).json({
  //       Status: "error",
  //       data: error,
  //     });
  //   }
};

export default modificacionTotal;
