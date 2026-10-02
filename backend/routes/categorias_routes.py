from flask import Blueprint, jsonify, request
from controllers.categorias_controller import (
    obtener_categorias,
    obtener_categoria_por_id,
    crear_categoria,
    modificar_categoria,
    eliminar_categoria
)

categorias_bp = Blueprint("categorias", __name__)


# ---- Obtener todas las categorías ----

@categorias_bp.route("/categorias", methods=["GET"])
def listar_categorias():
    categorias = obtener_categorias()

    return jsonify([
        {
            "id": categoria.id,
            "nombre": categoria.nombre
        }
        for categoria in categorias
    ])

# ---- Obtener una categoría por ID ----

@categorias_bp.route("/categorias/<int:id>", methods=["GET"])
def obtener_categoria(id):
    categoria = obtener_categoria_por_id(id)

    if categoria is None:
        return jsonify({"error": "Categoría no encontrada"}), 404

    return jsonify({
        "id": categoria.id,
        "nombre": categoria.nombre
    })

# ---- Crear una categoría ----

@categorias_bp.route("/categorias", methods=["POST"])
def agregar_categoria():
    datos = request.get_json()

    if not datos or "nombre" not in datos:
        return jsonify({"error": "El nombre es obligatorio"}), 400

    nombre = datos["nombre"].strip()

    if nombre == "":
        return jsonify({"error": "El nombre es obligatorio"}), 400

    categoria = crear_categoria(nombre)
    if categoria is None:
        return jsonify({"error": "La categoría ya existe"}), 400

    return jsonify({
        "id": categoria.id,
        "nombre": categoria.nombre
    }), 201

# ---- Modificar una categoría ----

@categorias_bp.route("/categorias/<int:id>", methods=["PUT"])
def actualizar_categoria(id):
    datos = request.get_json()

    if not datos or "nombre" not in datos:
        return jsonify({"error": "El nombre es obligatorio"}), 400

    nombre = datos["nombre"].strip()

    if nombre == "":
        return jsonify({"error": "El nombre es obligatorio"}), 400

    categoria = modificar_categoria(id, nombre)

    if categoria is None:
        return jsonify({"error": "Categoría no encontrada"}), 404

    if categoria == "duplicada":
        return jsonify({"error": "La categoría ya existe"}), 400

    return jsonify({
        "id": categoria.id,
        "nombre": categoria.nombre
    })

# ---- Eliminar una categoría ----

@categorias_bp.route("/categorias/<int:id>", methods=["DELETE"])
def borrar_categoria(id):
    categoria = eliminar_categoria(id)

    if categoria is None:
        return jsonify({"error": "Categoría no encontrada"}), 404

    return jsonify({
        "mensaje": "Categoría eliminada correctamente",
        "id": categoria.id,
        "nombre": categoria.nombre
    })