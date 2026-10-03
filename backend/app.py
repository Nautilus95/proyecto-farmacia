from flask import Flask
from config import Config
from extensions import db
from routes.medicamentos_routes import medicamentos_bp
from routes.categorias_routes import categorias_bp
from routes.empleados_routes import empleados_bp
from routes.dashboard_routes import dashboard_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)

    app.register_blueprint(medicamentos_bp)
    app.register_blueprint(categorias_bp)
    app.register_blueprint(empleados_bp)
    app.register_blueprint(dashboard_bp)

    return app


app = create_app()


@app.route("/")
def inicio():
    return "Backend de Farmacia funcionando correctamente"


if __name__ == "__main__":
    app.run(debug=True)