from flask import Blueprint, jsonify
from controllers.empleados_controller import obtener_empleados


empleados_bp = Blueprint("empleados", __name__)


@empleados_bp.route("/empleados", methods=["GET"])
def listar_empleados():
    empleados = obtener_empleados()

    return jsonify([
        {
            "id": empleado.id,
            "nombre": empleado.nombre,
            "apellido": empleado.apellido,
            "dni": empleado.dni,
            "email": empleado.email,
            "cargo": empleado.cargo
        }
        for empleado in empleados
    ])