# Document QA System

This project is a React-based web application that allows users to upload documents, generate questions based on the content of the document, and submit those questions along with the document. It uses Material UI for the UI components.

## Features

- **Document Upload**: Allows users to upload a document (PDF, DOCX, etc.).
- **Generate Questions**: Once the document is uploaded, the user can click the "Generate QA" button to generate questions based on the document content.
- **Submit Questions**: The user can submit the generated questions along with the document for further processing or saving.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/shobhit123/documentKhoj.git
   ```

2. Navigate to the project directory:
   ```bash
   cd https://github.com/shobhit123/documentKhoj/tree/develop
   ```

3. Install the project dependencies:
   ```bash
   npm install
   ```

## Running the Application

To run the application locally, execute the following command:

```bash
npm start
```

This will start the development server and open the app in your default browser. The application will typically run on [http://localhost:3000](http://localhost:3000).

## Application Workflow

1. **Upload Document**: Users can upload a document by selecting it through the file input.
2. **Generate QA**: After uploading the document, the user can click the "Generate QA" button to automatically generate questions from the document's content.
3. **Submit Question**: Once the questions are generated, the user can submit them to the document for further processing or saving.

## Technologies Used

- **React**: The frontend library for building user interfaces.
- **Material UI**: A popular React component library used for styling and layout.
- **npm**: Node Package Manager used for managing project dependencies.

## Folder Structure

```
/src
    /API
        /api.ts     // to make api calls
    /Document
        /components
            - DocumentUploader.js       // Component for uploading the document
            - QAGenerator.js              // Component for displaying and 
            submitting questions            
            - TagInput.js
        index.js
    /assets
        - logo.png                  // Project logo (optional)
    /helper
        - index.js              // Utilities for handling file uploads
    App.js                        // Main app file
    index.js                      // Entry point for the React application
```

## Contributions

Feel free to fork this repository and contribute by submitting a pull request. Please make sure to follow the code style used in the project and include tests for new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
