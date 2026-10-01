from models.empleado import Empleado

def obtener_empleados():
    empleados = Empleado.query.all()

    return empleados