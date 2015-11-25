worker_processes 1

preload_app true

timeout 60

listen "/var/run/unicorn/meejia/client.sock", :backlog => 64
pid "/var/run/unicorn/meejia/client.pid"

stderr_path "/tmp/unicorn/meejia/log/client.stderr.log"
stdout_path "/tmp/unicorn/meejia/log/client.stdout.log"
