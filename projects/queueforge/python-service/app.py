from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'service': 'queueforge-pdf'})

@app.route('/render', methods=['POST'])
def render_pdf():
    data = request.json or {}
    template = data.get('template', 'default')

    # Simulate PDF rendering work
    time.sleep(2)

    return jsonify({
        'status': 'success',
        'template': template,
        'output_path': f'/storage/reports/{template}-{int(time.time())}.pdf',
        'pages': 12,
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
