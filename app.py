from flask import Flask, g, make_response, request, abort, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
import os
from datetime import datetime as dt, timedelta
import secrets
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, jsonify
import requests

url = "https://api.foursquare.com/v3/places/search?query=coffee"
authKey = 'fsq3n3Ueb4SV9jBmr/+NdNy5QhutJaMrXZHItqZwdqZ6/IM='

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://unicornmagic4ever:aSaqT9SuX6YX3SyqcR1vvz6vKuvb1Xy4@dpg-cij532h5rnut2sakhi30-a.oregon-postgres.render.com/liliths_latte_labyrinth'
    SQLALCHEMY_TRACK_MODIFICATIONS=os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')


app = Flask(__name__, static_folder='./client/dist', static_url_path='')
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app,db)
cors = CORS(app)

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify_password(email, password):
    u = db.session.execute(db.select(User).where((User.email==email))).scalars().first()
    if u is None:
        return False
    g.current_user = u
    return u.check_hashed_password(password)

@token_auth.verify_token
def verify_token(token):
    u = User.check_token(token) if token else None
    g.current_user = u
    return g.current_user or None

@app.route('/coffee-locations')
def get_coffee_locations():
    url = "https://api.foursquare.com/v3/places/search?query=coffee"

    headers = {
        "accept": "application/json",
        "Authorization": "fsq3n3Ueb4SV9jBmr/+NdNy5QhutJaMrXZHItqZwdqZ6/IM="
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        json_response = response.json()
        no_cruddy_coffee = [shop for shop in response['results'] 
                    if 'Coffee Shop' in [category['name'].lower() for category in shop['categories']]
                    and (not shop['chains'] or 
                        all(chain['name'].lower() not in ['starbucks', 'dunkin doughnuts', 'coffee bean'] 
                            for chain in shop['chains']))]


        return jsonify(no_cruddy_coffee)
    else:
        return jsonify({'error': 'Failed to retrieve coffee locations'})

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, index=True, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    password = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    modified_on = db.Column(db.DateTime, onupdate=dt.utcnow)
    token = db.Column(db.String, index=True, unique=True)
    token_exp = db.Column(db.DateTime)
    coffees = db.relationship('Coffee', backref="author", lazy="dynamic", cascade="all, delete-orphan" )

    def get_token(self, exp=86400):
        current_time = dt.utcnow()
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(seconds=exp)
        self.save()
        return self.token

    def revoke_token(self):
        self.token_exp = dt.utcnow() - timedelta(seconds = 120)

    @staticmethod
    def check_token(token):
        u = db.session.execute(db.select(User).where((User.token==token))).scalars().first()
        if not u or u.token_exp < dt.utcnow():
            return None
        return u

    def hash_password(self, original_password):
        return generate_password_hash(original_password)
    
    def check_hashed_password(self, login_password):
        return check_password_hash(self.password, login_password)

    def __repr__(self):
        return f'<{self.id} | {self.email}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return{
            "id":self.id,
            "email":self.email,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "created_on":self.created_on,
            "modified_on":self.modified_on,
            "token":self.token,
        }

    def from_dict(self, data):
        for field in ["email", "first_name", "last_name", "password"]:
            if field in data:
                if field == "password":
                    setattr(self, field, self.hash_password(data[field]))
                else:
                    setattr(self, field, data[field])

class Coffee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    body = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def __repr__(self):
        return f'<{self.id}|{self.title}>'
    
    def from_dict(self, data):
        for field in ["title", "author_id", "body"]:
            if field in data:
                setattr(self, field, data[field])

    def to_dict(self):
        return {
            "id":self.id,
            "title":self.title,
            "author_id":self.author_id,
            "body":self.body,
            "created_on":self.created_on,
            "author":self.author.first_name + " " + self.author.last_name
        }



@app.get('/user')
@basic_auth.login_required()
def login():
    g.current_user.get_token()
    return make_response(g.current_user.to_dict(), 200)

@app.post('/user')
def register():
    data = request.get_json()
    old_user = db.session.execute(db.select(User).where((User.email==data.get('email')))).scalars().first()
    if old_user:
        abort(422)
    new_user = User()
    new_user.from_dict(data)
    new_user.save()
    return make_response("success", 200)

@app.put('/user')
@token_auth.login_required()
def edit_user():
    data = request.get_json()
    if data.get('email'):
        old_user = db.session.execute(db.select(User).where((User.email==data.get('email')))).scalars().first()
        if old_user:
            if old_user.id != g.current_user.id:
                abort(422) 
    g.current_user.from_dict(data)
    g.current_user.save()
    return make_response("success",200)

@app.delete('/user')
@token_auth.login_required()
def delete_user():
    g.current_user.delete()
    return make_response("success",200)


@app.get('/coffee')
def get_coffee():
    coffees = db.session.execute(db.select(Coffee)).scalars().all()
    return make_response([r.to_dict() for r in coffees],200)

@app.post('/coffee')
@token_auth.login_required()
def create_coffee():
    data = request.get_json()
    title = data['title']
    body = data['body']
    author_id= g.current_user.id
    new_coffee = Coffee()
    new_coffee.from_dict({"title":title, "author_id":author_id, "body":body})
    new_coffee.save()

    return make_response(new_coffee.to_dict(), 200)

@app.put('/coffee/<int:coffee_id>')
@token_auth.login_required()
def edit_coffee(coffee_id):
    coffee = db.session.get(Coffee, coffee_id)
    if coffee is None:
        abort(404)
    if coffee.author.id != g.current_user.id:
        abort(403)
    coffee.from_dict(request.get_json())
    coffee.save()
    return make_response(coffee.to_dict(),200)


@app.delete('/coffee/<int:coffee_id>')
@token_auth.login_required()
def delete_coffee(coffee_id):
    coffee = db.session.get(Coffee, coffee_id)
    if coffee is None:
        abort(404)
    if coffee.author.id != g.current_user.id:
        abort(403)
    coffee.delete()
    return make_response(f'Coffee with id {coffee_id} has been deleted',200)
