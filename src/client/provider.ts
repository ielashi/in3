import Client from './Client'

export class CustomProvider {
  IN3Client: Client
  host: string

  constructor(client: Client, _host: string){
    this.IN3Client = client
    this.host = _host
  }

  send(method, parameters): Promise<object> {
    return this.IN3Client.send(method, parameters)
  }

  sendBatch(methods, moduleInstance): Promise<object[]> {
    let methodCalls = [];

    methods.forEach((method) => {
        method.beforeExecution(moduleInstance);
        methodCalls.push(this.send(method.rpcMethod, method.parameters));
    });

    return Promise.all(methodCalls);
  }

  supportsSubscriptions(): boolean {
    return false
  }
}
