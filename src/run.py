from flask import Flask
from zik_resource import zik_resource_api

# Create an instance of Flask
app = Flask(__name__)
app.register_blueprint(zik_resource_api)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
