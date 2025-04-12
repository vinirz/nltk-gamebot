from nltk.chat.util import Chat

class Chatbot:
   def __init__(self, base, reflections=None):
      self.pairs = self._loadPairs(base)
      self.reflections = self._loadReflections(reflections)
      self.chatbot = Chat(self.pairs, self.reflections)

   def respond(self, question):
      if question.lower() == "sair":
         return "vlw, volte sempre!"
      return self.chatbot.respond(question)

   def _loadPairs(self, file):
      pairs = []
      questions = []
      answers = []

      for line in file:
         line = line.strip()
         if not line:
               if questions and answers:
                  pattern = "|".join(questions)
                  pairs.append([pattern, answers])
                  questions, answers = [], []
               continue

         if line.startswith("question:"):
               questions.append(line[9:].strip().lower())
         elif line.startswith("answer:"):
               answers.append(line[7:].strip())

      if questions and answers:
         pattern = "|".join(questions)
         pairs.append([pattern, answers])

      return pairs

   def _loadReflections(self, reflections):
      if reflections:
         return reflections

      return {
         "eu": "você",
         "você": "eu",
         "sua": "meu",
         "meu": "seu",
         "seu": "meu",
         "eu sou": "você é",
         "você é": "eu sou",
         "eu sou um": "você é um",
         "você é um": "eu sou um",
         "eu sou uma": "você é uma",
         "você é uma": "eu sou uma"
      }
