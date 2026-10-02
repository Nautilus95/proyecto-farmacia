from flask import Blueprint, jsonify, request
from controllers.empleados_controller import (
    obtener_empleados, 
    obtener_empleados_por_id,
    crear_empleado
    )


empleados_bp = Blueprint("empleados", __name__)


@empleados_bp.route("/empleados", methods=["GET"])
def listar_todos_los_empleados():

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

@empleados_bp.route("/empleados/<int:id>", methods=["GET"])
def consultar_empleados_por_id(id):
    empleado = obtener_empleados_por_id(id)

    if empleado is None:
        return jsonify({"error": "Empleado no encontrado"}), 404

    return jsonify({
        "id": empleado.id,
        "nombre": empleado.nombre,
        "apellido": empleado.apellido,
        "dni": empleado.dni,
        "email": empleado.email,
        "cargo": empleado.cargo
    })

@empleados_bp.route("/empleados", methods=["POST"])
def crear_empleado():
    
    datos = request.get_json(force=True, silent=True)

    if not datos:
        return jsonify({"error": "Cuerpo de la petición vacío o JSON no válido"}), 400

    
    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    dni = datos.get("dni")
    email = datos.get("email")
    cargo = datos.get("cargo")

    
    return jsonify({"mensaje": "Empleado creado correctamente", "datos": datos}), 201