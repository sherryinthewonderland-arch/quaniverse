from flask import Flask, render_template
app = Flask(__name__, template_folder='.')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/<page>')
def page(page):
    try:
        return render_template(page)
    except:
        return "404 Not Found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)

