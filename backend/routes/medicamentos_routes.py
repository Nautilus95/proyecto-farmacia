from flask import Blueprint, jsonify, request
from datetime import date
from controllers.medicamentos_controller import (
    obtener_medicamentos,
    obtener_medicamento_por_id,
    crear_medicamento,
    categoria_existe
    )


medicamentos_bp = Blueprint("medicamentos", __name__)

# Obtener todos los medicamentos

@medicamentos_bp.route("/medicamentos", methods=["GET"])
def listar_medicamentos():
    medicamentos = obtener_medicamentos()

    return jsonify([
        {
            "id": medicamento.id,
            "nombre": medicamento.nombre,
            "precio": float(medicamento.precio),
            "stock": medicamento.stock,
            "categoria_id": medicamento.categoria_id,
            "fecha_ingreso": medicamento.fecha_ingreso.isoformat()
        }
        for medicamento in medicamentos
    ])

# Obtener un medicamento por su ID

@medicamentos_bp.route("/medicamentos/<int:id>", methods=["GET"])
def obtener_medicamento(id):
    medicamento = obtener_medicamento_por_id(id)

    if medicamento is None:
        return jsonify({"error": "Medicamento no encontrado"}), 404

    return jsonify({
        "id": medicamento.id,
        "nombre": medicamento.nombre,
        "precio": float(medicamento.precio),
        "stock": medicamento.stock,
        "categoria_id": medicamento.categoria_id,
        "fecha_ingreso": medicamento.fecha_ingreso.isoformat()
    })

# Crear medicamento

@medicamentos_bp.route("/medicamentos", methods=["POST"])
def crear_medicamento_route():
    datos = request.get_json()

    if not datos:
        return jsonify({"error": "No se recibieron datos"}), 400

    nombre = datos.get("nombre")
    precio = datos.get("precio")
    stock = datos.get("stock")
    categoria_id = datos.get("categoria_id")
    fecha_ingreso = datos.get("fecha_ingreso")

    # Validar nombre

    if not nombre or not isinstance(nombre, str) or not nombre.strip():
        return jsonify({"error": "El nombre es obligatorio"}), 400

    # Validar precio

    if precio is None:
        return jsonify({"error": "El precio es obligatorio"}), 400

    try:
        precio = float(precio)
    except (ValueError, TypeError):
        return jsonify({"error": "El precio debe ser numérico"}), 400

    if precio <= 0:
        return jsonify({"error": "El precio debe ser mayor a 0"}), 400

    # Validar stock

    if stock is None:
        return jsonify({"error": "El stock es obligatorio"}), 400

    try:
        stock = int(stock)
    except (ValueError, TypeError):
        return jsonify({"error": "El stock debe ser un número entero"}), 400

    if stock < 0:
        return jsonify({"error": "El stock no puede ser negativo"}), 400

    # Validar categoría

    if categoria_id is None:
        return jsonify({"error": "La categoría es obligatoria"}), 400

    try:
        categoria_id = int(categoria_id)
    except (ValueError, TypeError):
        return jsonify({"error": "El ID de categoría debe ser un número entero"}), 400

    if not categoria_existe(categoria_id):
        return jsonify({"error": "La categoría no existe"}), 400

    # Validar fecha de ingreso

    if not fecha_ingreso:
        return jsonify({"error": "La fecha de ingreso es obligatoria"}), 400

    try:
        fecha_ingreso = date.fromisoformat(fecha_ingreso)
    except (ValueError, TypeError):
        return jsonify({
            "error": "La fecha debe tener un formato válido: YYYY-MM-DD"
        }), 400

    # Crear medicamento después de validar todo

    medicamento = crear_medicamento(
        nombre=nombre.strip(),
        precio=precio,
        stock=stock,
        categoria_id=categoria_id,
        fecha_ingreso=fecha_ingreso
    )

    return jsonify({
        "mensaje": "Medicamento creado correctamente",
        "id": medicamento.id
    }), 201