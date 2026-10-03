from models.empleado import Empleado
from extensions import db

def obtener_empleados():
    empleado = Empleado.query.all()
    return empleado

def obtener_empleados_por_id(id):
    empleado = Empleado.query.get(id)
    return empleado

def crear_empleado(nombre, apellido, dni, email, cargo):
    empleado = Empleado(
        nombre=nombre,
        apellido=apellido,
        dni=dni,
        email=email,
        cargo=cargo
    )

    db.session.add(empleado)
    db.session.commit()

    return empleado

#Modificar empleado

def modificar_empleado(id, nombre, apellido, dni, email, cargo):
    empleado = Empleado.query.get(id)

    if empleado is None:
        return None

    empleado.nombre = nombre
    empleado.apellido = apellido
    empleado.dni = dni
    empleado.email = email
    empleado.cargo = cargo

    db.session.commit()

    return empleado
        

#Eliminar empleado

def eliminar_empleado(id):
    empleado = Empleado.query.get(id)

    if empleado is None:
        return None

    db.session.delete(empleado)
    db.session.commit()

    return empleado



