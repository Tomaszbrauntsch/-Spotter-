from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hi"
def test():
    return "This is text for testing"

if __name__ == "__main__":
    app.run()
