from flask import Flask
from config import Config
from extensions import db
from routes.medicamentos_routes import medicamentos_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    
    app.register_blueprint(medicamentos_bp)

    return app


app = create_app()

@app.route("/")
def inicio():
    return "Backend de Farmacia funcionando correctamente"

if __name__ == "__main__":
    app.run(debug=True)