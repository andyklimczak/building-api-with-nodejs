import cluster from 'cluster';
import os from 'os';

const CPUS = os.cpus();
if(cluster.isMaster) {
  CPUS.forEach(() => cluster.fork());
  cluster.on('listening', worker => {
    console.log('cluster %d connected', worker.process.pid);
  });
  cluster.on('disconnect', worker => {
    console.log('cluster %d disconnected', worker.process.pid);
  });
  cluster.on('exit', worker => {
    console.log('cluster %d is dead', worker.process.pid);
    cluster.fork();
  });
} else {
  require('./index.js');
}
