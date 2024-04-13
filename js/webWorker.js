addEventListener("message", event => {
    const data = event.data;
    console.log('data from worker:', data);
    // ...process result

    let response = "response";

    // Send the response back to the main window thread
    postMessage(response);
});