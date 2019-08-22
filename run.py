from flask import Flask
from flask_restful import Api
from zik_resource import ZikResources, ZikResource

# Create an instance of Flask
app = Flask(__name__)
api = Api(app)

# API routing
api.add_resource(ZikResources, '/zik-resources')
api.add_resource(ZikResource, '/zik-resources/<zik_resource_id>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
