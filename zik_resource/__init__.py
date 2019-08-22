from flask_restful import Resource


class ZikResources(Resource):

    def post(self):
        return {}, 501

    def get(self):
        return {}, 501


class ZikResource(Resource):

    def get(self, zik_resource_id):
        return {}, 501

    def delete(self, zik_resource_id):
        return {}, 501
