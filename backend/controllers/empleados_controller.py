from models.empleado import empleado

def obtener_empleado():
    empleados = Empleado.query.all()

    return empleados