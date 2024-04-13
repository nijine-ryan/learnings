const worker = new Worker("test-worker");

worker.addEventListener('message', (event) => {
    const data = event.data;
    console.log("data from main thread", data);
})

let message = "Hi, world!";

worker.postMessage(message);


worker.terminate();