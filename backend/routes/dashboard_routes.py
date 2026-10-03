from flask import Blueprint, jsonify
from models.medicamento import Medicamento
from models.categoria import Categoria
from models.empleado import Empleado

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def obtener_dashboard():
    cantidad_medicamentos = Medicamento.query.count()
    cantidad_categorias = Categoria.query.count()
    cantidad_empleados = Empleado.query.count()

    return jsonify({
        "medicamentos": cantidad_medicamentos,
        "categorias": cantidad_categorias,
        "empleados": cantidad_empleados
    })