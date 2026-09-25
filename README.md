# Certificate Generator

This is a simple GitHub Pages website for the NSS certificate.

## How it works

1. Volunteer opens the website.
2. Enters their full name.
3. Clicks **Download Certificate**.
4. The name is printed on the blank line in the certificate.
5. The certificate downloads as a high-resolution PNG.

The name is processed entirely in the volunteer's browser; there is no server or database.

## Upload to GitHub

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. GitHub will provide a website link that you can share with volunteers.

## Files

- `index.html` — website page
- `style.css` — page styling
- `script.js` — certificate generation and download
- `certificate-template.png` — supplied certificate template

## Adjusting the name position

If the name appears slightly above/below the blank line on another browser/display, edit these values in `script.js`:

```js
const x = 896;
const y = 584;
```

The supplied certificate image is 1448 × 1024 pixels.
