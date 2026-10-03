from flask import Blueprint, jsonify, request
from controllers.empleados_controller import (
    obtener_empleados, 
    obtener_empleados_por_id,
    crear_empleado,
    modificar_empleado,
    eliminar_empleado
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

# Crear empleado con validaciones

@empleados_bp.route("/empleados", methods=["POST"])
def agregar_empleado():
    datos = request.get_json(force=True, silent=True)

    if not datos:
        return jsonify({
            "error": "Cuerpo de la petición vacío o JSON no válido"
        }), 400

    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    dni = datos.get("dni")
    email = datos.get("email")
    cargo = datos.get("cargo")

    # Validar nombre
    if not nombre or not isinstance(nombre, str) or nombre.strip() == "":
        return jsonify({"error": "El nombre es obligatorio"}), 400

    # Validar apellido
    if not apellido or not isinstance(apellido, str) or apellido.strip() == "":
        return jsonify({"error": "El apellido es obligatorio"}), 400

    # Validar DNI
    if not dni or not isinstance(dni, str) or dni.strip() == "":
        return jsonify({"error": "El DNI es obligatorio"}), 400

    # Validar email
    if not email or not isinstance(email, str) or "@" not in email:
        return jsonify({"error": "El email no es válido"}), 400

    # Validar cargo
    if not cargo or not isinstance(cargo, str) or cargo.strip() == "":
        return jsonify({"error": "El cargo es obligatorio"}), 400

    empleado = crear_empleado(
        nombre.strip(),
        apellido.strip(),
        dni.strip(),
        email.strip(),
        cargo.strip()
    )

    return jsonify({
        "mensaje": "Empleado creado correctamente",
        "id": empleado.id,
        "nombre": empleado.nombre,
        "apellido": empleado.apellido,
        "dni": empleado.dni,
        "email": empleado.email,
        "cargo": empleado.cargo
    }), 201


# Actualizar empleado
@empleados_bp.route("/empleados/<int:id>", methods=["PUT"])
def actualizar_empleado(id):

    datos = request.get_json(force=True, silent=True)

    if not datos:
        return jsonify({
            "error": "Cuerpo de la petición vacío o JSON no válido"
        }), 400

    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    dni = datos.get("dni")
    email = datos.get("email")
    cargo = datos.get("cargo")

    # Validar nombre
    if not nombre or not isinstance(nombre, str) or nombre.strip() == "":
        return jsonify({"error": "El nombre es obligatorio"}), 400

    # Validar apellido
    if not apellido or not isinstance(apellido, str) or apellido.strip() == "":
        return jsonify({"error": "El apellido es obligatorio"}), 400

    # Validar DNI
    if not dni or not isinstance(dni, str) or dni.strip() == "":
        return jsonify({"error": "El DNI es obligatorio"}), 400

    # Validar email
    if not email or not isinstance(email, str) or "@" not in email:
        return jsonify({"error": "El email no es válido"}), 400

    # Validar cargo
    if not cargo or not isinstance(cargo, str) or cargo.strip() == "":
        return jsonify({"error": "El cargo es obligatorio"}), 400

    
    
    empleado = modificar_empleado(
        id,
        nombre.strip(),
        apellido.strip(),
        dni.strip(),
        email.strip(),
        cargo.strip()
    )

    if empleado is None:
        return jsonify({"error": "Empleado no encontrado"}), 404

    return jsonify({
        "mensaje": "Empleado actualizado correctamente",
        "id": empleado.id,
        "nombre": empleado.nombre,
        "apellido": empleado.apellido,
        "dni": empleado.dni,
        "email": empleado.email,
        "cargo": empleado.cargo

        
        
    })

# Eliminar empleado

@empleados_bp.route("/empleados/<int:id>", methods=["DELETE"])
def borrar_empleado(id):
    empleado = eliminar_empleado(id)

    if empleado is None:
        return jsonify({"error": "Empleado no encontrado"}), 404

    return jsonify({
        "mensaje": "Empleado eliminado correctamente",
        "id": empleado.id,
        "nombre": empleado.nombre,
        "apellido": empleado.apellido,
        "dni": empleado.dni,
        "email": empleado.email,
        "cargo": empleado.cargo
    })

