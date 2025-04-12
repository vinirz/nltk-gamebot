from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from Components.Chatbot import Chatbot

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

bot = Chatbot(open("./base.fds", "r", encoding="utf-8"))

@app.route("/conversation", methods=["POST"])
@cross_origin()
def conversation():
    data = request.get_json()

    if not data or "question" not in data:
        return jsonify({"error": "Missing 'question' field"}), 400

    question = data["question"]
    answer = bot.respond(question)

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
