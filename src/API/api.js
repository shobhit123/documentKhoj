export class APIManager {
    static uploadDocument(base64Data) {
      return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 20;
          if (progress >= 100) {
            clearInterval(interval);
            resolve({
              success: true,
              message: "Document uploaded successfully",
              fileUrl: "https://mocked.url/document.pdf" // Mocked response
            });
          }
        }, 500);
      });
    }
  }