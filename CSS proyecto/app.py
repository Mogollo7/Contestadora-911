from flask import Flask, render_template

app = Flask(__name__)

@app.route('/Index')
def index():
    return render_template("Index.html")

@app.route('/chat')
def chat():
    return render_template("chat.html")

@app.route('/cola')
def cola():
    return render_template("cola.html")

@app.route('/pila')
def pila():
    return render_template("pila.html")

@app.route('/doc')
def doc():
    return render_template("doc.html")


    


if __name__ == '__main__':
    app.run(debug=True, port=8080)