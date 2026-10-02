from models.categoria import Categoria
from extensions import db


# ---- Obtener todas las categorías ----

def obtener_categorias():
    categorias = Categoria.query.all()
    return categorias

# ----Obtener una categoría por su ID ----

def obtener_categoria_por_id(id):
    categoria = Categoria.query.get(id)
    return categoria

# ---- Crear una categoría ----
def crear_categoria(nombre):
    categoria_existente = Categoria.query.filter_by(nombre=nombre).first()

    if categoria_existente:
        return None

    categoria = Categoria(nombre=nombre)

    db.session.add(categoria)
    db.session.commit()

    return categoria

# ---- Modificar una categoría ----

def modificar_categoria(id, nombre):
    categoria = Categoria.query.get(id)

    if categoria is None:
        return None

    categoria_existente = Categoria.query.filter(
        Categoria.nombre == nombre,
        Categoria.id != id
    ).first()

    if categoria_existente:
        return "duplicada"

    categoria.nombre = nombre
    db.session.commit()

    return categoria

# ---- Eliminar una categoría ----

def eliminar_categoria(id):
    categoria = Categoria.query.get(id)

    if categoria is None:
        return None

    db.session.delete(categoria)
    db.session.commit()

    return categoria