from flask import Blueprint, jsonify

zik_resource_api = Blueprint('zik_resource_api', __name__)


@zik_resource_api.route('/zik-resources', methods=['POST'])
def create():
    return jsonify({}), 501


@zik_resource_api.route('/zik-resources', methods=['GET'])
def get_resources():
    return jsonify({}), 501


@zik_resource_api.route('/zik-resources/<zik_resource_id>', methods=['GET'])
def get_resource(zik_resource_id):
    return jsonify({}), 501


@zik_resource_api.route('/zik-resources/<zik_resource_id>', methods=['DELETE'])
def delete(zik_resource_id):
    return jsonify({}), 501
