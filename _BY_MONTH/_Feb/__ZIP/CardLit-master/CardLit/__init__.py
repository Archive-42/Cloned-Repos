from flask import Flask, render_template, request, redirect, url_for
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager
import datetime
import json
import urllib2



app = Flask(__name__)
app.config.from_object('CardLit.default_settings')
manager = Manager(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

from CardLit.models import *


@app.route("/")
def hello():
    theUrl = 'https://api.quizlet.com/2.0/sets/415?access_token=MRkuAe39ZXmNdTtQ7RZEfjufbRCNjcJTjMaWscRC&whitespace=1'

    json_obj = urllib2.urlopen(theUrl)

    data = json.load(json_obj)

    for item in data["terms"]:
        term = item["term"]
        definition = item["definition"]
        print(term)

    return render_template("index.html")
    


"""
@app.route("/projects/create/", methods=['GET', 'POST'])
def create():
    if request.method == "GET":
        return render_template("create.html")
    if request.method == "POST":


        new_Card = Card(
            question="Q1",
            answer="A1",
            correct=False,

        )

        db.session.add(new_Card)
        db.session.commit()

        return redirect(url_for('create'))
"""


