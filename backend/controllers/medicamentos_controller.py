from models.medicamento import Medicamento


def obtener_medicamentos():
    medicamentos = Medicamento.query.all()

    return medicamentos