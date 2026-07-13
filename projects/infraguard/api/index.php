<?php
header('Content-Type: application/json');
echo json_encode([
  'service' => 'InfraGuard API',
  'status' => 'running',
  'message' => 'Placeholder API container is up.'
], JSON_PRETTY_PRINT);
