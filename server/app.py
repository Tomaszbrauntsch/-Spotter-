from flask import Flask, request, Response
import json
from watson_developer_cloud import VisualRecognitionV3
import time


app = Flask(__name__)

@app.route('/')
def index():
    return Response(open('test.html').read(), mimetype="text/html")

# save the image as a picture
@app.route('/images', methods=['POST'])
def image():

    i = request.files['image']  # get the image
    f = ('image.jpeg')
    i.save('%s/%s' % ("images/", f))

    visual_recognition = VisualRecognitionV3(
         version='2018-03-19',
         iam_apikey='KgyBkE_NeZ9WqPjJyrRQcDDdgIgupFUAP-4c9KQkwN_2'
     )

    with open('images/image.jpeg', 'rb') as images_file:
        classes = visual_recognition.classify(
            images_file,
            threshold='0.0',
         classifier_ids='DefaultCustomModel_626967875').get_result()
    print(json.dumps(classes, indent=2))

    return Response("%s saved" % f)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
