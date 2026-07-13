<?php
header('Content-Type: application/json');
echo json_encode([
  'service' => 'AssistRAG API',
  'status' => 'running',
  'message' => 'Placeholder API container is up.'
], JSON_PRETTY_PRINT);
