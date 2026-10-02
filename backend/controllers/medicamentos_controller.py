from models.medicamento import Medicamento
from models.categoria import Categoria
from extensions import db


# Obtener todos los medicamentos

def obtener_medicamentos():
    medicamentos = Medicamento.query.all()

    return medicamentos

# Obtener un medicamento por su ID

def obtener_medicamento_por_id(id):
    medicamento = Medicamento.query.get(id)
    return medicamento

# Crear medicamento

def crear_medicamento(nombre, precio, stock, categoria_id, fecha_ingreso):
    medicamento = Medicamento(
        nombre=nombre,
        precio=precio,
        stock=stock,
        categoria_id=categoria_id,
        fecha_ingreso=fecha_ingreso
    )

    db.session.add(medicamento)
    db.session.commit()

    return medicamento

# Validar categoría

def categoria_existe(categoria_id):
    return Categoria.query.get(categoria_id) is not None

# Modificar medicamento

def modificar_medicamento(id, nombre, precio, stock, categoria_id, fecha_ingreso):
    medicamento = Medicamento.query.get(id)

    if medicamento is None:
        return None

    medicamento.nombre = nombre
    medicamento.precio = precio
    medicamento.stock = stock
    medicamento.categoria_id = categoria_id
    medicamento.fecha_ingreso = fecha_ingreso

    db.session.commit()

    return medicamento

# Eliminar medicamento

def eliminar_medicamento(id):
    medicamento = Medicamento.query.get(id)

    if medicamento is None:
        return None

    db.session.delete(medicamento)
    db.session.commit()

    return medicamento
