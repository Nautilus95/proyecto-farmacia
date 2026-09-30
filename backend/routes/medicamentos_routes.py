from flask import Blueprint, jsonify
from controllers.medicamentos_controller import obtener_medicamentos


medicamentos_bp = Blueprint("medicamentos", __name__)


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