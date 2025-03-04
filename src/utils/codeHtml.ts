export const generateCodeHtml = (code: string) => {
  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: #0c171c;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .container {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 20px;
              box-sizing: border-box;
            }
            svg {
              width: 70%;
              height: 100%;
              object-fit: contain; 
              max-width: 100vw;   
              max-height: 100vh;
              }
}
          </style>
        </head>
        <body>
          <div class="container">
            ${code}
          </div>
        </body>
      </html>
    `;

  return html;
};
